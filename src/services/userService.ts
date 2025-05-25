import {HalfUserType} from "../models/user";
import {registerUser} from "../repository/userRepository";
import bcrypt from "bcrypt";


export const register = async (user: HalfUserType) => {
    user.password = await bcrypt.hash(user.password, 10);

    const responseUser = await registerUser(user);
    const {password, ...rest} = responseUser;
    return rest;
}