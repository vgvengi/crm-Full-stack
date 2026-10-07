import argon2 from "argon2";
import express, { Request, Response } from "express";
import { ResultSetHeader } from "mysql2";
import db from "../config/db";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    !name.trim() ||
    !email.trim() ||
    password.length < 8
  ) {
    res.status(400).json({
      success: false,
      message: "Name, a valid email address, and an 8-character password are required.",
    });
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    res.status(400).json({
      success: false,
      message: "Enter a valid email address.",
    });
    return;
  }

  try {
    const hashedPassword = await argon2.hash(password);
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO users (user_name, user_email, password_hash) VALUES (?, ?, ?)",
      [name.trim(), normalizedEmail, hashedPassword]
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully.",
      userId: result.insertId,
    });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ER_DUP_ENTRY"
    ) {
      res.status(409).json({
        success: false,
        message: "An account with this email address already exists.",
      });
      return;
    }

    console.error("Failed to create user:", error);
    res.status(500).json({
      success: false,
      message: "Unable to create your account. Please try again.",
    });
  }
});

export default router;
