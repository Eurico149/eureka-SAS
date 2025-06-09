import redis from '../conns/connectionRedis'
import maria from "../conns/connectionMaria";
import {AdminApiKeyType} from "../models/adminApiKey";
import {ResultSetHeader, RowDataPacket} from "mysql2";


const register = async (adminToken: AdminApiKeyType): Promise<void> => {
    await maria.query(
        "INSERT INTO admin_api_key (api_key, admin_id, valid, created_at) VALUES (?, ?, ?, ?)",
        [adminToken.api_key, adminToken.admin_id, adminToken.valid, adminToken.created_at]);
}


const registerCache = async (adminToken: AdminApiKeyType): Promise<void> => {
    const key = apiKeyRedis(adminToken.api_key);
    await redis.set(key, JSON.stringify(adminToken));
}


const get = async (api_key: string): Promise<AdminApiKeyType | null> => {
    const [data] = await maria.query<RowDataPacket[]>(
        "SELECT api_key, admin_id, valid, created_at FROM admin_api_key WHERE api_key = ?",
        [api_key]);

    if (data.length === 1) return data[0] as AdminApiKeyType;

    return null;
}


const getCache = async (api_key: string): Promise<AdminApiKeyType | null> => {
    const key = apiKeyRedis(api_key);
    const data = await redis.get(key);

    if (data) return JSON.parse(data) as AdminApiKeyType;

    return null;
}


const del = async (api_key: string): Promise<boolean> => {
    const [result] = await maria.query<ResultSetHeader>(
        "DELETE FROM admin_api_key WHERE api_key = ?",
        [api_key]);

    return result.affectedRows === 1;
}


const delCache = async (api_key: string): Promise<boolean> => {
    const key = apiKeyRedis(api_key);

    return await redis.del(key) === 1;
}


function apiKeyRedis(api_key: string): string {
    return `admin_api_key:${api_key}`;
}


export default {register, registerCache, get, getCache, del, delCache}
