import express from "express";
const app = express();
app.use(express.json());
const port = 5000;

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'something went wrong';
  res.status(status).json({message: message})
  
};

app.post("/", (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      const err = new Error("username exists");
      err.statusCode = 400;
      throw err;
    }
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
