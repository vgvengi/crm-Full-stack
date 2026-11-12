import express, { Router, Request, Response } from "express";
import { authenticate } from "../middleware/authenticate";
import { AIChatService } from "../services/aiChat.service";
import { getCRMContext, saveChatHistory } from "../services/crmData.service";

const router = Router();

// Store active AI service instances per user
const aiServiceCache = new Map<string, AIChatService>();

function getAIService(userEmail: string): AIChatService {
  if (!aiServiceCache.has(userEmail as any)) {
    aiServiceCache.set(userEmail as any, new AIChatService());
  }
  return aiServiceCache.get(userEmail as any)!;
}

// POST /api/assistant/chat - Send a message
router.post("/chat", authenticate, async (req: Request, res: Response) => {
  try {
    const { message, includeContext, clearHistory } = req.body;
    const userId = (req as any).authenticatedUser?.email;

    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    // Validate input
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    if (message.length > 4000) {
      return res
        .status(400)
        .json({ error: "Message too long (max 4000 characters)" });
    }

    // Get AI service for this user
    const aiService = getAIService(userId);

    // Clear history if requested (new conversation)
    if (clearHistory) {
      aiService.clearHistory();
    }

    // Get CRM context if requested
    let crmData;
    if (includeContext) {
      crmData = await getCRMContext(userId);
    }

    // Get AI response
    const reply = await aiService.chat(message, crmData);

    res.json({
      success: true,
      reply,
      historyLength: aiService.getHistoryLength(),
    });
  } catch (error) {
    console.error("Chat error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Chat failed";
    res.status(500).json({ error: errorMessage });
  }
});

// POST /api/assistant/save-history - Save current conversation
router.post(
  "/save-history",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const { title } = req.body;
      const userEmail = (req as any).authenticatedUser?.email;

      if (!userEmail) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const aiService = getAIService(userEmail);
      const messages = aiService.getHistory();

      if (messages.length === 0) {
        return res.status(400).json({ error: "No messages to save" });
      }

      // For now, just clear history (you can add database save later)
      aiService.clearHistory();

      res.json({
        success: true,
        messageCount: messages.length,
      });
    } catch (error) {
      console.error("Save history error:", error);
      res.status(500).json({ error: "Failed to save history" });
    }
  }
);

// POST /api/assistant/export-chat - Export conversation as JSON
router.post(
  "/export-chat",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const userEmail = (req as any).authenticatedUser?.email;

      if (!userEmail) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const aiService = getAIService(userEmail);
      const messages = aiService.getHistory();

      if (messages.length === 0) {
        return res.status(400).json({ error: "No messages to export" });
      }

      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `breeze-chat-${timestamp}.json`;

      res.json({
        success: true,
        filename,
        format: "json",
        data: messages,
      });
    } catch (error) {
      console.error("Export error:", error);
      res.status(500).json({ error: "Failed to export chat" });
    }
  }
);

export default router;
