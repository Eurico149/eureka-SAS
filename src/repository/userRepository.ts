import maria from "../conns/connectionMaria";
import {HalfUserType, UserType} from "../models/user";
import {v4} from "uuid";


const register = async (halfUser: HalfUserType) => {

    const userUuid = v4();

    const values = [
        userUuid,
        halfUser.admin_id,
        halfUser.username,
        halfUser.nickname,
        halfUser.password,
        halfUser.birthday ? halfUser.birthday.toISOString().slice(0, 10) : null,
        halfUser.email,
        halfUser.phone,
        halfUser.address
    ];

    try {
        await maria.query(
            "INSERT INTO user (user_id, admin_id, username, nickname, password, birthday, email, phone, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            values);

        const now = new Date();

        const user: UserType = {
            user_id: userUuid,
            admin_id: halfUser.admin_id,
            username: halfUser.username,
            nickname: halfUser.nickname,
            password: halfUser.password,
            birthday: halfUser.birthday,
            email: halfUser.email,
            phone: halfUser.phone,
            address: halfUser.address,
            createdAt: new Date(now),
            updatedAt: new Date(now),
        }

        return user;
    } catch (error) {
        throw new Error("Error registering user");
    }
}

export default {register}
