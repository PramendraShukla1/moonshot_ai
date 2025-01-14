const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Router = require("./Routes/userRoutes");
const imageRouter = require("./Routes/imageRoutes");
dotenv.config();

const app = express();
//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Server
const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//mongoDB Database connection
const mongodb_url = process.env.MONGODB_URL;
mongoose.connect(mongodb_url);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

//api routes
//api checking...
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

//user routes
app.use("/api/user", Router);
app.use("/api/image", imageRouter);
