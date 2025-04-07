import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import toast, { Toaster } from "react-hot-toast";
import "./Signup.css";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const userAuthServer = async () => {
    try {
      const response = await apiRequest.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      if (response.data) {
        navigate("/login");
        toast.success("Registration successful 👍");
      }
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (!firstName.length) {
      return toast.error("Enter First Name");
    }

    if (!lastName.length) {
      return toast.error("Enter Last Name");
    }

    if (!email.length) {
      return toast.error("Enter Email");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Invalid Email");
    }

    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters"
      );
    }

    userAuthServer();
  };

  return (
    <>
      <Toaster />
      <div className="signup_container">
        <div className="signup_form_container">
          <div className="left_signup">
            <h1>Welcome Back</h1>
            <Link to="/login">
              <button type="button" className="white_btn_signup">
                Sign in
              </button>
            </Link>
          </div>
          <div className="right_signup">
            <form className="form_container" onSubmit={handleSubmit}>
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="signup_input"
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
                required
                className="signup_input"
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="signup_input"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="signup_input"
              />
              <button type="submit" className="green_btn_signup">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
