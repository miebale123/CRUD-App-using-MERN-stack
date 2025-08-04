import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// import SignUp from "./SignUp";
import App from "./App";
// import Auth from "./Auth";
import Courses from "./Courses";



const rootElement = document.getElementById("root");

createRoot(rootElement).render(
    <StrictMode>
        {/* <Auth />*/}
        <App />
        {/* <Courses/> */}
        
    </StrictMode>,
);
