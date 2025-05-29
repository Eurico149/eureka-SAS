import {ResultSetHeader, RowDataPacket} from "mysql2";
import maria from "../conns/connectionMaria";
import {v4} from "uuid";
import bcrypt from "bcrypt";
import {HalfAdminType, AdminType} from "../models/admin";


const register = async (halfAdmin: HalfAdminType) => {
    const adminUuid = v4();

    const values = [
        adminUuid,
        halfAdmin.username,
        halfAdmin.password,
        halfAdmin.email,
        halfAdmin.phone
    ];

    try {
        await maria.query(
            "INSERT INTO admin (admin_id, username, password, email, phone) VALUES (?, ?, ?, ?, ?)",
            values);

        const now = new Date();

        const admin: AdminType = {
            admin_id: adminUuid,
            username: halfAdmin.username,
            password: '',
            email: halfAdmin.email,
            phone: halfAdmin.phone,
            createdAt: new Date(now),
            updatedAt: new Date(now),
        }

        return admin;
    } catch (error) {
        throw new Error("Error registering admin");
    }
}


const findById = async (adminId: string) => {
    try {
        const [rows] = await maria.query<RowDataPacket[]>(
            "SELECT admin_id, username, email, phone, createdAt, updatedAt FROM admin WHERE admin_id = ?",
            [adminId]
        );

        if (rows.length !== 1) {
            return null;
        }

        const row = rows[0];

        const admin: AdminType = {
            admin_id: row.admin_id,
            username: row.username,
            password: '',
            email: row.email,
            phone: row.phone,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
        }

        return admin;
    } catch (error) {
        throw new Error("Error finding admin");
    }
};


const findByUsername = async (username: string) => {
    try {
        const [rows] = await maria.query<RowDataPacket[]>(
            "SELECT admin_id, username, email, phone, createdAt, updatedAt FROM admin WHERE username = ?",
            [username]
        );

        if (rows.length !== 1) {
            return null;
        }

        const row = rows[0];

        const admin: AdminType = {
            admin_id: row.admin_id,
            username: row.username,
            password: '',
            email: row.email,
            phone: row.phone,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
        }

        return admin;
    } catch (error) {
        throw new Error("Error finding admin");
    }
};


const del = async (adminId: string) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "DELETE FROM admin WHERE admin_id = ?",
            [adminId]
        );

        return result.affectedRows === 1;
    } catch (error) {
        throw new Error("Error deleting admin");
    }
};


const changePassword = async (adminId: string, newPassword: string, oldPassword: string) => {
    try {
        const [rows] = await maria.query<RowDataPacket[]>(
            "SELECT password FROM admin WHERE admin_id = ?",
            [adminId]
        );

        const aux = bcrypt.compareSync(oldPassword, rows[0].password);

        if (!aux){
            return false;
        }

        const [result] = await maria.query<ResultSetHeader>(
            "UPDATE admin SET password = ? WHERE admin_id = ?",
            [newPassword, adminId]
        );

        return result.affectedRows === 1;
    } catch (error) {
        throw new Error("Error updating password");
    }
}


const changeEmail = async (adminId: string, newEmail: string) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "UPDATE admin SET email = ? WHERE admin_id = ?",
            [newEmail, adminId]
        );

        return result.affectedRows === 1;
    } catch (error) {
        throw new Error("Error updating email");
    }
}


const changePhone = async (adminId: string, newPhone: string) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "UPDATE admin SET phone = ? WHERE admin_id = ?",
            [newPhone, adminId]
        );

        return result.affectedRows === 1;
    } catch (error) {
        throw new Error("Error updating phone");
    }
}


const changeUsername = async (adminId: string, newUsername: string) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "UPDATE admin SET username = ? WHERE admin_id = ?",
            [newUsername, adminId]
        );

        return result.affectedRows === 1;
    } catch (error) {
        throw new Error("Error updating username");
    }
}


export default {register, findById, findByUsername, changeUsername, changeEmail, changePassword, changePhone}
