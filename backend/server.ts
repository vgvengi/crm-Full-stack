import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import contactRouter from "./routes/contacts.routes";
import companyRouter from "./routes/companies.routes";
import dealsRouter from "./routes/deals-pipe-line.routes";
import userSignUpRouter from "./routes/users.signup.routes";
import userLoginRouter from "./routes/users.login.routes";


const app = express();

app.use(cors(
  {
    origin: process.env.CLIENT_URL ||  "http://localhost:5173"
  }
));
app.use(express.json());


app.get("/", (_req, res) => {
  res.json({ status: "ok" });
});


app.use("/api/contacts", contactRouter);
app.use("/api/companies", companyRouter);
app.use("/api/dealsStages", dealsRouter);
app.use("/api/users",userSignUpRouter);
app.use("/api/auth", userLoginRouter);
app.use(errorHandler);

if(!process.env.VERCEL){
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;