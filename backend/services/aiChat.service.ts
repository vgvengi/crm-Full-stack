import OpenAI from "openai";

interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

export class AIChatService {
  private client: OpenAI;
  private conversationHistory: ConversationMessage[] = [];
  private maxHistoryLength = 20;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  private getSystemPrompt(crmData?: any): string {
    let prompt = `You are Breeze, a helpful AI assistant for a CRM system.

Your responsibilities:
- Help users manage contacts, companies, and sales deals
- Provide insights about their pipeline and sales activity
- Answer questions about their CRM data
- Suggest next actions and best practices

Guidelines:
- Keep responses under 150 words unless asked for details
- Reference specific data when available
- Use the user's data to personalize recommendations
- Never make up data - only reference what you're told
- Be friendly but professional`;

    if (crmData) {
      prompt += `

Current CRM Context:
${JSON.stringify(crmData, null, 2)}`;
    }

    return prompt;
  }

  async chat(userMessage: string, crmContext?: any): Promise<string> {
    if (!userMessage.trim()) {
      throw new Error("Message cannot be empty");
    }

    // Add user message to history
    this.conversationHistory.push({
      role: "user",
      content: userMessage,
    });

    try {
      const response = await this.client.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        max_tokens: 1024,
        messages: [
          {
            role: "system",
            content: this.getSystemPrompt(crmContext),
          },
          ...this.conversationHistory,
        ],
      });

      // Extract text from response
      const assistantMessage = response.choices[0]?.message.content?.trim() ?? "";

      if (!assistantMessage) {
        throw new Error("Empty response from OpenAI");
      }

      // Add assistant response to history
      this.conversationHistory.push({
        role: "assistant",
        content: assistantMessage,
      });

      // Maintain history length to save tokens
      if (this.conversationHistory.length > this.maxHistoryLength) {
        this.conversationHistory = this.conversationHistory.slice(
          -this.maxHistoryLength
        );
      }

      return assistantMessage;
    } catch (error) {
      console.error("OpenAI API error:", error);
      if (error instanceof Error) {
        if (
          error.message.includes("model_not_found") ||
          error.message.includes("has been deprecated")
        ) {
          throw new Error(
            "The configured OpenAI model is unavailable. Update OPENAI_MODEL to a supported model.",
          );
        }
        if (error.message.includes("401")) {
          throw new Error("Invalid OpenAI API key");
        }
        if (
          error.message.includes("quota") ||
          error.message.includes("no credits remaining") ||
          error.message.includes("credit_balance_exhausted")
        ) {
          throw new Error(
            "OpenAI credits are exhausted. Add credits in your billing settings to continue."
          );
        }
        if (error.message.includes("429")) {
          throw new Error(
            "OpenAI rate limit exceeded. Please try again in a moment."
          );
        }
      }
      throw new Error("Failed to get response from AI service");
    }
  }

  clearHistory(): void {
    this.conversationHistory = [];
  }

  getHistory(): ConversationMessage[] {
    return [...this.conversationHistory];
  }

  getHistoryLength(): number {
    return this.conversationHistory.length;
  }
}