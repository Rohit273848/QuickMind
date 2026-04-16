import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import { chatModel } from "../models/chat.model.js";
import { messageModel } from "../models/message.model.js";
import { getIo } from "../sockets/chat.socket.js";

export const chatController = async (req, res) => {
    const { message, chatId } = req.body;



    //use socket here

    let title = null, chat = null;
    if (!chatId) {
        title = await generateChatTitle(message)
        chat = await chatModel.create({
            user: req.user.id,
            title
        })
    }


    const userMessage = await messageModel.create({
        chat: chatId || chat._id,
        role: "user",
        content: message,
    })

    const messages = await messageModel.find({
        chat: chatId || chat._id
    }).sort({ createdAt: 1 })

    const result = await generateResponse(messages.slice(-10));

    const cleanedSources = (result.sources || []).map((s) => ({
        title: s.title,
        url: s.url,
    }));

    const aiMessage = await messageModel.create({
        chat: chatId || chat._id,
        role: "ai",
        content: result.answer,   // ✅ FIX
        sources: cleanedSources, // ✅ ADD THIS
    });

    const io = getIo();

    io.to(req.user.id).emit("new-message", {
        title, // 🔥 include title
        chat: chat || { _id: chatId }, // 🔥 same as API
        aiMessage, // 🔥 full message object
    });

    console.log(messages);

    res.status(201).json({
        title,
        chat: chat || { _id: chatId }, // ✅ FIX
        aiMessage,
    });
}


export const getChat = async (req, res) => {
    console.log("getchat called");

    const user = req.user;


    const chat = await chatModel.find({
        user: user.id
    })

    res.status(200).json({
        message: "chat retrieved successfully",
        chat
    })
}

export const getMessage = async (req, res) => {
    const { chatId } = req.params;

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id,
    })
    if (!chat) {
        return req.status(404).json({
            message: "ChatId or User not exist"
        })
    }

    const messages = await messageModel.find({
        chat: chatId,
    })



    res.status(200).json({
        message: "messages retrieved successfully",
        messages
    })
}


export const deleteChat = async (req, res) => {
    const { chatId } = req.params;

    const chat = await chatModel.findOneAndDelete({
        _id: chatId,
        user: req.user.id,
    })

    const messages = await messageModel.deleteMany({
        chat: chatId
    })

    if (!chat) {
        return res.status(404).json({
            message: "chat not found"
        })
    }

    res.status(200).json({
        message: "chat delete successfull"
    })
}