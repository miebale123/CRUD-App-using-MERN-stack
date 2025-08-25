const allowRole = (role) => (req, res, next) => {
  if (req.decoded.role === role) {
    next();
  } else {
    res.json({ message: "access denied" });
  }
};

app.get("/admin", auth, allowRole("admin"), (req, res) => {
  res.json({ message: "you are an admin" });
});

app.get("/dashboard", auth, allowRole("user"), (req, res) => {
  res.json({ message: "you are a user" });
});
