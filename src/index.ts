import express, { json } from "express";
import cors from "cors";
import "express-async-errors";


import "./config/setup.js";
import handleErrors from "./middlewares/handleErrorMiddleware.js";
import router from "./router/router.js";

const app = express();

app.use(cors());
app.use(json());
app.use(router);
app.use(handleErrors);

app.use(router);

const PORT = +process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
});