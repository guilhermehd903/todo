import { Router } from "express";
import TaskController from "../controllers/taskController";
import { verificarTokenJWT } from "../middlewares/jwt";

const router = Router();

router.post('/create', verificarTokenJWT, (new TaskController).createTask);
router.delete('/destroy/:taskid', verificarTokenJWT, (new TaskController).deleteTask);
router.put('/update/:taskid', verificarTokenJWT, (new TaskController).updateTask);

export default router;