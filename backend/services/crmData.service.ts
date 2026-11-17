import db from "../config/db";

interface CRMContext {
  recentContacts: any[];
  recentCompanies: any[];
  recentDeals: any[];
}

export async function getCRMContext(userId: number): Promise<CRMContext> {
  try {
    // Fetch recent contacts
    const [contacts] = await db.query(
      `SELECT id, name, email, phone FROM contacts WHERE user_id = ? LIMIT 5`,
      [userId]
    );

    // Fetch recent companies
    const [companies] = await db.query(
      `SELECT id, name, industry FROM companies WHERE user_id = ? LIMIT 5`,
      [userId]
    );

    // Fetch recent deals
    const [deals] = await db.query(
      `SELECT id, name, stage, amount FROM deals WHERE user_id = ? LIMIT 5`,
      [userId]
    );

    return {
      recentContacts: contacts || [],
      recentCompanies: companies || [],
      recentDeals: deals || [],
    };
  } catch (error) {
    console.error("Error fetching CRM context:", error);
    return {
      recentContacts: [],
      recentCompanies: [],
      recentDeals: [],
    };
  }
}

export async function saveChatHistory(
  userId: number,
  title: string,
  messages: any[]
): Promise<number> {
  try {
    const query = `
      INSERT INTO chat_histories (user_id, title, messages, created_at, updated_at)
      VALUES (?, ?, ?, NOW(), NOW())
    `;
    const [result] = await db.query(query, [
      userId,
      title,
      JSON.stringify(messages),
    ]);

    return (result as any).insertId;
  } catch (error) {
    console.error("Error saving chat history:", error);
    throw new Error("Failed to save chat history");
  }
}
