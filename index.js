const express=require("express");
const app=express();
const connection=require("./config/db");
const userRouter=require("./routes/user.route");
const employeeRouter=require("./routes/employee.route")
const cors=require("cors");

app.use(cors());
app.use(express.json());
app.use(userRouter)
app.use(employeeRouter)

app.get("/", (req,res)=>{
    res.send("Home Page here")
})

app.listen(8000, async()=>{
    try {
        await connection
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
    console.log("Server is running on port 8000");
})