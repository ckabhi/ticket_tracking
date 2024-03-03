import { SecureStorage } from "../redux/store/store";

/**
 * TODO:: If token is valid then login status must be updated in the redux store
 */
export const checkUserAuthentication = (isLogedIn: boolean) => {
  let isUserAuthenticated = isLogedIn;
  const accessToken = SecureStorage.getAccessToken();
  if (!isUserAuthenticated && accessToken?.length) {
    isUserAuthenticated = true;
  }
  return isUserAuthenticated;
};

// export const getToken = () => {
//   const token = useSelector((state: any) => state?.account?.token) || null;
//   return token;
// };
