import express from "express";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4040;

// CORS Middleware
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};
// Logging Middleware
const logging = (request, response, next) => {
  console.log(
    `${request.method} ${request.url} ${new Date().toLocaleString("en-us")}`
  );
  next();
};

app.use(cors);
app.use(express.json());
app.use(logging);

// NOTE: MIDDLEWARE GOES BEFORE THE CREATION OF THE ROUTES :)

// Request handlers go here
app.get("/status", (request, response) => {
  response.status(200).json({ message: "Service healthy" });
});

app.listen(PORT, () => console.log("Listening on port 4040"));
