import express from "express";
import UserCart from "../models/userCart.js";
import authMiddleware from "../utils/auth.js";
import Product from "../models/product.js";

const router = express.Router();

// Helper to get populated and cleaned cart
const getCleanedCart = async (userId) => {
  const cart = await UserCart.findOne({ userId }).populate("items.productId");
  if (!cart) return { items: [] };
  
  // Filter out items where productId is null or undefined (product was deleted)
  const validItems = cart.items.filter(item => item && item.productId);
  return { ...cart.toObject(), items: validItems.map(item => item.toObject()) };
};

// GET /api/cart - Get user's cart
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await getCleanedCart(userId);
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/cart/add - Add or update item in cart
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, name, price, category } = req.body;

    let product;
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(productId);
    if (isValidObjectId) product = await Product.findById(productId);
    
    if (!product) {
        product = await Product.findOneAndUpdate(
            { name }, 
            { name, price, category },
            { upsert: true, new: true }
        );
    }

    let cart = await UserCart.findOne({ userId });
    if (!cart) cart = new UserCart({ userId, items: [] });

    const itemIndex = cart.items.findIndex(item => item && item.productId && item.productId.toString() === product._id.toString());
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ productId: product._id, quantity: 1 });
    }

    await cart.save();
    const updatedCart = await getCleanedCart(userId);
    res.status(200).json({ success: true, cart: updatedCart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/cart/clear - Clear all items from cart
router.delete("/clear", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    let cart = await UserCart.findOne({ userId });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.status(200).json({ success: true, cart: { items: [] } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/cart/:productId - Remove item from cart
router.delete("/:productId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    let cart = await UserCart.findOne({ userId });
    if (!cart) return res.status(404).json({ success: false, error: "Cart not found" });

    // SAFE FILTERING
    cart.items = cart.items.filter(item => 
        item && item.productId && item.productId.toString() !== productId
    );
    await cart.save();

    const updatedCart = await getCleanedCart(userId);
    res.status(200).json({ success: true, cart: updatedCart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
