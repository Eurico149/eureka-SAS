import {ResultSetHeader, RowDataPacket} from "mysql2";
import maria from "../conns/connectionMaria";
import {v4} from "uuid";
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
        console.log(error);
        throw new Error("Error registering admin");
    }
}


const findById = async (adminId: string) => {
    let rows;
    try {
        [rows] = await maria.query<RowDataPacket[]>(
            "SELECT admin_id, username, email, phone, createdAt, updatedAt FROM admin WHERE admin_id = ?",
            [adminId]
        );
    } catch (error) {
        console.log(error);
        throw new Error("Error finding admin");
    }

    if (rows.length === 0) return null;
    if (rows.length > 1) throw new Error("Error, multiple admins with id: " + adminId);

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

};


const findByUsername = async (username: string) => {
    let rows;
    try {
         [rows] = await maria.query<RowDataPacket[]>(
            "SELECT admin_id, username, email, phone, createdAt, updatedAt FROM admin WHERE username = ?",
            [username]
        );
    } catch (error) {
        console.log(error);
        throw new Error("Error finding admin");
    }

    if (rows.length === 0) return null;
    if (rows.length > 1) throw new Error("Error, multiple admins with username: " + username);

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
};


const del = async (adminId: string) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "DELETE FROM admin WHERE admin_id = ?",
            [adminId]
        );

        return result.affectedRows === 1;
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting admin");
    }
};


const updatePassword = async (adminId: string, inputPassword: string) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "UPDATE admin SET password = ? WHERE admin_id = ?",
            [inputPassword, adminId]
        );

        return result.affectedRows === 1;
    } catch (error) {
        console.log(error);
        throw new Error("Error updating password");
    }
}


const updateEmail = async (adminId: string, newEmail: string | null) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "UPDATE admin SET email = ? WHERE admin_id = ?",
            [newEmail, adminId]
        );

        return result.affectedRows === 1;
    } catch (error) {
        console.log(error);
        throw new Error("Error updating email");
    }
}


const updatePhone = async (adminId: string, newPhone: string | null) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "UPDATE admin SET phone = ? WHERE admin_id = ?",
            [newPhone, adminId]
        );

        return result.affectedRows === 1;
    } catch (error) {
        console.log(error);
        throw new Error("Error updating phone");
    }
}


const updateUsername = async (adminId: string, newUsername: string) => {
    try {
        const [result] = await maria.query<ResultSetHeader>(
            "UPDATE admin SET username = ? WHERE admin_id = ?",
            [newUsername, adminId]
        );

        return result.affectedRows === 1;
    } catch (error) {
        console.log(error);
        throw new Error("Error updating username");
    }
}


export default {register, del, findById, findByUsername, updateUsername, updateEmail, updatePassword, updatePhone}
