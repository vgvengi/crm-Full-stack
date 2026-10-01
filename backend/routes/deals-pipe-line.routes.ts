import express,{NextFunction, Request, Response, Router} from "express";
import db from "../config/db";
const router =Router();

router.get("/deals-stage",async(req :Request,res :Response ,next:NextFunction):Promise<void>=>{

    try{
        const [rows] = await db.query('SELECT * FROM deal_stage_array ORDER BY SEQUENCE ASC')
        res.status(200).json(rows);  
    }
    catch(err){
        console.log(err);
        // res.status(500).json({error: 'Internal server error'});
        next(err);

    }
})

export default router;