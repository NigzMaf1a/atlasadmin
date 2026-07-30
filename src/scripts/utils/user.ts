import Users from "./users"
import Session from "./session"

export default class UserUtils {
    static async getSectorList(): Promise<[number, string][]> {
        const token = Session.getToken()
        const admin = new Users(token)

        const sectors = await admin.getSectors()

        return sectors.map(s => [s.sector_id, s.sector_name]) as [number, string][]
    }

    static async getRoleList(): Promise<[number, string][]> {
        const token = Session.getToken()
        const admin = new Users(token)

        const roles = await admin.getRoles()

        return roles.map(r => [r.role_id, r.role_title]) as [number, string][]
    }

    static async getSectorName(id: number): Promise<string> {
        const sectors = await this.getSectorList()
        const name = sectors.find(r => r[0] === id) as [number, string]
        return name[1]
    }

    static async getRoleName(id: number): Promise<string> {
        const roles = await this.getRoleList()
        const name = roles.find(r => r[0] === id) as [number, string]
        return name[1]
    }
}