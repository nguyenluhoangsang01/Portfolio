import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import postRoutes from "./routes/post.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "localhost";

const app = express();

app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
	connectDB();
	console.log(`Server started at http://${HOST}:${PORT}`);
});

app.use("/api/post", postRoutes);
