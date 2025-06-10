import {Request, Response, NextFunction} from "express";
import adminApiKeyService from "../services/adminApiKeyService";


export const apikeyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.get('Authorization')

    if (!apiKey) {
        res.status(401).json({message: "API Key is required"});
        return;
    }

    try {
        const adminApiKey = await adminApiKeyService.get(apiKey);
        if (!adminApiKey) {
            res.status(401).json({message: "Invalid API Key"});
            return
        }
        res.locals.admin_id = adminApiKey.admin_id;
        next();
    } catch (error) {
        console.error("Error in API Key middleware: ", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}
