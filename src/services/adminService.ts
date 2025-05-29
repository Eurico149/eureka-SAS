import {HalfAdminType} from "../models/admin";
import admRepository from "../repository/adminRepository";
import bcrypt from "bcrypt";


const register = async (admin: HalfAdminType) => {
    admin.password = await bcrypt.hash(admin.password, 10);

    const responseAdmin = await admRepository.register(admin);
    const {password, ...rest} = responseAdmin;
    return rest;
}

export default {register};
