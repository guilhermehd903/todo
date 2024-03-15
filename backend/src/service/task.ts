import { Task } from "@prisma/client";
import prisma from "../config/prisma";

class TaskService {
    public error: boolean = false;

    async create(data: Omit<Task, 'id'>) {
        try {
            return prisma.task.create({
                data: {
                    ...data
                }
            })
        } catch (err) {
            this.error = true;
            return;
        }
    }

    async taskIsMine(idTask: string, idUser: string) {
        try {
            return prisma.task.findUnique({ where: { id: idTask, userId: idUser } })
        } catch (err) {
            this.error = true;
            return;
        }
    }

    async delTask(idTask: string) {
        try {
            return prisma.task.delete({ where: { id: idTask } });
        } catch (err) {
            this.error = true;
            return;
        }
    }

    async updateTask(idTask: string, state: boolean) {
        try {
            return prisma.task.update({ data: { state: state }, where: { id: idTask } })
        } catch (err) {
            this.error = true;
            return;
        }
    }
}

export default TaskService;