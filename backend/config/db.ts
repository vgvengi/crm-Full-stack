import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 5,
  ssl:
    process.env.DB_SSL === "true"
      ? { minVersion: "TLSv1.2", rejectUnauthorized: true }
      : undefined,
});

export async function saveChatConversation(userId:number , title:string){
  const connection = await db.getConnection();
  try{
    const [result] = await connection.execute(
       'INSERT INTO chat_conversation (user_id, title) VALUES (?, ?)',
      [userId, title]
    );
    return (result as any).insertedId;
  }finally{
    connection.release();
  }
}

export async function saveChatMessage(
  connectionId:number,
  role:"user"|"assistant",
  content:string
){
  const connection = await db.getConnection();
  try{
    await connection.execute(
      `INSERT INTO chat_messages_individual(conversation_id,role,content) VALUES(?,?,?)`,
      [connectionId,role,content]
    );

  }finally{
    connection.release();
  }
}

export async function getChatHistory(
  messages:string,
  conversationId:number
){
  const connection =await db.getConnection();
  try{
    const [messages] = await connection.execute(
      `SELECT role,content,created_at FROM chat_messages_individual WHERE conversation_id =? ORDER BY created_at ASC`
      [conversationId]
    );
    return messages
  }finally{
    connection.release();
  }
}


export async function getUserConversations(userId: number) {
  const connection = await db.getConnection();
  try {
    const [conversations] = await connection.execute(
      'SELECT id, title, created_at, updated_at FROM chat_conversations WHERE user_id = ? ORDER BY updated_at DESC',
      [userId]
    );
    return conversations;
  } finally {
    connection.release();
  }
}
export default db;
