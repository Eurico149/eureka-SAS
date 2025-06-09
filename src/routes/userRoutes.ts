import {Router} from "express";
import userController from "../controllers/userController";
import {apikeyMiddleware} from "../middlewares/apiKeyMidd";


const router = Router();

router.post("/register", apikeyMiddleware, userController.register);

export default router;