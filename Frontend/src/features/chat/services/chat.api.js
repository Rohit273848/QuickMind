import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/chats", // ✅ fixed
  withCredentials: true,
});

// 🔹 Send Message
export async function sendMessage({ message, chatId }) {
  try {
    const response = await api.post("/message", { message, chatId });
    return response.data;
  } catch (error) {
    console.error("sendMessage error:", error);
    throw error?.response?.data || error.message;
  }
}

// 🔹 Get Chats
export async function getChats() {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("getChats error:", error);
    throw error?.response?.data || error.message;
  }
}

// 🔹 Get Messages
export async function getMessages(chatId) {
  try {
    const response = await api.get(`/${chatId}/messages`);
    return response.data;
  } catch (error) {
    console.error("getMessages error:", error);
    throw error?.response?.data || error.message;
  }
}

// 🔹 Delete Chat
export async function deleteChat(chatId) {
  try {
    const response = await api.get(`/delete/${chatId}`);
    return response.data;
  } catch (error) {
    console.error("deleteChat error:", error);
    throw error?.response?.data || error.message;
  }
}