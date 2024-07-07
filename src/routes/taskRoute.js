import {Router} from 'express'
import taskModel from '../models/taskModel.js';
import role from '../middlewares/role.js';

const taskRouter=Router();

taskRouter.get("/", role(["admin","user"]) ,async(req,res)=>{
    const todos=await taskModel.find();
    res.json({todos: todos});
    try{

    } catch(err){
        res.status(500).send(err);
    }
})


taskRouter.post("/admin",role(["admin"]),async(req,res)=>{
    const {title, desc}=req.body;
    try{
        const tasks=new taskModel({title, desc, user_id:req.result.id})
        await tasks.save();

        res.status(201).json({message: "task is creaded successfully"})

    } catch(err){
        res.status(500).send(err);
    }
})

// taskRouter.patch("/",async(req,res)=>{
//     try{

//     } catch(err){
//         res.status(500).send(err);
//     }
// })

taskRouter.patch("/:id", role(["admin"]), async (req, res) => {
    const { id } = req.params;
    const { title, desc } = req.body;
    try {
        const task = await taskModel.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.title = title;
        task.desc = desc;
        await task.save();
        res.json({ message: "Task updated successfully" });
    } catch (err) {
        res.status(500).send(err);
    }
});


// taskRouter.delete("/",async(req,res)=>{
//     try{

//     } catch(err){
//         res.status(500).send(err);
//     }
// })

// Delete a task, accessible only by admin
taskRouter.delete("/:id", role(["admin"]), async (req, res) => {
    const { id } = req.params;
    try {
        const task = await taskModel.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        await taskModel.findByIdAndDelete(id);
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).send(err);
    }
});

export default taskRouter;