import express, { Request, Response } from "express";
import { ResultSetHeader } from "mysql2";
import db from "../config/db";

const router = express.Router();
// Post API for storing the data to mysql
router.post("/", async (req: Request, res: Response) => {
  const {
    email,
    firstName,
    lastName,
    contactOwner,
    jobTitle,
    phoneNumber,
    lifeCycleStage,
    leadStatus,
  } = req.body;

  const sql = `
    INSERT INTO contacts (email, first_name, last_name, contactOwner,
      jobTitle,phoneNumber,lifeCycleStage,leadStatus)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  try {
    const [result] = await db.query<ResultSetHeader>(sql, [
      email,
      firstName,
      lastName,
      contactOwner,
      jobTitle,
      phoneNumber,
      lifeCycleStage,
      leadStatus
    ]);

    res.status(201).json({
      success: true,
      message: "Contact created successfully",
      contactId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json((
    {
      success: false,
      message: "Failed to create contact",
    }));
  }
});

router.get("/", async (req, res) => {
    console.log("GET /api/contacts called");

  try {
    const [rows] = await db.query("SELECT * FROM contacts");

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch contacts",
    });
  }
});
export default router;
