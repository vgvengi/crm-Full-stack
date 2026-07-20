import  express, { Request, Response, Router } from "express";
import db from "../config/db";
import { ResultSetHeader } from "mysql2";

const router = express.Router();
// 1. req part
// 2. sql query
// 3. try catch part that will say whether the result is stored
// successfull or what

router.post("/", async (req: Request, res: Response) => {
  const {
    companyDomainName,
    companyName,
    companyOwner,
    dateCreated,
    phoneNumber,
    lastActivityDate,
    city,
    CountryRegion,
    industry,
  } = req.body;

  const sql = ` INSERT INTO companies ( companyDomainName, companyName,
        companyOwner,
        dateCreated,
        phoneNumber,
        lastActivityDate,
        city,
        CountryRegion,
        industry)
        VALUES(?,?,?,?,?,?,?,?,?)`;

  try {
    const [result] = await db.query<ResultSetHeader>(sql, [
      companyDomainName,
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
      companytId: result.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to create",
    });
  }
});

router.get("/",async(req:Request,res:Response)=>{
  console.log("GET/api/companies called")
  try{
    const [rows]= await db.query("SELECT * FROM companies");
    res.json(rows);
  }catch(error){
    res.status(500).json({
      message:"Faild to get companies"
    })
  }
})
export default router