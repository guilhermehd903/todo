import { Request, Response } from "express";
import UserService from "../service/userService";

import obj from "../config/obj";
import { comparePassword, createJWT, filter_var, genPassword } from "../utils/helpers";
import { User } from "@prisma/client";

class UserController {

    async allUsers(req: Request, res: Response): Promise<void> {
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

    async createUser(req: Request, res: Response): Promise<void> {
        const { email, name, password } = req.body;

        if (!filter_var(email, "email")) {
            obj.setError("Informe um endereço de e-mail valido");
            res.json(obj.obj);
            return;
        }

        const userObj = new UserService();
        const emailUnique = await userObj.getByEmail(email);

        if (emailUnique) {
            obj.setError("Endereço de e-mail informado já esta em uso");
            res.json(obj.obj);
            return;
        }

        genPassword(password, async (val: any) => {
            let dataObj = {
                email,
                name,
                password: val,
                createdAt: (new Date),
                updatedAt: (new Date)
            };

            let add = await userObj.create(dataObj);

            obj.setData(add);
            res.json(obj.obj);
        });
    }

    async authUsers(req: Request, res: Response): Promise<void> {
        const { user } = req.body;

        const userObj = new UserService();
        const userUnique = await userObj.getById(user);

        if (!userUnique) {
            obj.setError("Erro ao autenticar!");
            res.json(obj.obj);
            return;
        }

        obj.setData(userUnique);
        res.json(obj.obj);
    }

    async UserLogin(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        if (!email || !password) {
            obj.setError("Informe os campos de e-mail e senha");
            res.json(obj.obj);
            return;
        }

        if (!filter_var(email, "email")) {
            obj.setError("Informe um endereço de e-mail valido");
            res.json(obj.obj);
            return;
        }

        const userObj = new UserService();
        const emailUnique = await userObj.getByEmail(email);

        if (emailUnique) {
            comparePassword(password, emailUnique.password, async (hasAccess: boolean) => {
                if (!hasAccess) {
                    obj.setError("Email e/ou senha incorreto");
                    res.json(obj.obj);
                } else {
                    obj.setData({
                        ...emailUnique,
                        jwt: createJWT(emailUnique.id)
                    });
                    res.json(obj.obj);
                }

                return;
            });
        } else {
            obj.setError("Email e/ou senha incorreto");
            res.json(obj.obj);
            return;
        }
    }
}

export default UserController;