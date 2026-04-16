import "dotenv/config"
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import http from "http"
import {initSocket} from "./src/sockets/chat.socket.js"

const httpServer = http.createServer(app);

initSocket(httpServer);

connectDB();

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});