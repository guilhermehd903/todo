import { Router } from "express";


import UserController from "../controllers/userController";
import { verificarTokenJWT } from "../middlewares/jwt";
import PaymentController from "../controllers/paymentController";
import bodyParser from "body-parser";

const router = Router();

router.get('/all', (new UserController).allUsers);
router.get('/auth', verificarTokenJWT, (new UserController).authUsers);
router.post('/create', (new UserController).createUser);
router.post('/pay', verificarTokenJWT, (new PaymentController).payForPremium);
router.post('/confirm/:payid', verificarTokenJWT, (new PaymentController).payConfirm);
router.post('/login', (new UserController).UserLogin);

export default router;