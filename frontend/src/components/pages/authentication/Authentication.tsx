import { useEffect, useState } from "react";
import UserAuth from "../../login/Login";
import NavBar from "../../navBar/NavBar";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../redux/action/account/account.action";
import { useSelector } from "react-redux";
import SignUp from "../../signup/Signup";
import { checkUserAuthentication } from "../../../helper/checkAuthentication";
import pathConstant from "../../../routes/pathConstant";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const navigate = useNavigate();
  const logedinStatus =
    useSelector((state: any) => state?.account?.isLogedIn) || false;
  const [authType, setAuthType] = useState("signin");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const stateData = useSelector((state) => state);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e?.target?.name;
    const value = e?.target?.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleAuthTypeChange = () => {
    if (authType === "signin") setAuthType("signup");
    else setAuthType("signin");
  };

  const handleForgetPassword = () => {
    console.log("forget password clicked");
  };

  const handleSubmitClick = (e: any) => {
    if (validateFormData(authType)) {
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      dispatch(userLogin(payload));
      console.log("STATE_DATA", stateData);
    }
  };

  const validateFormData = (authType: string) => {
    switch (authType) {
      case "signin":
        if (formData.email.trim() == "" || formData.password.trim() == "")
          return false;
        return true;

      default:
        return false;
    }
  };

  /**
   * @description if access token exist it will redirect to dashboard
   */
  useEffect(() => {
    console.log("Auth is loading...", logedinStatus);
    if (checkUserAuthentication(logedinStatus)) {
      navigate(pathConstant.HOME);
    }
  }, [logedinStatus]);

  return (
    <>
      {authType == "signin" && (
        <UserAuth
          changeHandler={handleChange}
          formData={formData}
          authTypeChangeHandler={handleAuthTypeChange}
          forgetPasswordHandler={handleForgetPassword}
          submitHandler={handleSubmitClick}
        />
      )}
      {authType == "signup" && (
        <SignUp
          changeHandler={handleChange}
          formData={formData}
          authTypeChangeHandler={handleAuthTypeChange}
          submitHandler={handleSubmitClick}
        />
      )}
    </>
  );
};

export default Authentication;
