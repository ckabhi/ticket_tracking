import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearRedirectTo } from "../redux/action/utility/utility.action";

/**
 * @description RedirectRoute is a HOC component that will monitore the redirect state in store and after change it will push the history data for redirection
 *
 * @requires This HOC must be used inside of routerProvider component.since its relaying on the logic of rect router dom
 * @function RedirectRoute
 * @param children
 * @returns cildren component
 */
const RedirectRoute = ({ children }: any) => {
  const redirectData = useSelector((state: any) => state?.utility);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const { path, replace } = redirectData;
    if (path) {
      navigate(path, { replace: replace });
      dispatch(clearRedirectTo());
    }
  }, [redirectData]);

  return children;
};

export default RedirectRoute;
