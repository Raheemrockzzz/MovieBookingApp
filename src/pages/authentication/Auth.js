import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { signIn, signUp } from "../../api/auth";


const Auth = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("CUSTOMER");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const redirectURL = () => {
    
    const userType = localStorage.getItem("userTypes");
    if(!userType){
      setErrorMessage("Something went wrong");
      return;
    }

    if(userType==="CUSTOMER"){
      navigate(-1);
    }
    else if(userType==="CLIENT"){
      navigate("/client");
    }
    else{
      navigate("/admin")
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      redirectURL();
    }
  }, []);

  const updateSignupData = (e) => {
    const id = e.target.id;

    if (id === "username") {
      setUserName(e.target.value);
    } else if (id === "userId") {
      setUserId(e.target.value);
    } else if (id === "email") {
      setEmail(e.target.value);
    } else if (id === "password") {
      setPassword(e.target.value);
    }

    setErrorMessage("");
    setMessage("");
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
    clearState();
  };

  const handleSelect = (e) => {
    setUserType(e);
  };

  const clearState = () => {
    setEmail("");
    setUserId("");
    setUserName("");
    setPassword("");
    setUserType("CUSTOMER");
    setErrorMessage("");
    setMessage("");
  };

  const validateData = (data) => {
    if (data.userId.length < 5 || data.userId.length > 10) {
      setErrorMessage("User Id should be 5 to 10 characters long");
      return false;
    }
    if (data.userId.includes(" ")) {
      setErrorMessage("UserId should not contain spaces");
      return false;
    }
    if (data.password.length < 6 || data.password.length > 10) {
      setErrorMessage("Password should be 6 to 10 characters long");
      return false;
    }
    if (data.password.includes(" ")) {
      setErrorMessage("Password should not contain spaces");
      return false;
    }
    if (data.name) {
      if (data.name.length < 5 || data.name.length > 10) {
        setErrorMessage("Username should be 5 to 10 characters long");
        return false;
      }
      if (data.name.includes(" ")) {
        setErrorMessage("Username should not contain spaces");
        return false;
      }
    }
    return true;
  };

  const loginFn = async (e) => {
    e.preventDefault();

    const data = {
      userId,
      password,
    };

    if (!validateData(data)) {
      return;
    }

    // API call
    const result = await signIn(data);
    
    if(result.status === 200){
      setMessage("logged in successfully");
      
      const {name, userId, userTypes, userStatus, accessToken} = result.data;
      localStorage.setItem("name", name)
      localStorage.setItem("userId", userId);
      localStorage.setItem("userTypes", userTypes);
      localStorage.setItem("userStatus", userStatus);
      localStorage.setItem("accessToken", accessToken);

      redirectURL();
    }
    setErrorMessage(result.data.message);
      
  };

  const signupFn = async (e) => {
    e.preventDefault();

    const data = {
      name: userName,
      userId,
      password,
      email,
      userType,
    };

    if (!validateData(data)) {
      return;
    }

    // API call
    const response = await signUp(data);
    
    if(response.status === 201){
      setMessage("Singned up successfully");
      clearState();
    }else {
      setErrorMessage(response.data.message);
    }
  };

  return (
    <div id="loginPage bg-danger vh-100">
      <div className="loginPage  bg-danger d-flex justify-content-center align-itmes-center vh-100">
        <div className="  card  m-5 p-5 bg-dark shadow-lg rounded-4 text-light d-flex justify-content-center align-items-center">
          <h3 className=" fw-bolder text-warning">
            {showSignup ? "Sign up" : "Login"}
          </h3>

          <form onSubmit={showSignup ? signupFn : loginFn}>
            <div className="input-group">
              <input
                type="text"
                className="form-control m-2 p-2"
                placeholder="User Id"
                value={userId}
                id="userId"
                autoFocus
                required
                onChange={updateSignupData}
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                className="form-control m-2 p-2"
                placeholder="Password"
                value={password}
                id="password"
                autoFocus
                required
                onChange={updateSignupData}
              />
            </div>

            {showSignup && (
              <>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control m-2 p-2"
                    placeholder="User name"
                    value={userName}
                    id="username"
                    autoFocus
                    required
                    onChange={updateSignupData}
                  />
                </div>

                <div className="input-group">
                  <input
                    type="email"
                    className="form-control m-2 p-2"
                    placeholder="Email"
                    value={email}
                    id="email"
                    autoFocus
                    required
                    onChange={updateSignupData}
                  />
                </div>

                <div className="row m-1">
                  <div className="col mt-3">
                    <span className=" my-2">User Type</span>
                  </div>
                  <div className="col m-1 p-1">
                    <DropdownButton
                      align="end"
                      title={userType}
                      id="userType"
                      onSelect={handleSelect}
                      variant="light"
                    >
                      <Dropdown.Item eventKey="CUSTOMER">
                        CUSTOMER
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="CLIENT">CLIENT</Dropdown.Item>
                    </DropdownButton>
                  </div>
                </div>
              </>
            )}

            <div className="input-group m-1 p-2">
              <input
                type="submit"
                className="form-control btn btn-danger fw-bolder"
                value={showSignup ? "Sign up" : "Login"}
              />
            </div>
            <div className="text-center " onClick={toggleSignup}>
              {showSignup
                ? "Already have an account? Login here"
                : "Don't you have an account? Sign up here"}
            </div>

            <div className="text-success text-center">{message}</div>
            <div className="text-danger text-center">{errorMessage}</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
