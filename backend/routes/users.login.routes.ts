import argon2 from "argon2";
import express, { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import db from "../config/db";

type UserRow = RowDataPacket & {
  password_hash: string;
  user_email: string;
  user_name: string;
};

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password
  ) {
    res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
    return;
  }

  try {
    const [users] = await db.query<UserRow[]>(
      "SELECT user_name, user_email, password_hash FROM users WHERE user_email = ? LIMIT 1",
      [email.trim().toLowerCase()],
    );
    const user = users[0];

    if (!user || !(await argon2.verify(user.password_hash, password))) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        email: user.user_email,
        name: user.user_name,
      },
    });
  } catch (error) {
    console.error("Failed to log in user:", error);
    res.status(500).json({
      success: false,
      message: "Unable to log in. Please try again.",
    });
  }
});

export default router;
