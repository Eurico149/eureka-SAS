import {HalfUserType, UserType} from "../models/user";
import userRepository from "../repositories/userRepository";
import bcrypt from "bcrypt";
import {v4} from "uuid";


const register = async (halfUser: HalfUserType) => {
    halfUser.password = await bcrypt.hash(halfUser.password, 10);

    const user: UserType = {
        ...halfUser,
        user_id: v4(),
        created_at: new Date(),
        updated_at: new Date()
    }

    await userRepository.register(user);
    const {password, ...rest} = user;
    return rest;
}

export default {register};