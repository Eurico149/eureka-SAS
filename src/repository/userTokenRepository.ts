import redis from '../conns/connectionRedis'
import maria from "../conns/connectionMaria";
import {UserTokenType} from "../models/userToken";
import {v4} from 'uuid';
import {RowDataPacket} from "mysql2";


const registerRefresh = async (token: string, userId: string, adminId: string, expired: number): Promise<UserTokenType> => {
    const tokenId = v4();

    const currDate = new Date();
    const expData = new Date(currDate.getTime() + expired * 1000);

    const userToken: UserTokenType = {
        token_id: tokenId,
        user_id: userId,
        admin_id: adminId,
        token: token,
        created_at: currDate,
        expired_at: expData
    };

    try {
        await maria.query("INSERT INTO user_tokens (token_id, user_id, admin_id, token, created_at, expired_at) VALUES (?, ?, ?, ?, ?, ?)",
            [userToken.token_id, userToken.user_id, userToken.admin_id, userToken.token, userToken.created_at, userToken.expired_at]);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to register user token in database");
    }

    return userToken;
}


const getRefresh = async (token: string, adminId: string): Promise<UserTokenType | null> => {
    try {
        const [rows] = await maria.query<RowDataPacket[]>(
            "SELECT token_id, user_id, admin_id, token, created_at, expired_at FROM user_tokens WHERE token = ? AND admin_id = ?",
            [token, adminId]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0] as UserTokenType;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve user token from database");
    }
}
