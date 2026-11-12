import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import contactRouter from "./routes/contacts.routes";
import companyRouter from "./routes/companies.routes";
import dealsRouter from "./routes/deals-pipe-line.routes";
import userSignUpRouter from "./routes/users.signup.routes";
import userLoginRouter from "./routes/users.login.routes";
import assistantRouter from "./routes/assistant.routes";


const app = express();

app.use(cors(
  {
    credentials: true,
    origin: process.env.CLIENT_URL ||  "http://localhost:5173"
  }
));
app.use(express.json());

// This app.get("/",(req,res)) it is used for whether the backend is running
//  or not in vercel when deployed
app.get("/", (_req, res) => {
  res.json({ status: "ok" });
});


app.use("/api/contacts", contactRouter);
app.use("/api/companies", companyRouter);
app.use("/api/dealsStages", dealsRouter);
app.use("/api/users",userSignUpRouter);
app.use("/api/auth", userLoginRouter);
app.use("/api/assistant", assistantRouter);
app.use(errorHandler);

if(!process.env.VERCEL){
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;