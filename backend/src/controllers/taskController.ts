import { Request, Response } from "express";
import UserService from "../service/userService";

import obj from "../config/obj";
import { comparePassword, createJWT, filter_var, genPassword } from "../utils/helpers";
import TaskService from "../service/task";

class TaskController {

    async allTasks(req: Request, res: Response): Promise<void> {
        const userObj = new UserService();
        const fetch = await userObj.getAll();

        if (!fetch) {
            obj.setError("erro ao recuperar usuarios");
            res.status(404).json(obj);
            return;
        }

        obj.setData(fetch);
        res.json(obj.obj);
    }

    async deleteTask(req: Request, res: Response): Promise<void> {
        const { user } = req.body;

        const taskObj = new TaskService();
        const taskUnique = await taskObj.taskIsMine(req.params.taskid, user);

        if(!taskUnique){
            obj.setError("Proibido apagar essa tarefa");
            res.json(obj);
            return;
        }
        
        const delTask = await taskObj.delTask(taskUnique.id);

        if(!delTask){
            obj.setError("Erro ao apagar tarefa");
            res.json(obj);
            return;
        }

        obj.setData([]);
        res.json(obj.obj);
    }

    async updateTask(req: Request, res: Response): Promise<void> {
        const { user, state } = req.body;

        const taskObj = new TaskService();
        const taskUnique = await taskObj.taskIsMine(req.params.taskid, user);

        if(!taskUnique){
            obj.setError("Proibido atualizar essa tarefa");
            res.json(obj);
            return;
        }
        
        const upTask = await taskObj.updateTask(taskUnique.id,state);

        if(!upTask){
            obj.setError("Erro ao atualizar tarefa");
            res.json(obj);
            return;
        }

        obj.setData([]);
        res.json(obj.obj);
    }

    async createTask(req: Request, res: Response): Promise<void> {
        const { title, content, user } = req.body;

        let userObj = new UserService();
        let userUnique = await userObj.getById(user);

        if (!user) {
            obj.setError("ID de usuario Incorreto");
            res.json(obj);
            return;
        }

        let dataObj = {
            title,
            content,
            state: false,
            userId: user,
            createdAt: (new Date),
            updatedAt: (new Date)
        };

        const taskObj = new TaskService();
        const add = await taskObj.create(dataObj);

        if (!add) {
            obj.setError("erro ao cadastrar tarefa");
            res.status(404).json(obj);
            return;
        }

        obj.setData(add);
        res.json(obj.obj);
    }
}

export default TaskController;