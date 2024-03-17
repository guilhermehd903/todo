import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import userRoute from "./routes/user";
import taskRoute from "./routes/task";
import PaymentController from "./controllers/paymentController";

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoute);
app.use('/task', taskRoute);

app.listen(3000, () => {
    console.log("APP todo iniciado na porta 3000");
});