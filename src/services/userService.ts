import {HalfUserType} from "../models/user";
import userRepository from "../repository/userRepository";
import bcrypt from "bcrypt";


const register = async (user: HalfUserType) => {
    user.password = await bcrypt.hash(user.password, 10);

    const responseUser = await userRepository.register(user);
    const {password, ...rest} = responseUser;
    return rest;
}

export default {register};