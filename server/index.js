import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";
import subscriptionRoutes from './routes/subscriptionRoutes.js'; // Import subscription routes

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();


const PORT = process.env.PORT || 8000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(()=>{

    console.log("Connected to MongoDB");

    app.listen(PORT, ()=>{
        console.log(`Server is running on port: ${PORT}`);
    })

}).catch(error => console.log(error));

app.use('/api/subscriptions', subscriptionRoutes); // Use subscription routes
app.use("/api", route);

