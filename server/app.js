const express = require("express");
const app = express();
const path = require("path");
const { Mysql, closeConnection } = require("../database/mysql");

// Set folder untuk template EJS

app.use("/static", express.static(path.join(__dirname, "../public")));
app.set("views", path.join(__dirname, "../public/html"));
app.set("view engine", "ejs");

// Middleware untuk parsing request body (opsional)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route handler
app.get("/test", (req, res) => {
  console.log("hello world");
  res.status(200).render("index.ejs");
});

// Jalankan server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
