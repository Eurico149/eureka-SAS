import {Request, Response} from "express";
import admService from "../services/adminService";
import adminApiKeyService from "../services/adminApiKeyService";
import {HalfAdmin, HalfAdminType} from "../models/admin";


const register = async (req: Request, res: Response):Promise<any> => {
    const adminValidation = HalfAdmin.safeParse(req.body);
    if (!adminValidation.success) {
        const simplifiedErrors = adminValidation.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
        }));

        return res.status(400).json({"message": "Invalid Admin Data", "errors": simplifiedErrors});
    }
    const admin: HalfAdminType = adminValidation.data;

    try {
        const storedAdmin = await admService.register(admin);
        const apiKey = await adminApiKeyService.register(storedAdmin.admin_id);
        return res.status(201).json({"admin": storedAdmin, "api_key": apiKey.api_key});
    } catch (error) {
        // temporary workaround for error handling
        console.error("Error registering admin or API key:", error);
        return res.status(500).json({"message": "Failed to register admin"});
    }
}

export default {register};
