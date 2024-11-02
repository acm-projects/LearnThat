import { FormEvent, FormEventHandler, useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
// @ts-ignore
import { logIn } from "../../webpage.js";

function LoginForm() {
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const [username, setUsername] = useState(""); // State for username
    const [password, setPassword] = useState(""); // State for password

    const handleSubmit: FormEventHandler = (e: FormEvent<Element>) => {
        e.preventDefault(); // Prevent the default form submission
        // Navigate to the /Home route on successful log in
        console.log("Username:", username);
        console.log("Password:", password);
        logIn(username, password, () => navigate("/Home"));
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                {" "}
                {/* Attach handleSubmit to the form */}
                <h1>Login</h1>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // Update state on input change
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update state on input change
                    />
                    <FaLock className="icon" />
                </div>
                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" />
                        Remember me
                    </label>
                    <a href="#">Forgot password?</a>
                </div>
                <button type="submit">Login</button>
                <div className="register-link">
                    <p>
                        Don't have an account?
                        <Link to="/SignUp"> Register</Link>{" "}
                        {/* Use Link directly without wrapping in an anchor tag */}
                    </p>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
