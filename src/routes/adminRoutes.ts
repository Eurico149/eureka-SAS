import {Router} from "express";
import admController from "../controllers/adminController";


const router = Router();

router.post("/register", admController.register);

export default router;