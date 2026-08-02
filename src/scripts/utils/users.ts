//types
import type User from "../interfaces/user"
import type Role from "../interfaces/roles"
import type Sector from "../interfaces/sectors"
import type { LogVariant } from "./logger"
import type About from "../interfaces/about"
import type Contact from "../interfaces/contact"

//scripts
import endpoints from "./endpoints"
import classApiFetch from "./classApiFetch"
import link from "./links"
import logger from "./logger"

export default class Users {
    private readonly token: string
    public url: string
    public endpoints: typeof endpoints
    public logger: (message: string, variant?: LogVariant) => void

    constructor(token: string, backendUrl: string = link) {
        if (!token) {
            console.error("Invalid Session")
            throw new Error("Unauthorized access. Please login")
        }

        this.token = token
        this.url = backendUrl
        this.endpoints = endpoints
        this.logger = logger
    }

    public stringifier(val: any) {
        return JSON.stringify(val)
    }

    public errorLogger(err: any) {
        console.error(err)
        throw new Error(err)
    }

    public apiFetch = async <T = unknown>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> => {
        console.log('Token', this.token)
        return classApiFetch<T>(this.url, this.token, endpoint, options)
    };

    public async getRoles(): Promise<Role[]> {
        return await this.apiFetch<Role[]>(this.endpoints.role.get)
    }

    public async getSectors() {
        return await this.apiFetch<Sector[]>(this.endpoints.sector.get)
    }

    public async getUsers() {
        console.log('Fetching users')
        return await this.apiFetch<User[]>(this.endpoints.user.get)
    }

    public async getAbout() {
        return await this.apiFetch<About[]>(this.endpoints.about.get)
    }

    public async getContact() {
        return await this.apiFetch<Contact[]>(this.endpoints.contact.get)
    }

    public async createUser(user: User) {
        try {
            await this.apiFetch(this.endpoints.user.post,
                {
                    method: "POST",
                    body: this.stringifier(user)
                }
            )
            this.logger('User created successfully')
        } catch (error) {
            this.errorLogger(error)
        }
    }

    public async createSector(sect: Sector) {
        try {
            await this.apiFetch(this.endpoints.sector.post,
                {
                    method: "POST",
                    body: this.stringifier(sect)
                }
            )
            this.logger('Sector created successfully')
        } catch (error) {
            this.errorLogger(error)
        }
    }

    public async createRole(role: Role) {
        try {
            await this.apiFetch(this.endpoints.sector.post,
                {
                    method: "POST",
                    body: this.stringifier(role)
                }
            )
            this.logger('Role created successfully')
        } catch (error) {
            this.errorLogger(error)
        }
    }

    public async approveUserStatus(id: number, status: string) {
        try {
            await this.apiFetch(this.endpoints.user.patch(id),
                {
                    method: "PATCH",
                    body: this.stringifier(status)
                }
            )
            this.logger('Status updated successfully')
        } catch (error) {
            this.errorLogger(error)
        }
    }

    public async updateSectorStatus(id: number, status: string) {

        try {
            await this.apiFetch(this.endpoints.sector.patch(id),
                {
                    method: "PATCH",
                    body: this.stringifier(status)
                }
            )
            this.logger('Status updated successfully')
        } catch (error) {
            this.errorLogger(error)
        }
    }

    public async updateRoleStatus(id: number, status: string) {
        try {
            await this.apiFetch(this.endpoints.role.patch(id),
                {
                    method: "PATCH",
                    body: this.stringifier(status)
                }
            )
            this.logger('Status updated successfully')
        } catch (error) {
            this.errorLogger(error)
        }
    }

    public async updateAbout(id: number, detail: string) {
        try {
            await this.apiFetch(this.endpoints.about.patch(id),
                {
                    method: "PATCH",
                    body: this.stringifier(detail)
                }
            )
            this.logger('About updated successfully')
        } catch (error) {
            this.errorLogger(error)
        }
    }

    public async updateContact(id: number, contact: Contact) {
        try {
            await this.apiFetch(this.endpoints.contact.patch(id),
                {
                    method: "PATCH",
                    body: this.stringifier(contact)
                }
            )
            this.logger('Contact updated successfully')
        } catch (error) {
            this.errorLogger(error)
        }
    }
}