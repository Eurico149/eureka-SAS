import redis from '../conns/connectionRedis'
import maria from "../conns/connectionMaria";
import {UserTokenType} from "../models/userToken";
import {v4} from 'uuid';
import {ResultSetHeader, RowDataPacket} from "mysql2";


const registerRefresh = async (userToken: UserTokenType): Promise<void> => {
    const values = [
        userToken.token_id,
        userToken.user_id,
        userToken.admin_id,
        userToken.token,
        userToken.created_at,
        userToken.expired_at
    ]

    await maria.query(
        "INSERT INTO user_rf_token (token_id, user_id, admin_id, token, created_at, expired_at) VALUES (?, ?, ?, ?, ?, ?)",
        values);
}


const getRefresh = async (token: string, adminId: string): Promise<UserTokenType | null> => {

    const [rows] = await maria.query<RowDataPacket[]>(
        "SELECT token_id, user_id, admin_id, token, created_at, expired_at FROM user_rf_token WHERE token = ? AND admin_id = ?",
        [token, adminId]);

    if (rows.length === 0) return null;

    return rows[0] as UserTokenType;
}


const delRefresh = async (token: string, adminId: string): Promise<boolean> => {
    const [result] = await maria.query<ResultSetHeader>(
        "DELETE FROM user_rf_token WHERE token = ? AND admin_id = ?",
        [token, adminId]);

    return result.affectedRows === 1;
}


const registerAccess = async (userToken: UserTokenType): Promise<void> => {
    const currDate = new Date();
    const ttlSeconds = Math.floor((userToken.expired_at.getTime() - currDate.getTime()) / 1000);

    const key = keyRedis(userToken.token, userToken.admin_id);
    await redis.set(key, JSON.stringify(userToken), 'EX', ttlSeconds);
}


const getAccess = async (token: string, adminId: string): Promise<UserTokenType | null> => {
    const key = keyRedis(token, adminId);
    const result = await redis.get(key);

    if (!result) return null;

    return JSON.parse(result) as UserTokenType;
}


const delAccess = async (token: string, adminId: string): Promise<boolean> => {
    const key = keyRedis(token, adminId);

    const result = await redis.del(key);

    return result === 1;
}

function keyRedis(token: string, adminId: string): string {
    return `user_access_token:${token}:${adminId}`;
}


export default {registerRefresh, getRefresh, delRefresh, registerAccess, getAccess, delAccess}
