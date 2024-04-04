import { useEffect, useState } from "react";
import UserAuth from "../../login/Login";
import NavBar from "../../navBar/NavBar";
import { useDispatch } from "react-redux";
import {
  userLogin,
  userSignup,
} from "../../../redux/action/account/account.action";
import { useSelector } from "react-redux";
import SignUp from "../../signup/Signup";
import { checkUserAuthentication } from "../../../helper/checkAuthentication";
import pathConstant from "../../../routes/pathConstant";
import { useNavigate } from "react-router-dom";
import {
  IAuthFormState,
  ILoginPayload,
  ISignupPayload,
} from "../../../ts/interfaces/account.interface";
import { TAuthType } from "../../../ts/types/account.types";
import { redirectTo } from "../../../redux/action/utility/utility.action";

const Authentication = () => {
  const navigate = useNavigate();
  const logedinStatus =
    useSelector((state: any) => state?.account?.isLogedIn) || false;
  const [authType, setAuthType] = useState<TAuthType>("signin");
  const [formData, setFormData] = useState<IAuthFormState>({
    name: "",
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
      if (authType === "signin") {
        const payload: ILoginPayload = {
          email: formData.email,
          password: formData.password,
        };
        dispatch(userLogin(payload));
      }
      if (authType === "signup") {
        const payload: ISignupPayload = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };
        dispatch(userSignup(payload));
        console.log("payload", payload);
      }
    }
  };

  const validateFormData = (authType: TAuthType) => {
    switch (authType) {
      case "signin":
        if (formData.email.trim() == "" || formData.password.trim() == "")
          return false;
        return true;

      case "signup":
        if (
          formData.email.trim() === "" ||
          formData.password.trim() === "" ||
          formData.name === ""
        )
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
  }, []);

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
