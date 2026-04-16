import { initializeSocketConnection } from "../services/chat.socket";
import { sendMessage,getChats,getMessages  } from "../services/chat.api";
import {
  setChats,
  setCurrentChatId,
  setError,
  setLoading,
} from "../chat.slice";
import { useDispatch } from "react-redux";
import { store } from "../../../app/app.store"; 


export const useChat = () => {
  const dispatch = useDispatch();

async function handleGetMessages(chatId) {
  try {
    dispatch(setLoading(true));

    const data = await getMessages(chatId);

    console.log("MESSAGES API:", data);

    const chats = store.getState().chat.chats;

    const updatedChats = {
      ...chats,
      [chatId]: {
        ...chats[chatId],
        messages: data.messages || []
      },
    };

    dispatch(setChats(updatedChats));
    dispatch(setCurrentChatId(chatId));
  } catch (error) {
    dispatch(setError(error?.message));
  } finally {
    dispatch(setLoading(false));
  }
}

  async function handleGetChats() {
    try {
      dispatch(setLoading(true));
  
      const data = await getChats();
  
      console.log("API RESPONSE:", data);
  
      const chatsArray = data.chat || []; // 🔥 FIX
  
      const chatsObj = {};
  
      chatsArray.forEach((chat) => {
        chatsObj[chat._id] = {
          ...chat,
          messages: [],
        };
      });
  
      dispatch(setChats(chatsObj));
    } catch (error) {
      dispatch(setError(error?.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleSendMessage({ message, chatId }) {
    try {
      console.log("SEND MESSAGE CALLED");
      dispatch(setLoading(true));

      const data = await sendMessage({ message, chatId });
      const { chat, aiMessage } = data;

      const chats = store.getState().chat.chats;

      const existingMessages = chats[chat._id]?.messages || [];
      
      if (existingMessages.at(-1)?.content === message) return;

      const updatedChats = {
        ...chats,
        [chat._id]: {
          ...chat,
          messages: [
            ...(chats[chat._id]?.messages || []),
            { content: message, role: "user" },
            aiMessage,
          ],
        },
      };

      dispatch(setChats(updatedChats));
      dispatch(setCurrentChatId(chat._id));
    } catch (error) {
      console.error("Send message error:", error);

    
      dispatch(setError(error?.message || "Something went wrong"));
    } finally {
     
      dispatch(setLoading(false));
    }
  }



  return {
    initializeSocketConnection,
    handleSendMessage,
    handleGetChats,
    handleGetMessages,
  };
};