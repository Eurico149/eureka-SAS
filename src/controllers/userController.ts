import {Request, Response} from "express";
import userService from "../services/userService";
import {HalfUser, HalfUserType} from "../models/user";


const register = async (req: Request, res: Response):Promise<any> => {
    req.body.admin_id = res.locals.admin_id;
    const userValidation = HalfUser.safeParse(req.body);
    if (!userValidation.success) {
        const simplifiedErrors = userValidation.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
        }));
        return res.status(400).json({message: "Invalid user data", "errors": simplifiedErrors});
    }
    const user: HalfUserType = userValidation.data;

    try{
        return res.status(201).json(await userService.register(user));
    } catch (error) {
        // temporary workaround for error handling
        console.error("Error registering user:", error);
        return res.status(500).json({message: "Error registering user"});
    }
}


const registerList = async (req: Request, res: Response): Promise<any> => {
    req.body.forEach((user: {admin_id?: any}) => {
        user.admin_id = res.locals.admin_id;
    });
    const usersValidation = HalfUser.array().safeParse(req.body);
    if (!usersValidation.success) {
        const simplifiedErrors = usersValidation.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
        }));
        return res.status(400).json({message: "Invalid user data", "errors": simplifiedErrors});
    }
    const users: HalfUserType[] = usersValidation.data;

    try {
        const registeredUsers = await userService.registerList(users);
        return res.status(201).json(registeredUsers);
    } catch (error) {
        // temporary workaround for error handling
        console.error("Error registering users:", error);
        return res.status(500).json({message: "Error registering users"});
    }
}


const getAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await userService.getAll(res.locals.admin_id);
        return res.status(200).json(users);
    } catch (error) {
        // temporary workaround for error handling
        console.error("Error fetching users:", error);
        return res.status(500).json({message: "Error fetching users"});
    }
}


const getUserById = async (req: Request, res: Response): Promise<any> => {
    const userId = req.params.id;
    if (!userId) return res.status(400).json({message: "User ID is required"});

    try {
        const user = await userService.getById(userId, res.locals.admin_id);

        if (!user) return res.status(404).json({message: "User not found"});

        return res.status(200).json(user);
    } catch (error) {
        // temporary workaround for error handling
        console.error("Error fetching user:", error);
        return res.status(500).json({message: "Error fetching user"});
    }
}


const getUserByUsername = async (req: Request, res: Response): Promise<any> => {
    const username = req.params.username;
    if (!username) return res.status(400).json({message: "Username is required"});

    try {
        const user = await userService.getByUsername(username, res.locals.admin_id);

        if (!user) return res.status(404).json({message: "User not found"});

        return res.status(200).json(user);
    } catch (error) {
        // temporary workaround for error handling
        console.error("Error fetching user by username:", error);
        return res.status(500).json({message: "Error fetching user by username"});
    }
}


const deleteUser = async (req: Request, res: Response): Promise<any> => {
    const userId = req.params.id;
    if (!userId) return res.status(400).json({message: "User ID is required"});

    try {
        const deleted = await userService.del(userId, res.locals.admin_id);

        if (!deleted) return res.status(404).json({message: "User not found"});

        return res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        // temporary workaround for error handling
        console.error("Error deleting user:", error);
        return res.status(500).json({message: "Error deleting user"});
    }
}


export default {register,getAllUsers, getUserById, getUserByUsername, deleteUser, registerList};
