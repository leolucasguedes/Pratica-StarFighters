import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import router from "./router.js";

const app = express();

app.use(cors());
app.use(json());

app.use(router);

const PORT = +process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
});