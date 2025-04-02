import express, { Router } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import AuthRoute from "./routes/Auth.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => res.send("Hello World!"));


// Router setup

app.use("/api/auth",AuthRoute)


mongoose.connect(process.env.DB_URL,{dbName:"blogmernwebsite"})
.then(()=>{
    console.log("Database connected..")
})
.catch(err=>console.log(err))
app.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}`)
);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500

    const message = err.message || "Internal Server error "
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })

})
