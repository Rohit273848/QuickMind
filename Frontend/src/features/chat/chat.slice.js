import { createSlice } from "@reduxjs/toolkit";


const chatSlice = createSlice({
    name:"chats",
    initialState:{
        chats:{},
        currentChatId:null,
        loading:false,
        error:null,
    },
    reducers:{
        createNewChat:(state,action)=>{
            const {chatId,title} =action.payload;
            state.chats[chatId]={
                id:chatId,
                title,
                messaages:[],
                lastUpdates:new Date().toISOString(),
            }
           
        }
        ,
        setChats:(state,action) =>{
            state.chats = action.payload;
        },
        setCurrentChatId:(state,action)=>{
            state.currentChatId = action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        },
        setError:(state,action)=>{
            state.error=action.payload
        }
    }
})

export const {setChats,setCurrentChatId,setError,setLoading,createNewChat} = chatSlice.actions;

export default chatSlice.reducer;