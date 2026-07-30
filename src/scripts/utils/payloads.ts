//interfaces
import type User from "../interfaces/user";
import type Sector from "../interfaces/sectors";
import type Role from "../interfaces/roles";

export default class Payloads {

    static createUser(
        sector_id: number,
        role_id: number,
        user_name: string,
        email: string,
        reg_type: string,
        location: string,
        password: string
    ): User {
        return {
            sector_id: sector_id,
            role_id: role_id,
            user_name: user_name,
            email: email,
            password: password,
            acc_status: 'Pending',
            reg_type: reg_type,
            location: location
        }
    }

    static createRole(
        sect_id: number,
        title: string
    ): Role {
        return {
            sector_id: sect_id,
            role_title: title,
            role_status: 'Pending'
        }
    }

    static createSector(
        name: string,
        desc: string
    ): Sector {
        return {
            sector_name: name,
            sector_status: 'Pending',
            sector_description: desc
        }
    }
}