import { express, Request, Response, Router } from "express";
import db from "../config/db";
import { ResultSetHeader } from "mysql2";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const {
    companyName,
    companyOwner,
    dateCreated,
    phoneNumber,
    lastActivityDate,
    city,
    CountryRegion,
    industry,
  } = req.body;

  const sql = ` INSERT INTO companies (  companyName,
        companyOwner,
        dateCreated,
        phoneNumber,
        lastActivityDate,
        city,
        CountryRegion,
        industry)
        VALUE(?,?,?,?,?,?,?,?)`;

  try {
    const [result] = await db.query(sql<ResultSetHeader>, [
      companyName,
      companyOwner,
      dateCreated,
      phoneNumber,
      lastActivityDate,
      city,
      CountryRegion,
      industry,
    ]);

    res.status(201).json({
      success: true,
      message: "Companies created successfully",
      contactId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create",
    });
  }
});
