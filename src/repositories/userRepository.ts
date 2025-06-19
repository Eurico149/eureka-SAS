import maria from "../conns/connectionMaria";
import {UserType} from "../models/user";
import {ResultSetHeader, RowDataPacket} from "mysql2";
import redis from "../conns/connectionRedis";


const register = async (user: UserType) => {
    const values = [
        user.user_id,
        user.admin_id,
        user.username,
        user.nickname,
        user.password,
        user.birthday,
        user.email,
        user.phone,
        user.address,
        user.created_at,
        user.updated_at
    ];

    await maria.query(
        "INSERT INTO user (user_id, admin_id, username, nickname, password, birthday, email, phone, address, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        values);
}


const registerCache = async (user: UserType) => {
    const key = keyRedis(user.user_id, user.admin_id);
    await redis.set(key, JSON.stringify(user), 'EX', 60 * 60 * 24)
}


const registerList = async (users: UserType[]) => {
    const placeholders = users.map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').join(', ');

    const valores = users.flatMap(user => [
        user.user_id,
        user.admin_id,
        user.username,
        user.nickname,
        user.password,
        user.birthday,
        user.email,
        user.phone,
        user.address,
        user.created_at,
        user.updated_at
    ]);

    const query =
        `INSERT INTO user (user_id, admin_id, username, nickname, password, birthday, email, phone, address, created_at, updated_at) VALUES ${placeholders}`;

    await maria.query(query, valores);
}


const getAll = async (adminId: string) => {
    const [rows] = await maria.query<RowDataPacket[]>(
        "SELECT user_id, admin_id, username, nickname, birthday, email, phone, address, created_at, updated_at FROM user WHERE admin_id = ?",
        [adminId]);

    rows.forEach(row => {
        row.password = '';
    });

    return rows as UserType[];
}


const findByUsername = async (username: string, adminId: string) => {
    const [rows] = await maria.query<RowDataPacket[]>(
        "SELECT user_id, admin_id, username, nickname, birthday, email, phone, address, created_at, updated_at FROM user WHERE username = ? AND admin_id = ?",
        [username, adminId]);

    if (rows.length === 0) return null

    rows[0].password = '';

    return rows[0] as UserType;
}


const findById = async (userId: string, adminId: string) => {
    const [rows] = await maria.query<RowDataPacket[]>(
        "SELECT user_id, admin_id, username, nickname, birthday, email, phone, address, created_at, updated_at FROM user WHERE user_id = ? AND admin_id = ?",
        [userId, adminId]);

    if (rows.length === 0) return null

    rows[0].password = '';

    return rows[0] as UserType;
}


const findByIdCache = async (userId: string, adminId: string): Promise<UserType | null> => {
    const key = keyRedis(userId, adminId)
    const user = await redis.get(key);

    if (user) return JSON.parse(user) as UserType;
    return null
}


const findByUsernamePassword = async (username: string, adminId: string): Promise<UserType | null> => {
    const [rows] = await maria.query<RowDataPacket[]>(
        "SELECT user_id, admin_id, username, password, nickname, birthday, email, phone, address, created_at, updated_at FROM user WHERE username = ? AND admin_id = ?",
        [username, adminId]);

    if (rows.length === 0) return null

    return rows[0] as UserType;
}


const del = async (userId: string, adminId: string) => {
    const [result] = await maria.query<ResultSetHeader>(
        "DELETE FROM user WHERE user_id = ? AND admin_id = ?",
        [userId, adminId]
    );

    return result.affectedRows === 1;
};


const updatePassword = async (userId: string, adminId: string, inputPassword: string) => {
    const [result] = await maria.query<ResultSetHeader>(
        "UPDATE user SET password = ? WHERE user_id = ? AND admin_id = ?",
        [inputPassword, userId, adminId]
    );

    return result.affectedRows === 1;
}


const updateUsername = async (userId: string, adminId: string, newUsername: string) => {
    const [result] = await maria.query<ResultSetHeader>(
        "UPDATE user SET username = ? WHERE user_id = ? AND admin_id = ?",
        [newUsername, userId, adminId]
    );
    return result.affectedRows === 1;
};

const updateNickname = async (userId: string, adminId: string, newNickname: string | null) => {
    const [result] = await maria.query<ResultSetHeader>(
        "UPDATE user SET nickname = ? WHERE user_id = ? AND admin_id = ?",
        [newNickname, userId, adminId]
    );
    return result.affectedRows === 1;
};

const updateBirthday = async (userId: string, adminId: string, newBirthday: Date | null) => {
    const [result] = await maria.query<ResultSetHeader>(
        "UPDATE user SET birthday = ? WHERE user_id = ? AND admin_id = ?",
        [newBirthday, userId, adminId]
    );
    return result.affectedRows === 1;
};

const updateEmail = async (userId: string, adminId: string, newEmail: string | null) => {
    const [result] = await maria.query<ResultSetHeader>(
        "UPDATE user SET email = ? WHERE user_id = ? AND admin_id = ?",
        [newEmail, userId, adminId]
    );
    return result.affectedRows === 1;
};

const updatePhone = async (userId: string, adminId: string, newPhone: string | null) => {
    const [result] = await maria.query<ResultSetHeader>(
        "UPDATE user SET phone = ? WHERE user_id = ? AND admin_id = ?",
        [newPhone, userId, adminId]
    );
    return result.affectedRows === 1;
};

const updateAddress = async (userId: string, adminId: string, newAddress: string | null) => {
    const [result] = await maria.query<ResultSetHeader>(
        "UPDATE user SET address = ? WHERE user_id = ? AND admin_id = ?",
        [newAddress, userId, adminId]
    );
    return result.affectedRows === 1;
};


const keyRedis = (userId: string, adminId: string) => {
    return `user:${userId}:${adminId}`;
}


export default {register, registerCache, registerList, del, getAll, findById, findByIdCache, findByUsername, findByUsernamePassword, updatePassword, updateAddress, updateEmail, updatePhone, updateNickname, updateBirthday, updateUsername}
