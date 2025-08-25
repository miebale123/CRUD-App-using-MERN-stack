import { useState } from "react";

export default function Auth({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // const tokenSetter = () => setToken("one");

    const postSignup = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username, password: password }),
        });
        const data = await res.json();
        console.log("the total users are: ", data);
    };

    const postSignIn = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username, password: password }),
        });
        const data = await res.json();
        setToken(data.token);
        console.log("the token now is ", data.token);
    };

    // const getAdminAceess = async () => {
    //     const res = await fetch("http://localhost:5000/admin", {
    //         method: "GET",
    //         headers: { Authorization: `Bearer ${token}` },
    //     });
    // };

    return (
        <div className="m-2 space-y-16">
            {/* <button onClick={tokenSetter}>change token</button> */}
            <form onSubmit={postSignup} className="grid">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 m-2"
                    placeholder="enter username"
                />
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 m-2"
                    placeholder="enter password"
                />
                <button type="submit" className="border p-2 m-2">
                    sign up
                </button>
            </form>

            <form onSubmit={postSignIn} className="grid">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 m-2"
                    placeholder="enter username"
                />
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 m-2"
                    placeholder="enter password"
                />
                <button type="submit" className="border p-2">
                    sign in
                </button>
            </form>

            {/* <button onClick={getAdminAceess} className="border p-2">
                admin page
            </button> */}
        </div>
    );
}
