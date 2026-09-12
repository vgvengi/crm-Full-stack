import  express, { Router }  from "express";
import cors from "cors";
import errorHandler 
import contactRouter from "./routes/contacts.routes";
import companyRouter from "./routes/companies.routes"
const router:Router =express.Router();
// import cors from "cors"
require("dotenv").config();

const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/contacts",contactRouter)
app.use("/api/companies",companyRouter)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running in port ${PORT}`);
});
