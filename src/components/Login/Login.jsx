import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import * as jwt_decode from 'jwt-decode';  // Named import for jwt-decode

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:3000/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data); // Store token in localStorage
			window.location = "/photoUpload"; // Redirect to photo upload page
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message); // Display error message
			}
		}
	};

	// Check token expiration
	const checkTokenExpiration = () => {
		const token = localStorage.getItem("token");
		if (!token) return false; // No token, user is not authenticated

		try {
			const decodedToken = jwt_decode.default(token); // Use 'default' to access the default export
			const currentTime = Date.now() / 1000; // Get current time in seconds

			if (decodedToken.exp < currentTime) {
				localStorage.removeItem("token"); // Remove expired token
				window.location = "/login"; // Redirect to login page
				return false; // Token is expired
			}
			return true; // Token is valid
		} catch (error) {
			// If decoding fails or token is invalid, remove it and redirect to login
			localStorage.removeItem("token");
			window.location = "/login";
			return false;
		}
	};

	useEffect(() => {
		checkTokenExpiration(); // Check token expiration when the component is mounted
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
						<button type="submit" className="green_btn_login">
							Sign In
						</button>
					</form>
				</div>
				<div className="right_login">
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className="white_btn_login">
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
