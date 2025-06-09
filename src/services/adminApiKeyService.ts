import apiKeyRepository from '../repositories/adminApiKeyRepository';
import {randomBytes} from "crypto";
import {AdminApiKeyType} from "../models/adminApiKey";


const register = async (adminId: string): Promise<AdminApiKeyType> => {
    const apiKey = randomBytes(32).toString('hex');

    const adminApiKey: AdminApiKeyType = {
        api_key: apiKey,
        admin_id: adminId,
        valid: true,
        created_at: new Date()
    }

    await apiKeyRepository.register(adminApiKey);
    await apiKeyRepository.registerCache(adminApiKey);

    return adminApiKey;
}


export default {register};
