const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 7000;
const { dbConnection } = require("./src/db/db.connection");
const blogRoutes = require("./src/routes/blog");
// Db connection
dbConnection(process.env.DB_URL).then((res) => {
  if (res) {
    return console.log("Database connection successfull");
  }
});

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 400;
  return res.status(statusCode).json({ error: err.message, code: statusCode });
});

// API path
app.use("/api/blog", blogRoutes);

app.get("/", (req, res) => {
  return res.send("Hello From ExpressJs Server");
});

app.listen(PORT, () => {
  return console.log(`ExpressJs server listening at port ${PORT}`);
});
