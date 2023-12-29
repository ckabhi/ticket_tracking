import { useSelector } from "react-redux";
import { SecureStorage } from "../../redux/store/store";

/**
 * @description This guard component will be used to render some element of ui on which we want to impliment
 * rendering restriction like if user dont have specific permission.
 * @param param0
 */
const GuardComponent = ({ children }: any) => {
  let isUserAuthenticated =
    useSelector((state: any) => state?.account?.isLogedIn) || false;
  if (!isUserAuthenticated && SecureStorage.getAccessToken()?.length) {
    isUserAuthenticated = true;
  }

  return <>{isUserAuthenticated ? children : ""}</>;
};

export default GuardComponent;
