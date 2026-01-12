import express from "express";
import cors from "cors";
import chatRoutes from "./router/routes.js";
import paymentRoutes from "./router/paymentRoutes.js";

const app = express();
const PORT = process.env.PORT || 5050;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", chatRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
