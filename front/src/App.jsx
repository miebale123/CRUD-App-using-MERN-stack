import { useState } from "react";
import Auth from "./Auth";
// import Home from "./Home";

export default function App() {
    const [token, setToken] = useState("");

    // const logToken = () => console.log(token);

    return (
        <div className="h-screen">
            {/* <nav className="p-2 bg-black flex gap-4 justify-around text-white">
                <a href="#">Habesha Sales</a>
                <a href="#">sign up</a>
                <a href="#">sign in</a>
            </nav> */}
            <Auth setToken={setToken} />
            {/* <Home token={token} /> */}

            {/* <Trial setTrial={setTrial} /> */}
            {/* <button onClick={logToken}>log Token</button> */}
        </div>
    );
}

// export default function App() {
//     return (
//         <BrowserRouter>
//             {/* Navigation Links */}
//             <nav>
//                 <Link to="/signup">sign up</Link>
//                 <Link to="/signIn">sign in</Link>
//             </nav>

//             {/* Routes decide which page to render */}
//             <Routes>
//                 <Route path="/signup" element={<Signup />} />
//                 <Route path="/signIn" element={<Signin />} />
//             </Routes>
//         </BrowserRouter>
//     );
// }
