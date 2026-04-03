import "dotenv/config";
import express from "express";
import cors from "cors";
import chatRoutes from "./router/routes.js";
import paymentRoutes from "./router/paymentRoutes.js";
import cartRoutes from "./router/cartRoutes.js";
import visionRoutes from "./router/visionRoutes.js";
import productRoutes from "./router/productRoutes.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 5050;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    credentials: true,
  })
);

async function connectToDatabase() {
  try{
  // Simulate database connection (replace with actual connection logic)
  await mongoose.connect("mongodb://localhost:27017/visioncart");
  console.log("Connected to the database successfully");
  }
  catch(error){
    console.error("Database connection error:", error.message);
  }

}

connectToDatabase();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.use("/api", chatRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/vision", visionRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
