import usersRoute from "./routes/users.js";
import articleRoute from "./routes/article.js";
import authRoute from "./routes/auth.js";
import express from "express";
import mysql from 'mysql2';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import the cors package

const app = express();
app.use(cookieParser());
dotenv.config();
// create the connection to the MySQL database localhost env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE
});

// check connection
connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log('Connected to MySQL database artical.');
});

// Middlewares
app.use(cors()); // Use the cors middleware
app.use(express.json());

app.use("/v1/api/users", usersRoute);
app.use("/v1/api/article", articleRoute);
app.use("/v1/api/auth", authRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8000, () => {
  console.log("Connected to backend.");
});

export { connection };
