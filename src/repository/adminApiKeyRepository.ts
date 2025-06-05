import redis from '../conns/connectionRedis'
import maria from "../conns/connectionMaria";
import {AdminTokenType} from "../models/adminToken";
import {ResultSetHeader, RowDataPacket} from "mysql2";


const register = async (adminToken: AdminTokenType): Promise<void> => {

    try {
        await maria.query("INSERT INTO admin_api_key (api_key, admin_id, valid, created_at) VALUES (?, ?, ?, ?)",
            [adminToken.admin_id, adminToken.api_key, adminToken.valid, adminToken.created_at]);
    }catch (error) {
        console.error("Error saving admin token:", error);
        throw new Error("Error saving admin token");
    }

    try {
        const key = `admin_api_key:${adminToken.api_key}`;
        await redis.set(key, JSON.stringify(adminToken));
    } catch (error) {
        console.error(error);
    }
}


const get = async (api_key: string): Promise<AdminTokenType | null> => {

    const key = `admin_api_key:${api_key}`;

    try {
        const data = await redis.get(key);
        if (data) {
            return JSON.parse(data) as AdminTokenType;
        }
    } catch (error) {
        console.error(error);
    }

    try{
        const [data] = await maria.query<RowDataPacket[]>(
            "SELECT api_key, admin_id, valid, created_at FROM admin_api_key WHERE api_key = ?",
            [api_key]);

        if (data.length === 1){
            await redis.set(key, JSON.stringify(data[0]));
            return data[0] as AdminTokenType;
        }

    } catch (error) {
        console.error(error);
        throw new Error("Error retrieving admin token");
    }

    return null;

}

const del = async (api_key: string): Promise<boolean> => {

    try {
        const key = `admin_api_key:${api_key}`;
        await redis.del(key);
    } catch (error) {
        console.error(error);
    }

    try {
        const [result] = await maria.query<ResultSetHeader>(
            "DELETE FROM admin_api_key WHERE api_key = ?",
            [api_key]);

        return result.affectedRows === 1;
    } catch (error) {
        console.error("Error deleting admin token:", error);
        throw new Error("Error deleting admin token");
    }
}


export default {register, get, del}
