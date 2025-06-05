import maria from "../conns/connectionMaria";
import {HalfUserType, UserType} from "../models/user";
import {v4} from "uuid";
import {ResultSetHeader, RowDataPacket} from "mysql2";


const register = async (halfUser: HalfUserType) => {

    const userUuid = v4();
    const currentDate = new Date();

    const values = [
        userUuid,
        halfUser.admin_id,
        halfUser.username,
        halfUser.nickname,
        halfUser.password,
        halfUser.birthday ? halfUser.birthday.toISOString().slice(0, 10) : null,
        halfUser.email,
        halfUser.phone,
        halfUser.address,
        currentDate,
        currentDate
    ];

    try {
        await maria.query(
            "INSERT INTO user (user_id, admin_id, username, nickname, password, birthday, email, phone, address, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            values);

        const user: UserType = {
            user_id: userUuid,
            admin_id: halfUser.admin_id,
            username: halfUser.username,
            nickname: halfUser.nickname,
            password: '',
            birthday: halfUser.birthday,
            email: halfUser.email,
            phone: halfUser.phone,
            address: halfUser.address,
            created_at: currentDate,
            updated_at: currentDate,
        }

        return user;
    } catch (error) {
        console.log(error);
        throw new Error("Error registering user");
    }
}


const findByUsername = async (username: string, adminId: string) => {
    try {
        const [rows] = await maria.query<RowDataPacket[]>(
            "SELECT user_id, admin_id, username, nickname, birthday, email, phone, address, created_at, updated_at FROM user WHERE username = ? AND admin_id = ?",
            [username, adminId]);

        if (rows.length === 0) return null

        rows[0].password = '';

        return rows[0] as UserType;
    } catch (error) {
        console.log(error);
        throw new Error("Error finding user");
    }
}

const findById = async (userId: string, adminId: string) => {
    try {
        const [rows] = await maria.query<RowDataPacket[]>(
            "SELECT user_id, admin_id, username, nickname, birthday, email, phone, address, created_at, updated_at FROM user WHERE user_id = ? AND admin_id = ?",
            [userId, adminId]);

        if (rows.length === 0) return null

        rows[0].password = '';

        return rows[0] as UserType;
    } catch (error) {
        console.log(error);
        throw new Error("Error finding user");
    }
}

const del = async (userId: string, adminId: string) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "DELETE FROM user WHERE user_id = ? AND admin_id = ?",
            [userId, adminId]
        );

        return result.affectedRows === 1;
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting user");
    }
};


const updatePassword = async (userId: string, adminId: string, inputPassword: string) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "UPDATE user SET password = ? WHERE user_id = ? AND admin_id = ?",
            [inputPassword, userId, adminId]
        );

        return result.affectedRows === 1;
    } catch (error) {
        console.log(error);
        throw new Error("Error updating password");
    }

}


const updateUsername = async (userId: string, adminId: string, newUsername: string) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "UPDATE user SET username = ? WHERE user_id = ? AND admin_id = ?",
            [newUsername, userId, adminId]
        );
        return result.affectedRows === 1;
    } catch (error) {
        console.log(error);
        throw new Error("Error updating username");
    }
};

const updateNickname = async (userId: string, adminId: string, newNickname: string | null) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "UPDATE user SET nickname = ? WHERE user_id = ? AND admin_id = ?",
            [newNickname, userId, adminId]
        );
        return result.affectedRows === 1;
    } catch (error) {
        console.log(error);
        throw new Error("Error updating nickname");
    }
};

const updateBirthday = async (userId: string, adminId: string, newBirthday: Date | null) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "UPDATE user SET birthday = ? WHERE user_id = ? AND admin_id = ?",
            [newBirthday, userId, adminId]
        );
        return result.affectedRows === 1;
    } catch (error) {
        console.log(error);
        throw new Error("Error updating birthday");
    }
};

const updateEmail = async (userId: string, adminId: string, newEmail: string | null) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "UPDATE user SET email = ? WHERE user_id = ? AND admin_id = ?",
            [newEmail, userId, adminId]
        );
        return result.affectedRows === 1;
    } catch (error) {
        console.log(error);
        throw new Error("Error updating email");
    }
};

const updatePhone = async (userId: string, adminId: string, newPhone: string | null) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "UPDATE user SET phone = ? WHERE user_id = ? AND admin_id = ?",
            [newPhone, userId, adminId]
        );
        return result.affectedRows === 1;
    } catch (error) {
        console.log(error);
        throw new Error("Error updating phone");
    }
};

const updateAddress = async (userId: string, adminId: string, newAddress: string | null) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "UPDATE user SET address = ? WHERE user_id = ? AND admin_id = ?",
            [newAddress, userId, adminId]
        );
        return result.affectedRows === 1;
    } catch (error) {
        console.log(error);
        throw new Error("Error updating address");
    }
};


export default {register, del, findById, findByUsername, updatePassword, updateAddress, updateEmail, updatePhone, updateNickname, updateBirthday, updateUsername}
