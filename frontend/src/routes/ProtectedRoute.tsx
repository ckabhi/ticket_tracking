import Logout from "../components/logout/Logout";
import { checkUserAuthentication } from "../helper/checkAuthentication";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }: any) => {
  const logedinStatus =
    useSelector((state: any) => state?.account?.isLogedIn) || false;
  const isAuthenticated = checkUserAuthentication(logedinStatus);
  if (!isAuthenticated) return <Logout />;

  return children;
};

export default ProtectedRoute;
