import express from "express"
import { chatController, deleteChat, getChat, getMessage } from "../controllers/chat.controller.js";

const router = express.Router()

router.post("/message",chatController)
router.get("/",getChat)
router.get("/:chatId/messages",getMessage)
router.delete("/:chatId/delete",deleteChat)
export default router;