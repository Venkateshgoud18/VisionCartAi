import express from "express";
import getOpenAIAPIResponce from "../utils/openai.js";

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

    const aiResponse = await getOpenAIAPIResponce(message);

    res.status(200).json({
      success: true,
      reply: aiResponse,
    });
  } catch (error) {
    console.error("Chat route error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to get response from OpenAI",
    });
  }
});




export default router;
