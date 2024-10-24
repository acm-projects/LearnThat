import { FormEventHandler, useState } from "react";
import "./SignUp.css";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
// @ts-ignore
import { signUp } from "../../webpage.js";

interface Props {
    onSubmit: (password: string) => void;
}

function PasswordForm({ onSubmit }: Props) {
    // Accept onSubmit as a prop
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault(); // Prevent the default form submission
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match!");
        } else {
            setErrorMessage("");
            // Call the onSubmit prop with the password if they match
            onSubmit(password);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {" "}
            {/* Attach handleSubmit to form */}
            <div className="input-box">
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <FaLock className="icon" />
            </div>
            <div className="input-box">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <FaLock className="icon" />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit">Register</button>
        </form>
    );
}

const SignUp = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const handleFormSubmit = (username: string, password: string) => {
        console.log("Passwords match. Attempting sign up " + password);
        signUp(username, password, () => navigate("/View")); //// Navigate to the /View route on successful log in
    };

    return (
        <div className="wrapper">
            <h1>Sign Up</h1>
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
            <PasswordForm
                onSubmit={(password) => handleFormSubmit(username, password)}
            />{" "}
            {/* Pass the handleFormSubmit function */}
            <div className="remember-forgot">
                <label>
                    <input type="checkbox" />
                    Remember me
                </label>
            </div>
            <div className="register-link">
                <p>
                    Already have an account?
                    <Link to="/LoginForm">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
