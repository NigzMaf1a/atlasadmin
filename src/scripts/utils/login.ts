import apiFetch from "./apiFetch"
import endpoints from "./endpoints"
import type Session from "../interfaces/session"

export default async function login(email: string, password: string): Promise<Session> {
    try {
        return await apiFetch<Session>(endpoints.login, {
            method: "POST",
            body: JSON.stringify({
                Email: email,
                Password: password
            })
        })
    } catch (error) {
        throw new Error('Error while attempting login', error as ErrorOptions)
    }
}