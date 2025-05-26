import {Request, Response} from "express";
import {register} from "../services/adminService";
import {HalfAdmin, HalfAdminType} from "../models/admin";


export const registerAdmin = async (req: Request, res: Response):Promise<any> => {
    const adminValidation = HalfAdmin.safeParse(req.body);
    if (!adminValidation.success) {
        return res.status(400).json({"message": "Invalid admin data"});
    }
    const admin: HalfAdminType = adminValidation.data;

    try{
        return res.status(201).json(await register(admin));
    } catch (error) {
        return res.status(400).json({"message": "Error registering admin"});
    }
}
