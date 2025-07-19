// log in

<div className="flex justify-center ">
    {!logIn ? (
        <div className="border h-40 w-80 p-4">
            {message === "invalid user name" ? (
                <div className="text-red-500">{message}</div>
            ) : (
                <span>{message}</span>
            )}
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border"
            />
            <button
                onClick={() => {
                    users.some((user) => user.name === username)
                        ? setLogIn(true)
                        : setMessage("invalid user name");
                }}
                className="border px-2 m-1"
            >
                log in
            </button>
        </div>
    ) : (
        "dashboard permitted"
    )}
</div>; 


// sign up
// const profile = [];
// export default function App() {
//     const [hasSignedup, setHasSignedup] = useEffect(false);
//     const [cart, setCart] = useState(false);
//     const [showSignup, setShowSignup] = useState(false);
//     const [password, setPassword] = useState("");

//     return (
//         <div>
//             <button
//                 onClick={() => {
//                     "already signed up" ? setCart(true) : showSignup(true);
//                 }}
//             >
//                 add to cart
//             </button>

//             {showSignup && (
//                 <div className="border">
//                     <input
//                         type="text"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <button
//                         onClick={() => {
//                             profile.push(password);
//                         }}
//                     >
//                         sign up
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }

