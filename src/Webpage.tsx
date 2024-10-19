import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm.tsx";
import SignUp from "./components/SignUp.tsx";
import View from "./components/View.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/View" />} />
                <Route path="/LoginForm" element={<LoginForm />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/View" element={<View />} />
            </Routes>
        </Router>
    );
}

export default App;
