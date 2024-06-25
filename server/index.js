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

// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import subscriptionRoutes from './routes/subscriptionRoutes.js'; // Import subscription routes
// import route from "./routes/userRoute.js";

// const app = express();
// const PORT = process.env.PORT || 8000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// const MONGODB_URI = 'mongodb+srv://ahmad:SaFb123@cluster0.08sqnhz.mongodb.net/CrudApp?retryWrites=true&w=majority';
// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => console.log('Connected to MongoDB'));

// // Routes
// app.use('/api/subscriptions', subscriptionRoutes); // Use subscription routes
// app.use("/api", route);
// // Start server
// app.listen(PORT, () => {
//   console.log(Server is running on http://localhost:${PORT});
// });