import Logout from "../components/logout/Logout";
import { checkUserAuthentication } from "../helper/checkAuthentication";
import { useSelector } from "react-redux";
import RedirectRoute from "./RedirectRoute";

/**
 * @function ProtectedRoute
 *
 * @description This is an HOC component that will check if user is authenticated or not and Protect the Routes then it retun the child componet with Redirect HOC wrapper.
 * @todo Later we can impliment access controll for routes
 * @param children react component
 * @returns if authenticated then it will return children component wrapped in redirect wrapper else return fallback component wrapped in redirect wrapper.
 */
const ProtectedRoute = ({ children }: any) => {
  const logedinStatus =
    useSelector((state: any) => state?.account?.isLogedIn) || false;
  const isAuthenticated = checkUserAuthentication(logedinStatus);
  if (!isAuthenticated)
    return (
      <RedirectRoute>
        <Logout />
      </RedirectRoute>
    );

  return <RedirectRoute>{children}</RedirectRoute>;
};

export default ProtectedRoute;
