import {Request, Response} from "express";
import tokenService from "../services/tokenService";
import userService from "../services/userService";


const refresh = async (req: Request, res: Response): Promise<any> => {
    try {
        const refreshToken = await tokenService.getRefreshToken(req.body.refresh_token, res.locals.admin_id);

        if (!refreshToken) return res.status(401).json({message: "Invalid refresh token"});

        const accessToken = await tokenService.registerAcessToken(refreshToken);

        return res.status(201).json({acess_token: accessToken.token});
    } catch (error) {
        // temporary workaround for error handling
        console.error("Error refreshing token: ", error);
        return res.status(500).json({message: "Failed to refresh token"});
    }
}


const getUserByToken = async (req: Request, res: Response): Promise<any> => {
    const token = req.body.acess_token;

    try {
        const acess_token = await tokenService.getAcessToken(token, res.locals.admin_id);

        if (!acess_token) return res.status(401).json({message: "Invalid access token"});

        const user = await userService.getById(acess_token.user_id, res.locals.admin_id);

        return res.status(200).json(user);
    } catch (error) {
        // temporary workaround for error handling
        console.error("Error getting user by token: ", error);
        return res.status(500).json({message: "Failed to get user by token"});
    }
}


export default {refresh, getUserByToken};
