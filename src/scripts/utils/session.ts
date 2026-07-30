import type User from "../interfaces/user"

export default class Session {

    static storeToken(token: string) {
        localStorage.setItem('token', JSON.stringify(token))
    }

    static storeUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user))
    }

    static getUser(): User {
        const userString = localStorage.getItem('user')
        const user = JSON.parse(userString as string)
        if (typeof user === 'undefined' || user === null) throw new Error('User is undefined')
        return user as User
    }

    static getToken(): string {
        const tokenString = localStorage.getItem('user')
        const token = JSON.parse(tokenString as string)
        if (typeof token === 'undefined' || token === null) throw new Error('User is undefined')
        return token as string
    }

    static sessionStatus(): boolean {
        if (!this.getUser() || !this.getToken) return false
        return true
    }

    static sessionClear() {
        localStorage.clear()
    }
}