import express, { Request, Response } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../config/db";

const router = express.Router();
// Post API for storing the data into mysql
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
      leadStatus,
    ]);

    res.status(201).json({
      success: true,
      message: "Contact created successfully",
      contactId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create contact",
    });
  }
});
// this router is for getting all the contacts into the table
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

// this router is for getting the details of that particular contacts and show in the overview page
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM contacts WHERE id =?",
      [req.params.id],
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "contact not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "faild to fetch" });
  }
});

// this router is for puting the notes into the mysql for that particular contacts

router.post("/:id/notes", async (req: Request, res: Response) => {
  const { body } = req.body;
  if (!body || !body.trim()) {
    res.status(400).json({ message: "note cannot be empty " });
    return;
  }
  try {
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO notes(contact_id,note) VALUES(?,?)",
      [req.params.id, body.trim()],
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "unable to upload note " });
  }
});

router.get("/:id/notes", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM notes WHERE contact_id =? ORDER BY  created_at  DESC ",
      [req.params.id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({message:"failed to get the note response "})
  }
});
export default router;
