// Socket.IO server import kar rahe hain, jo real-time communication handle karega
import { Server } from "socket.io";

// Har call room (path) ke users ko track karne ke liye
let connections = {};

// Har room ke messages store karne ke liye
let messages = {};

// Har user ke online aane ka time track karne ke liye
let timeOnline = {};

// Ye function server ko socket server mein convert karega
export const connectToSocket = (server) => {
  // Naya Socket.IO server bana rahe hain with CORS settings
  const io = new Server(server, {
    cors: {
      origin: "*", // kisi bhi origin se request allow hai
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true,
    },
  });

  // Jab koi naya user connect karta hai
  io.on("connection", (socket) => {
    // Jab user kisi room (call) ko join karta hai
    socket.on("join-call", (path) => {
      // Agar ye room pehli baar create ho raha hai, to initialize karte hain
      if (connections[path] === undefined) {
        connections[path] = [];
      }

      // Us room ke connections mein current user ka socket.id add karte hain
      connections[path].push(socket.id);

      // User ke online hone ka time record karte hain
      timeOnline[socket.id] = new Date();

      // Sabhi users ko bata do ki ek naya user join hua hai
      for (let a = 0; a < connections[path].length; a++) {
        io.to(connections[path][a]).emit(
          "user-joined", // event name
          socket.id, // kaun join hua
          connections[path] // abhi room mein kaun-kaun hai
        );
      }

      // Agar room mein pehle se messages hain, to naye user ko dikha do
      if (messages[path] !== undefined) {
        for (let a = 0; a < messages[path].length; ++a) {
          io.to(socket.id).emit(
            "chat-message", // event name
            messages[path][a]["data"], // actual message
            messages[path][a]["sender"], // kisne bheja
            messages[path][a]["socket-id-sender"] // kis socket se bheja
          );
        }
      }
    });

    // Jab ek user dusre ko signal bhejta hai (WebRTC, peer connection setup ke liye)
    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message); // signal forward kar dete hain
    });

    // Jab koi user message bhejta hai
    socket.on("chat-message", (data, sender) => {
      // Pehle yeh dhundte hain ki user kis room mein hai
      const [matchingRoom, found] = Object.entries(connections).reduce(
        ([room, isFound], [roomKey, roomValue]) => {
          if (!isFound && roomValue.includes(socket.id)) {
            return [roomKey, true];
          }

          return [room, isFound];
        },
        ["", false]
      );

      if (found === true) {
        // Agar room ke liye pehle message storage nahi hai to banate hain
        if (messages[matchingRoom] === undefined) {
          messages[matchingRoom] = [];
        }

        // Naya message room ke message list mein store karte hain
        messages[matchingRoom].push({
          sender: sender,
          data: data,
          "socket-id-sender": socket.id,
        });

        // Console mein message log karte hain
        console.log("message", matchingRoom, ":", sender, data);

        // Room ke sabhi users ko message bhejte hain
        connections[matchingRoom].forEach((elem) => {
          io.to(elem).emit("chat-message", data, sender, socket.id);
        });
      }
    });

    // Jab koi user disconnect hota hai
    socket.on("disconnect", () => {
      // Calculate karte hain user kitni der online tha (optional use-case)
      var diffTime = Math.abs(timeOnline[socket.id] - new Date());

      var key;

      // Har room ko check karte hain, kaha se ye user belong karta tha
      for (const [k, v] of JSON.parse(
        JSON.stringify(Object.entries(connections))
      )) {
        for (let a = 0; a < v.length; ++a) {
          if (v[a] === socket.id) {
            key = k;

            // Room ke sabhi users ko bata dete hain ki ye user chala gaya
            for (let a = 0; a < connections[key].length; ++a) {
              io.to(connections[key][a]).emit("user-left", socket.id);
            }

            // Us user ko room ke connection list se hata dete hain
            var index = connections[key].indexOf(socket.id);
            connections[key].splice(index, 1);

            // Agar room empty ho gaya to room ko delete kar dete hain
            if (connections[key].length === 0) {
              delete connections[key];
            }
          }
        }
      }
    });
  });

  // Return the initialized socket server
  return io;
};
