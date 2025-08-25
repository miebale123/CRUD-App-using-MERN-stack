import { useState } from "react";

export default function App() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [me, setMe] = useState("");

    const postSignup = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        console.log("signup:", data);
    };

    const postSignin = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        console.log("signin:", data);
        if (data.token) setToken(data.token);
    };

    const getMe = async () => {
        const res = await fetch("http://localhost:5000/me", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log("me:", data);
        setMe(JSON.stringify(data));
    };

    return (
        <div className="p-4 space-y-4">
            <form onSubmit={postSignup} className="space-x-2">
                <input
                    className="border p-2"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="border p-2"
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="border p-2" type="submit">
                    Sign up (hash)
                </button>
            </form>

            <form onSubmit={postSignin} className="space-x-2">
                <input
                    className="border p-2 bg"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="border p-2"
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="border p-2" type="submit">
                    Sign in (get JWT)
                </button>
            </form>

            <div className="space-x-2">
                <button className="border p-2" onClick={getMe}>
                    Call /me (protected)
                </button>
                <span className="text-xs break-all">
                    Token: {token || "(none yet)"}
                </span>
            </div>

            <pre className="border p-2">{me}</pre>
        </div>
    );
}
