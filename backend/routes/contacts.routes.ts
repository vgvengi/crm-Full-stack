import express,{ Request,Response } from "express";
import { ResultSetHeader } from "mysql2";
import db from "../config/db";

const router = express.Router()

router.post("/", async(req:Request, res:Response) => {
  const { email, firstName, lastName } = req.body;

  const sql = `
    INSERT INTO contacts (email, first_name, last_name)
    VALUES (?, ?, ?)
  `;

//   db.query(
//     sql,
//     [email, firstName, lastName],
//     (err, result:ResultSetHeader) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({
//           success: false,
//           message: "Failed to create contact",
//         });
//       }

//       res.status(201).json({
//         success: true,
//         message: "Contact created successfully",
//         contactId: result.insertId,
//       });
//     }
//   );
try {
    const [result] = await db.query<ResultSetHeader>(
        sql,[email,firstName,lastName]
    ) ;

    res.status(201).json({
      success: true,
      message: "Contact created successfully",
      contactId: result.insertId});
} catch (error) {
    
}
});
export default router;