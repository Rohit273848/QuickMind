import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth" ,
    withCredentials:true,
})

export const register = async ({username,email,password})=>{
    try{
        const response=await api.post("/register",{username,email,password})
        return response.data
    }catch(error){
        console.error("Register Error:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// LOGIN
export const login = async ({ email, password }) => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });
  
      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  };
  
  // LOGOUT
  export const logout = async () => {
    try {
      const response = await api.post("/logout");
      return response.data;
    } catch (error) {
      console.error("Logout Error:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  };

  export const getMe = async ()=>{
    try{
        const response = await api.get('/get-me')
        return response.data;
    }catch(error){
        console.error("get me Error:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
  }