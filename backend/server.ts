import  express  from "express";
import cors from "cors";
require("dotenv").config();

const contactRouter=require("./routes/contacts.routes")
const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/contacts",contactRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running in port ${PORT}`);
});
