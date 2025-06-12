import {Router} from "express";
import tokenController from "../controllers/tokenController";
import {apikeyMiddleware} from "../middlewares/apiKeyMidd";


const router = Router();

router.post("/refresh", apikeyMiddleware, tokenController.refresh);
router.get("/access", apikeyMiddleware, tokenController.getUserByToken);

export default router;