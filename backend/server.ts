import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import contactRouter from "./routes/contacts.routes";
import companyRouter from "./routes/companies.routes";
import dealsRouter from "./routes/deals-pipe-line.routes";

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactRouter);
app.use("/api/companies", companyRouter);
app.use("/api/dealsStages", dealsRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
