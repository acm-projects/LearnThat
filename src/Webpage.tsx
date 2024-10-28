import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm.tsx";
import SignUp from "./components/SignUp.tsx";
import View from "./components/View.tsx";
import Quiz from "./components/Quiz.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/Home" />} />
                <Route path="/Login" element={<LoginForm />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/Home" element={<View />} />
                <Route path="/Quiz" element={<Quiz />} />
            </Routes>
        </Router>
    );
}

export default App;
