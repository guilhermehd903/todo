import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import obj from '../config/obj';

export const verificarTokenJWT = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;

    if (!token) {
        obj.setError("Token JWT não fornecido");
        return res.json(obj.obj);
    }

    jwt.verify(token, process.env.JWT as string, (err, decoded) => {
        if (err) {
            obj.setError("Token JWT inválido");
            return res.json(obj.obj);
        }

        req.body.user = decoded;
        next();
    });
};
