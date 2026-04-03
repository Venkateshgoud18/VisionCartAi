import express from "express";
import getOpenAIAPIResponce from "../utils/openai.js";
import User from "../models/user.js";
import Product from "../models/product.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
const router = express.Router();


router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        error: "Message is required and must be a string",
      });
    }

    const systemPrompt = `You are VisionCart AI assistant. 
    If the user wants to add a product (e.g. "Add a [Item] for [Price]"), respond in this EXACT JSON format:
    { "action": "add_product", "product": { "name": "Item Name", "price": Number, "category": "Electronics/Audio/Accessories" }, "reply": "Confirmation message" }
    
    If it's just a normal chat, just respond with your message.`;

    const aiResponse = await getOpenAIAPIResponce(`${systemPrompt}\nUser: ${message}`);
    
    let addedProduct = false;
    let finalReply = aiResponse;

    try {
        const parsed = JSON.parse(aiResponse);
        if (parsed.action === "add_product" && parsed.product) {
            const newProduct = new Product(parsed.product);
            await newProduct.save();
            addedProduct = true;
            finalReply = parsed.reply;
        }
    } catch (e) {
        // Not JSON, treat as normal chat
    }

    res.status(200).json({
      success: true,
      reply: finalReply,
      addedProduct: addedProduct,
    });
  } catch (error) {
    console.error("Chat route error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to get response from OpenAI",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ error: "Server error during registration" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email }, 
      process.env.JWT_SECRET,                 
      { expiresIn: "7d" }                     
    );

    // ✅ Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Server error during login" });
  }
});






export default router;
