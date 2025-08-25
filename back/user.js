import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { connectDB, Product, User } from "./db.js";

connectDB();
dotenv.config({ quiet: true });
const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
const port = 5000;
const SECRET = process.env.JWT_SECRET || "fallbackSecret";

app.get("/", async (req, res) => {
  const products = await Product.find();
  return res.json({ products: products });
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  return res.send(users);
});

const userRegExp = /^[a-zA-Z0-9_-]{3,20}$/;
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[^\s].{7,63}[^\s]$/;

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and password required" });
    }

    username = username.trim().toLowerCase();

    if (!userRegExp.test(username)) {
      return res.status(400).json({ message: "invalid username" });
    }

    const user = await User.findOne({ username });
    if (user) return res.json({ message: "user name exists. try another" });

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "password  characters must at least be 8" });
    }

    if (password.length > 64) {
      return res
        .status(400)
        .json({ message: "password must not exceed 64 characters" });
    }

    if (!passwordRegExp.test(password)) {
      return res.status(400).json({ message: "invalid password" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username: username,
      password: hashedPassword,
    });

    const users = await User.find();
    return res.json({ users });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "username already exists " });
    }
    return res.json({ message: error.message });
  }
});

// app.post("/signin", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if (!user || !password)
//       return res
//         .statusCode(400)
//         .json({ message: "username and password required" });

//     const user = await User.findOne({ username });
//     if (!user)
//       return res.statusCode(404).json({ message: "the user is not found " });

//     if (password !== user.password)
//       return res.json({ message: "password in correct" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.statusCode(401).json({ message: "wrong password" });

//     const token = jwt.sign(
//       { username: user.username },
//       SECRET
//       // { expiresIn: "1h" }
//     );

//     return res.json({ token: token });
//   } catch (err) {
//     return res.json({ message: err.message });
//   }
// });

// const auth = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader)
//     return res.json({ message: "no authorisation header given" });

//   const parts = authHeader.split(" ");
//   if (parts.length !== 2 || parts[0] !== "Bearer")
//     return res.json({ message: "malformed authorization header" });

//   const token = parts[1];
//   if (!token) return res.json({ message: "malformed authorization header" });

//   try {
//     const decoded = jwt.verify(token, SECRET);

//     req.decoded = decoded;
//     next();
//   } catch (err) {
//     if (err.name === "TokenExpiredError") {
//       return res.json({
//         message: "your session has expired, please log in again",
//       });
//     }
//     return res.json({ message: "invalid token" });
//   }
// };

// app.post("/protectedRoute", auth, (req, res) => {
//   res.send("you are", req.decoded);
// });

// app.post("/addToCart", async (req, res) => {
//   const { productId, token } = req.body;

//   const product = await Product.findById(productId);

//   const decoded = jwt.verify(token, SECRET);
//   const user = await User.findOne({ username: decoded.username });

//   const existingItem = await User.findOne({
//     username: decoded.username,
//     "cart.productId": product._id.toString(),
//   });

//   if (existingItem) {
//     await User.updateOne(
//       { username: decoded.username, "cart.productId": product._id.toString() },
//       { $inc: { "cart.$.quantity": 1 } }
//     );
//   } else {
//     await User.updateOne(
//       { username: decoded.username },
//       {
//         $push: {
//           cart: {
//             productId: product._id.toString(),
//             name: product.name,
//             quantity: 1,
//           },
//         },
//       }
//     );
//   }

//   res.send(user);
// });

app.delete("/deleteUsers", async (req, res) => {
  await User.deleteMany({});
  const users = await User.find();
  res.send(users);
});

app.listen(port, () => console.log(`the server is running on port ${port}`));
