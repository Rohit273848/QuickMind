import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: {},
    currentChatId: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Create a new chat
    createNewChat: (state, action) => {
      const { chatId, title } = action.payload;
      state.chats[chatId] = {
        _id: chatId,
        id: chatId,
        title: title || "New Chat",
        messages: [], // ✅ Fixed typo (was messaages)
        updatedAt: new Date().toISOString(), // ✅ Fixed name
      };
      state.currentChatId = chatId;
    },

    // Set all chats
    setChats: (state, action) => {
      state.chats = action.payload;
    },

    // Set current chat ID
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },

    // Add message to current chat
    addMessage: (state, action) => {
      const { chatId, message } = action.payload;
      if (state.chats[chatId]) {
        state.chats[chatId].messages.push(message);
        state.chats[chatId].updatedAt = new Date().toISOString();
      }
    },

    // Set messages for a chat
    setMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      if (state.chats[chatId]) {
        state.chats[chatId].messages = messages;
        state.chats[chatId].updatedAt = new Date().toISOString();
      }
    },

    // Delete a chat
    deleteChat: (state, action) => {
      const { chatId } = action.payload;
      delete state.chats[chatId];
      if (state.currentChatId === chatId) {
        state.currentChatId = null;
      }
    },

    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set error
    setError: (state, action) => {
      state.error = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  createNewChat,
  setChats,
  setCurrentChatId,
  addMessage,
  setMessages,
  deleteChat,
  setLoading,
  setError,
  clearError,
} = chatSlice.actions;

export default chatSlice.reducer;