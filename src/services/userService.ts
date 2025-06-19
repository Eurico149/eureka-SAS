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


const registerList = async (users: HalfUserType[]) => {
    const usersList = await Promise.all(users.map(async (halfUser) => {
        halfUser.password = await bcrypt.hash(halfUser.password, 10);
        return {
            ...halfUser,
            user_id: v4(),
            created_at: new Date(),
            updated_at: new Date()
        } as UserType;
    }));

    await userRepository.registerList(usersList);
    return usersList.map(user => {
        const {password, ...rest} = user;
        return rest;
    });
}


const getAll = async (adminId: string) => {
    const users = await userRepository.getAll(adminId);
    return users.map(user => {
        const {password, ...rest} = user;
        return rest;
    });
}


const getById = async (userId: string, adminId: string) => {
    const userCahce = await userRepository.findByIdCache(userId, adminId);
    if (userCahce) {
        const {password, ...rest} = userCahce;
        return rest;
    }

    const user = await userRepository.findById(userId, adminId);
    if (!user) return null;

    await userRepository.registerCache(user);

    const {password, ...rest} = user;
    return rest;
}


const getByUsername = async (username: string, adminId: string): Promise<any> => {
    const user = await userRepository.findByUsername(username, adminId);
    if (!user) return null;

    const {password, ...rest} = user;
    return rest;
}


const getByLogin = async (username: string, pass: string, adminId: string): Promise<any> => {
    const user = await userRepository.findByUsernamePassword(username, adminId);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) return null;

    const {password, ...rest} = user;
    return rest;
}


const del = async (userId: string, adminId: string) => {
    return await userRepository.del(userId, adminId);
}


export default {register, registerList, getAll, getById, getByUsername, getByLogin, del};
