//types
import type Role from "../interfaces/roles";

export default function getRegtype(roles: Role[], id: number): string {
    return roles.find(r => Number(r.role_id) === id)?.role_title as string
}
