import express,{NextFunction, Request, Response, Router} from "express";
import db from "../config/db";
const router =Router();

router.get("/deals-stage",async(req :Request,res :Response ,next:NextFunction):Promise<void>=>{

    try{
        const [rows] = await db.query('SELECT * FROM deal_stages_array ORDER BY stages_position ASC')
        res.status(200).json(rows);  
    }
    catch(err){
        console.log(err);
        // res.status(500).json({error: 'Internal server error'});
        next(err);

    }
})

export default router;