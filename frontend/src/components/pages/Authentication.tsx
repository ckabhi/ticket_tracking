import { useState } from "react";
import UserAuth from "../login/Login";
import NavBar from "../navBar/NavBar";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/action/account/account.action";
import { useSelector } from "react-redux";

const Authentication = () => {
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

  const handleSumbitClick = (e: any) => {
    if (validateFormData()) {
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      dispatch(userLogin(payload));
      console.log("STATE_DATA", stateData);
    }
  };

  const validateFormData = () => {
    if (formData.email.trim() == "" || formData.password.trim() == "")
      return false;
    return true;
  };

  return (
    <UserAuth
      authType={authType}
      changeHandler={handleChange}
      formData={formData}
      authTypeChangeHandler={handleAuthTypeChange}
      forgetPasswordHandler={handleForgetPassword}
      submitHandler={handleSumbitClick}
    />
  );
};

export default Authentication;
