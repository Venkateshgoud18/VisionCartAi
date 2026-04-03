import express from "express";
import Product from "../models/product.js";
import authMiddleware from "../utils/auth.js";

const router = express.Router();

// GET /api/products - Fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Fetch products error:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch products" });
  }
});

// POST /api/products - Add a new product (Authenticated)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, price, category, description } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const newProduct = new Product({
      name,
      price,
      category,
      description,
    });

    await newProduct.save();

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Add product error:", error.message);
    res.status(500).json({ success: false, error: "Failed to add product" });
  }
});

export default router;
