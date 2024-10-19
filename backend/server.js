import express from 'express';
import path from "path";
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoutes.js" ;
import messageRoutes from "./routes/messageRoutes.js" ;
import postRoutes from "./routes/postRoutes.js"
import {v2 as cloudinary} from 'cloudinary'
import {app,server} from './socket/socket.js'
dotenv.config();
connectDB();

const PORT = process.env.PORT || 5001
const __dirname = path.resolve();
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET
})
app.use(express.json({limit: "50mb"}));  // allows to parse incomming data from requests
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());   // allows to get and set cookie from req and response

//Routes
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/messages",messageRoutes)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	// react app
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}


server.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`) );