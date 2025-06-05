import redis from '../conns/connectionRedis'
import {AdminTokenType} from "../models/adminToken";


const register = async (token: string, adminId: string, expired: number): Promise<AdminTokenType> => {
    const currDate = new Date();
    const expData = new Date(currDate.getTime() + expired * 1000);

    const adminToken: AdminTokenType = {
        admin_id: adminId,
        token: token,
        createdAt: currDate,
        expired_at: expData
    };

    const key = `admin_token:${token}`;

    try {
        await redis.set(key, JSON.stringify(adminToken), 'EX', expired);
    } catch (error) {
        console.error(error);
        throw new Error("Error registering admin token");
    }

    return adminToken;
}


const get = async (token: string): Promise<AdminTokenType | null> => {
    const key = `admin_token:${token}`;

    try {
        const data = await redis.get(key);
        if (data) {
            return JSON.parse(data) as AdminTokenType;
        }
        return null;
    } catch (error) {
        console.error(error);
        throw new Error("Error retrieving admin token");
    }
}

const del = async (token: string): Promise<void> => {
    const key = `admin_token:${token}`;

    try {
        await redis.del(key);
    } catch (error) {
        console.error(error);
        throw new Error("Error deleting admin token");
    }
}


export default {register, get, del}
