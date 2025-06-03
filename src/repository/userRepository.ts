import maria from "../conns/connectionMaria";
import {HalfUserType, UserType} from "../models/user";
import {v4} from "uuid";
import {ResultSetHeader, RowDataPacket} from "mysql2";


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


const findByUsername = async (username: string) => {
    let rows;
    try {
        [rows] = await maria.query<RowDataPacket[]>(
            "SELECT * FROM user WHERE username = ?",
            username);
    } catch (error) {
        throw new Error("Error finding user");
    }

    if (rows.length === 0) return null
    if (rows.length > 1) throw new Error("Error, multiple users with username: " + username);

    const row = rows[0];

    const user: UserType = {
        user_id: row.user_id,
        admin_id: row.admin_id,
        username: row.username,
        nickname: row.nickname,
        password: '',
        birthday: row.birthday,
        email: row.email,
        phone: row.phone,
        address: row.address,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    }

    return user;
}

const findById = async (userId: string) => {
    let rows;
    try {
        [rows] = await maria.query<RowDataPacket[]>(
            "SELECT * FROM user WHERE user_id = ?",
            userId);
    } catch (error) {
        throw new Error("Error finding user");
    }

    if (rows.length === 0) return null
    if (rows.length > 1) throw new Error("Error, multiple users with Id: " + userId);

    const row = rows[0];

    const user: UserType = {
        user_id: row.user_id,
        admin_id: row.admin_id,
        username: row.username,
        nickname: row.nickname,
        password: '',
        birthday: row.birthday,
        email: row.email,
        phone: row.phone,
        address: row.address,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    }

    return user;
}

const del = async (userId: string) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "DELETE FROM user WHERE user_id = ?",
            [userId]
        );

        return result.affectedRows === 1;
    } catch (error) {
        throw new Error("Error deleting user");
    }
};


const updatePassword = async (userId: string, inputPassword: string) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "UPDATE user SET password = ? WHERE user_id = ?",
            [inputPassword, userId]
        );

        return result.affectedRows === 1;
    } catch (error) {
        throw new Error("Error updating password");
    }

}


const updateUsername = async (userId: string, newUsername: string) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "UPDATE user SET username = ? WHERE user_id = ?",
            [newUsername, userId]
        );
        return result.affectedRows === 1;
    } catch (error) {
        throw new Error("Error updating username");
    }
};

const updateNickname = async (userId: string, newNickname: string | null) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "UPDATE user SET nickname = ? WHERE user_id = ?",
            [newNickname, userId]
        );
        return result.affectedRows === 1;
    } catch (error) {
        throw new Error("Error updating nickname");
    }
};

const updateBirthday = async (userId: string, newBirthday: Date | null) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "UPDATE user SET birthday = ? WHERE user_id = ?",
            [newBirthday, userId]
        );
        return result.affectedRows === 1;
    } catch (error) {
        throw new Error("Error updating birthday");
    }
};

const updateEmail = async (userId: string, newEmail: string | null) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "UPDATE user SET email = ? WHERE user_id = ?",
            [newEmail, userId]
        );
        return result.affectedRows === 1;
    } catch (error) {
        throw new Error("Error updating email");
    }
};

const updatePhone = async (userId: string, newPhone: string | null) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "UPDATE user SET phone = ? WHERE user_id = ?",
            [newPhone, userId]
        );
        return result.affectedRows === 1;
    } catch (error) {
        throw new Error("Error updating phone");
    }
};

const updateAddress = async (userId: string, newAddress: string | null) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "UPDATE user SET address = ? WHERE user_id = ?",
            [newAddress, userId]
        );
        return result.affectedRows === 1;
    } catch (error) {
        throw new Error("Error updating address");
    }
};


export default {register, del, findById, findByUsername, updatePassword, updateAddress, updateEmail, updatePhone, updateNickname, updateBirthday}
