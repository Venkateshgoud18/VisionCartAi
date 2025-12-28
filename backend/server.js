import express from "express";
import chatRoutes from "./router/routes.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 5050;
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});