import {ResultSetHeader, RowDataPacket} from "mysql2";
import maria from "../conns/connectionMaria";
import {AdminType} from "../models/admin";


const register = async (admin: AdminType) => {
    const values = [
        admin.admin_id,
        admin.username,
        admin.password,
        admin.email,
        admin.phone,
        admin.created_at,
        admin.updated_at
    ];

    await maria.query(
        "INSERT INTO admin (admin_id, username, password, email, phone, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
        values);
}


const findById = async (adminId: string) => {
    const [rows] = await maria.query<RowDataPacket[]>(
        "SELECT admin_id, username, email, phone, created_at, updated_at FROM admin WHERE admin_id = ?",
        [adminId]);

    if (rows.length === 0) return null;

    rows[0].password = '';

    return rows[0] as AdminType;
};


const findByUsername = async (username: string) => {
    const [rows] = await maria.query<RowDataPacket[]>(
        "SELECT admin_id, username, email, phone, created_at, updated_at FROM admin WHERE username = ?",
        [username]);

    if (rows.length === 0) return null;

    rows[0].password = '';

    return rows[0] as AdminType;
};


const del = async (adminId: string) => {
    const [result] = await maria.query<ResultSetHeader>(
        "DELETE FROM admin WHERE admin_id = ?",
        [adminId]
    );

    return result.affectedRows === 1;
};


const updatePassword = async (adminId: string, inputPassword: string) => {
    const [result] = await maria.query<ResultSetHeader>(
        "UPDATE admin SET password = ? WHERE admin_id = ?",
        [inputPassword, adminId]
    );

    return result.affectedRows === 1;
}


const updateEmail = async (adminId: string, newEmail: string | null) => {
    const [result] = await maria.query<ResultSetHeader>(
        "UPDATE admin SET email = ? WHERE admin_id = ?",
        [newEmail, adminId]
    );

    return result.affectedRows === 1;
}


const updatePhone = async (adminId: string, newPhone: string | null) => {
    const [result] = await maria.query<ResultSetHeader>(
        "UPDATE admin SET phone = ? WHERE admin_id = ?",
        [newPhone, adminId]
    );

    return result.affectedRows === 1;
}


const updateUsername = async (adminId: string, newUsername: string) => {
    const [result] = await maria.query<ResultSetHeader>(
        "UPDATE admin SET username = ? WHERE admin_id = ?",
        [newUsername, adminId]
    );

    return result.affectedRows === 1;
}


export default {register, del, findById, findByUsername, updateUsername, updateEmail, updatePassword, updatePhone}
