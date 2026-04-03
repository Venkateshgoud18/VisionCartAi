import express from "express";
import scanImageWithAI from "../utils/visionScanner.js";

const router = express.Router();

// POST /api/vision/scan
router.post("/scan", async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ success: false, error: "Image data is required" });
    }

    const suggestions = await scanImageWithAI(image);

    res.status(200).json({
      success: true,
      suggestions: suggestions,
    });
  } catch (error) {
    console.error("Vision scan route error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to scan image",
    });
  }
});

export default router;
