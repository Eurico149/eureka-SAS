import redis from '../conns/connectionRedis'
import maria from "../conns/connectionMaria";
import {UserTokenType} from "../models/userToken";
import {v4} from 'uuid';
import {ResultSetHeader, RowDataPacket} from "mysql2";


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
        await maria.query("INSERT INTO user_rf_token (token_id, user_id, admin_id, token, created_at, expired_at) VALUES (?, ?, ?, ?, ?, ?)",
            [userToken.token_id, userToken.user_id, userToken.admin_id, userToken.token, userToken.created_at, userToken.expired_at]);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to register user refresh token in database");
    }

    return userToken;
}


const getRefresh = async (token: string, adminId: string): Promise<UserTokenType | null> => {
    try {
        const [rows] = await maria.query<RowDataPacket[]>(
            "SELECT token_id, user_id, admin_id, token, created_at, expired_at FROM user_rf_token WHERE token = ? AND admin_id = ?",
            [token, adminId]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0] as UserTokenType;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve user refresh token from database");
    }
}


const delRefresh = async (token: string, adminId: string): Promise<boolean> => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "DELETE FROM user_rf_token WHERE token = ? AND admin_id = ?",
            [token, adminId]);
        return result.affectedRows === 1;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete user refresh token from database");
    }
}


const registerAccess = async (token: string, userId: string, adminId: string, expired: number): Promise<UserTokenType> => {
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
        const key = `user_access_token:${token}:${adminId}`;
        await redis.set(key, JSON.stringify(userToken), 'EX', expired);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to register user access token in database");
    }

    return userToken;
}


const getAccess = async (token: string, adminId: string): Promise<UserTokenType | null> => {
    try {
        const key = `user_access_token:${token}:${adminId}`;
        const result = await redis.get(key);
        if (!result) {
            return null;
        }
        return JSON.parse(result) as UserTokenType;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve user access token from database");
    }
}


const delAccess = async (token: string, adminId: string): Promise<boolean> => {
    try {
        const key = `user_access_token:${token}:${adminId}`;
        const result = await redis.del(key);
        return result === 1;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete user access token from database");
    }
}


export default {registerRefresh, getRefresh, delRefresh, registerAccess, getAccess, delAccess}
