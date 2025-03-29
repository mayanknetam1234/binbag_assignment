import express from "express"
import dotenv from "dotenv"
import "express-async-errors"
import authRoute from "./routes/auth.routes.js";
import cors from "cors"
import connectDb from "./db/connect.js";
import cookieParser from "cookie-parser"

import errorHandlerMiddleware from "./middleware/error-handler.middleware.js";
import notFound from "./middleware/not-found.middleware.js";

dotenv.config()
const app=express();


const PORT=process.env.PORT  ;

//built middleware

app.use(express.json({limit:"10mb"}));


//application middleware
app.use(cookieParser())
app.use(cors({
    origin:true, //to-do :add the frontend url
    credentials:true
}))
app.use("/v1/api/auth",authRoute)
app.use(notFound)
app.use(errorHandlerMiddleware)










const startServer = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
};

startServer();