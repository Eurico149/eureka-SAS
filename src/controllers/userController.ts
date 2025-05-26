import {Request, Response} from "express";
import {register} from "../services/userService";
import {HalfUser, HalfUserType} from "../models/user";


export const registerUser = async (req: Request, res: Response):Promise<any> => {
    const userValidation = HalfUser.safeParse(req.body);
    if (!userValidation.success) {
        return res.status(400).json({"message": "Invalid user data"});
    }
    const user: HalfUserType = userValidation.data;

    try{
        return res.status(201).json(await register(user));
    } catch (error) {
        return res.status(400).json({"message": "Error registering user"});
    }
}
