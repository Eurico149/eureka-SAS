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
            password: halfAdmin.password,
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

export default {register}
