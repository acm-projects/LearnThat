import { createRoot } from "react-dom/client";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Popup from "./Popup.tsx";
//import View from "./components/View.tsx";
//import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./main.css";
createRoot(document.getElementById("root")!).render(<Popup />);