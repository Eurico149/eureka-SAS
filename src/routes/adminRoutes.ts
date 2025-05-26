import {Router} from "express";
import {registerAdmin} from "../controllers/adminController";


const router = Router();

router.post("/register", registerAdmin);

export default router;