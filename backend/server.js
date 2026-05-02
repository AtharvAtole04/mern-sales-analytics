import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/analytics", analyticsRoutes);
app.get("/", (req, res) => {
  res.send("Sales Analytics API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});