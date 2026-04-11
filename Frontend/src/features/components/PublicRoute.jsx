import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

const PublicRoute = ({ children }) => {
  const { user, loading } = useSelector(state => state.auth);

  if (loading) return <Loading/>;

  if (user) return <Navigate to="/" replace />;

  return children;
};

export default PublicRoute;