import type Sector from "../interfaces/sectors"

export default class RoleClass {
    static getRoleSector(id: number, sectors: Sector[]): string {
        const sector = sectors.find(s => Number(s.sector_id) === id)
        return sector?.sector_name as string
    }
}