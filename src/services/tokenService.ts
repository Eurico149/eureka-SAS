import {randomBytes} from 'crypto'
import {UserTokenType} from "../models/userToken";
import {v4} from "uuid";
import userTokenRepository from "../repositories/userTokenRepository";
import bcrypt from "bcrypt";
import {UserType} from "../models/user";


const registerRefreshToken = async (userId: string, adminId: string): Promise<UserTokenType> => {
    const token = randomBytes(32).toString('hex');

    const userToken: UserTokenType = {
        token_id: v4(),
        user_id: userId,
        admin_id: adminId,
        token: token,
        created_at: new Date(),
        expired_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }

    await userTokenRepository.registerRefresh(userToken);

    return userToken;
}


const registerRefreshTokenList = async (amdinId: string, usersIds: string[]): Promise<UserTokenType[]> => {
    const usersList = usersIds.map((userId) => {
        const token = randomBytes(32).toString('hex');
        return {
            token_id: v4(),
            user_id: userId,
            admin_id: amdinId,
            token: token,
            created_at: new Date(),
            expired_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        } as UserTokenType;
    });

    await userTokenRepository.registerRefreshList(usersList);

    return usersList
}


export default {registerRefreshToken, registerRefreshTokenList};
