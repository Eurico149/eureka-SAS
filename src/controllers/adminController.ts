import {Request, Response} from "express";
import admService from "../services/adminService";
import {HalfAdmin, HalfAdminType} from "../models/admin";


const register = async (req: Request, res: Response):Promise<any> => {
    const adminValidation = HalfAdmin.safeParse(req.body);
    if (!adminValidation.success) {
        return res.status(400).json({"message": "Invalid admin data"});
    }
    const admin: HalfAdminType = adminValidation.data;

    try{
        return res.status(201).json(await admService.register(admin));
    } catch (error) {
        return res.status(400).json({"message": "Error registering admin"});
    }
}

export default {register};
