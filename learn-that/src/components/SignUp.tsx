import { FormEventHandler, useState } from "react";
import "./SignUp.css";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

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

    const handleFormSubmit = (password: string) => {
        console.log("Passwords match. Navigating to dashboard. " + password);
        navigate("/View"); // Change to your dashboard route

        // TODO: backend handle adding the password to the user maybe?
    };

    return (
        <div className="wrapper">
            <h1>Sign Up</h1>
            <div className="input-box">
                <input type="text" placeholder="Username" required />
                <FaUser className="icon" />
            </div>
            <PasswordForm onSubmit={handleFormSubmit} />{" "}
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
