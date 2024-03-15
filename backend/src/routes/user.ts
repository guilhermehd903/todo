import { Router } from "express";


import UserController from "../controllers/userController";
import { verificarTokenJWT } from "../middlewares/jwt";

const router = Router();

router.get('/all', (new UserController).allUsers);
router.get('/auth', verificarTokenJWT, (new UserController).authUsers);
router.post('/create', (new UserController).createUser);
router.post('/login', (new UserController).UserLogin);

export default router;