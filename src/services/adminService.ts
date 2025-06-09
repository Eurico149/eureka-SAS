import {HalfAdminType, AdminType} from "../models/admin";
import admRepository from "../repositories/adminRepository";
import bcrypt from "bcrypt";
import {v4} from 'uuid'


const register = async (halfAdmin: HalfAdminType) => {
    halfAdmin.password = await bcrypt.hash(halfAdmin.password, 10);

    const admin: AdminType = {
        ...halfAdmin,
        admin_id: v4(),
        created_at: new Date(),
        updated_at: new Date()
    }

    await admRepository.register(admin);

    const {password, ...rest} = admin;
    return rest;
}


export default {register};
