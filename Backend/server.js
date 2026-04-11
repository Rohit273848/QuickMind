import "dotenv/config"
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import http from "http"
import {initSocket} from "./src/sockets/chat.socket.js"

const httpServer = http.createServer(app);

initSocket(httpServer);

connectDB();


httpServer.listen(3000, () => {    
    console.log("Server is running on port 3000");
}   );