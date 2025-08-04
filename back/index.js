const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// Secret used to sign JWTs
const SECRET = "yourSecretKey";

// Dummy users
const users = [
  { id: 1, name: "userOne" },
  { id: 2, name: "userTwo" },
];

// Login: Accepts username and returns a token
// app.post("/login", (req, res) => {
//   // const { username } = req.body;

//   // Find user (no password check, simplified)
//   // const user = users.find((u) => u.name === username);

//   // if (!user) return res.send("User not found");

//   // Create JWT with user id and name

//   const token = jwt.sign({ id: 1, name: "userOne" }, SECRET);
//   res.json({ token });
// });

// // Protected route: Only accessible with valid JWT
// app.get("/protected", (req, res) => {
//   const authHeader = req.headers.authorization;

//   // Expect header like: Authorization: Bearer <token>
//   const token = authHeader && authHeader.split(" ")[1];

//   // if (!token) return res.send("Token missing");

//   // Verify token
//   const decoded = jwt.verify(token, SECRET);

//   // Send decoded info
//   res.json({ message: "Access granted", user: decoded });
// });

app.post("/createUser", (req, res) => {});

app.post("/register", (req, res) => { });

app.post("/login", (req, res) => {
  const token = jwt.sign({ id: 1, username: "userOne" }, SECRET);
  res.send(token);
});


app.get("/protected", (req, res) => {
  const authHeader = req.headers.authorization;

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, SECRET);

  res.send(decoded);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
