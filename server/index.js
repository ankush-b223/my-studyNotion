//dependencies
const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

//the server app
const app = express();

//connections
const dbConnect = require("./config/db");
const {cloudinaryConnect} = require("./config/cloudinary");


//import routes
const userRouter = require("./routes/user");
const profileRouter = require("./routes/profile");
const paymentRouter = require("./routes/payment");
const courseRouter = require("./routes/course");



//app's port
const PORT = process.env.PORT || 4001;


//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp",
}));
app.use(cors({
    origin:'*',
    credentials:true,
}));

//initiating connections;
dbConnect.connect();
cloudinaryConnect();

//routes initialized
app.use("/api/v1/auth" , userRouter );
app.use("/api/v1/profile" , profileRouter );
app.use("/api/v1/payment" , paymentRouter );
app.use("/api/v1/course" , courseRouter );

//server endpoint
app.get("/",(req,res)=>{
    res.send("Server is up");
})


//app listener
app.listen(PORT , ()=>{
    console.log(`App is listening on port: ${PORT}`);
})