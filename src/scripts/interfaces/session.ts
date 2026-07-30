import type User from "./user"

export default interface Session {
    token: string
    user: User
}