import { User } from "@prisma/client";
import prisma from "../config/prisma";

class UserService {
    public error: boolean = false;

    async create(data: Omit<User, 'id'>) {
        try {
            return prisma.user.create({
                data: {
                    ...data
                }
            })
        } catch (err) {
            this.error = true;
            return;
        }
    }

    async getAll() {
        try {
            return prisma.user.findMany();
        } catch (err) {
            this.error = true;
            return;
        }
    }

    async getByEmail(email: string) {
        try {
            return prisma.user.findUnique({ where: { email: email } });
        } catch (err) {
            this.error = true;
            return;
        }
    }

    async getById(id: string) {
        try {
            return prisma.user.findUnique({ where: { id: id }, select: { name: true, email: true, premium: true, tasks: true, createdAt: true, updatedAt: true } });
        } catch (err) {
            this.error = true;
            return;
        }
    }

    async updateUser(id: string, data: any) {
        try {
            return prisma.user.update({ where: { id: id }, data: { ...data } })
        } catch (err) {
            this.error = true;
            return;
        }
    }
}

export default UserService;