import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";     //cookieParser-means In server user browser is present and we can access the cookie and set the cookie

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());



//routes import
import userRouter from "./routes/user.routes.js"


//routes declaration
app.use("/api/v1/users", userRouter);     // we don't use app.get bcz we build separate folder of routers that's why we use app.use


//http://localhost:8000/api/v1/users/register
//http://localhost:8000/api/v1/users/login

export {app}