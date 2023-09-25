const express=require("express");
const Employee=require("../models/employee.model");
const employeeRouter=express.Router();

employeeRouter.post("/employee", async(req,res)=>{
    const employeeData=req.body;

    try {
        const employee=await Employee.create(employeeData);
        res.status(201).json(employee);
    } catch (error) {
        res.send(401).json({error: error.message});
    }
});

employeeRouter.get("/employee", async(req,res)=>{
    const {page, pageSize}=req.query;
    const skip=(page-1)*pageSize;

    try {
        const employee=await Employee.find().skip(skip).limit(parseInt(pageSize));
        res.json(employee)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

employeeRouter.put("/employee/:id", async(req,res)=>{
    const {id}=req.params;
    const updates=req.body;

    try {
        const updateEmployee=await Employee.findByIdAndUpdate(id,updates, {new: true});
        res.json(updateEmployee);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

employeeRouter.delete("/employee/:id", async(req,res)=>{
    const {id}=req.params;

    try {
       await Employee.findByIdAndDelete(id);
       req.send("Employee deleted")
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

module.exports=employeeRouter;