import { Request, Response } from "express";


const registerUser = async (req: Request, res: Response) => {
    console.log("show");
    res.status(200).send({"message": "User registered successfully"});
}

export {registerUser};