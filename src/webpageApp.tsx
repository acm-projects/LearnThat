import { createRoot } from "react-dom/client";
import "./webpageApp.css";
import Webpage from "./Webpage.tsx";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
createRoot(document.getElementById("root")!).render(<Webpage />);
