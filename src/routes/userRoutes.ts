import {Router} from "express";
import userController from "../controllers/userController";
import {apikeyMiddleware} from "../middlewares/apiKeyMidd";


const router = Router();

router.post("/register", apikeyMiddleware, userController.register);
router.post("/register/list", apikeyMiddleware, userController.registerList);
router.get("/", apikeyMiddleware, userController.getAllUsers);
router.get("/id/:id", apikeyMiddleware, userController.getUserById);
router.get("/username/:username", apikeyMiddleware, userController.getUserByUsername);
router.delete("/:id", apikeyMiddleware, userController.deleteUser);


export default router;