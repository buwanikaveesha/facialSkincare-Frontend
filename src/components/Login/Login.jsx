import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import * as jwt_decode from 'jwt-decode';
import { jwtDecode } from "jwt-decode";
import "./Login.css";


const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:3000/api/auth";
            const { data: res } = await axios.post(url, data);

            // Check if token is received
            if (!res.token) {
                console.error("No token received from backend.");
                return;
            }

            // Store token in localStorage
            localStorage.setItem("token", res.token);
            navigate("/", { replace: true });
            window.location.reload();
        } catch (error) {
            console.error("Login Error:", error.response ? error.response.data : error.message);
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };

    // Check token expiration on component mount
    const checkTokenExpiration = () => {
        const token = localStorage.getItem("token");
        if (!token) return false;

        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                console.warn("Token expired. Logging out...");
                localStorage.removeItem("token");
                navigate("/login");
                return false;
            }
            return true;
        } catch (error) {
            console.error("JWT Decoding Error:", error.message);
            localStorage.removeItem("token");
            navigate("/login");
            return false;
        }
    };

    useEffect(() => {
        checkTokenExpiration();
    }, []);

    return (
        <div className="login_container">
            <div className="login_form_container">
                <div className="left_login">
                    <form className="form_container" onSubmit={handleSubmit}>
                        <h1>Login to Your Account</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className="input_login"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className="input_login"
                        />
                        {error && <div className="login_error_msg">{error}</div>}
                        <button type="submit" className="green_btn_login">Sign In</button>
                    </form>
                </div>
                <div className="right_login">
                    <h1>New Here?</h1>
                    <Link to="/signup">
                        <button type="button" className="white_btn_login">Sign Up</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
