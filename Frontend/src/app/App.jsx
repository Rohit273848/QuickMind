import { RouterProvider } from "react-router-dom"
import { router } from './app.routes.jsx'
import { useAuth } from "../features/auth/hooks/useAuth.js"
import { useEffect } from "react"
import { initializeSocketConnection } from "../features/chat/services/chat.socket.js"
import { useSelector } from "react-redux";

function App() {

  const auth = useAuth()
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    auth.handleGetMe();
  }, [])

  useEffect(() => {
    if (user?._id) {
      initializeSocketConnection(user._id);
      chat.listenForMessages(); // 🔥 ADD THIS
    }
  }, [user]);

  return (
    
    <RouterProvider router={router} />
  )
}

export default App
