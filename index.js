const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

dotenv.config();
/*
mongoose.connect(process.env.MONGO_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,},
        ()=> {
            console.log("Database connexted successfully");
        }
    );
        //console.log("Database connexted successfully");
*/
//Database
const connectToDatabase = module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try{
        mongoose.connect(process.env.MONGO_URL, connectionParams);
        console.log("Database connexted successfully");
    } catch (error){
        console.log(error);
        console.log("Database Failed");

    }

}
connectToDatabase();

//middleware
app.use(express.json());
app.use(helmet())
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);


app.listen(8080, ()=>{
    console.log("Backend sever is running!");
});