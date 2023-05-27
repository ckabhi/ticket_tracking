import { useSelector } from "react-redux";

export const checkUserAuthentication = () => {
  const isUserAuthenticated =
    useSelector((state: any) => state?.account?.isLogedIn) || false;
  return isUserAuthenticated;
};

export const getToken = () => {
  const token = useSelector((state: any) => state?.account?.token) || null;
  return token;
};
