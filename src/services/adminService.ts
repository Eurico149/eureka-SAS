import {HalfAdminType} from "../models/admin";
import {registerAdmin} from "../repository/adminRepository";
import bcrypt from "bcrypt";


export const register = async (admin: HalfAdminType) => {
    admin.password = await bcrypt.hash(admin.password, 10);

    const responseAdmin = await registerAdmin(admin);
    const {password, ...rest} = responseAdmin;
    return rest;
}
