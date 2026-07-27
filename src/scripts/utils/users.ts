//interfaces
import type User from "../interfaces/user";
import type Role from "../interfaces/roles";
import type Sector from "../interfaces/sectors";

//scripts
import endpoints from "./endpoints";
import classApiFetch from "./classApiFetch";
import link from "./links";

export default class Users {
    private readonly token: string;
    public url: string;
    public endpoints: typeof endpoints;

    constructor(token: string, backendUrl: string = link) {
        if (!token) {
            console.error("Invalid Session");
            throw new Error("Unauthorized access. Please login");
        }

        this.token = token;
        this.url = backendUrl;
        this.endpoints = endpoints;
    }

    public apiFetch = async <T = unknown>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> => {
        return classApiFetch<T>(this.url, this.token, endpoint, options);
    };

    public async getRoles(): Promise<Role[]> {
        return await this.apiFetch<Role[]>(this.endpoints.role.get)
    }

    public async getSectors() {
        return await this.apiFetch<Sector[]>(this.endpoints.sector.get)
    }

    public async getUsers() {
        return await this.apiFetch<User[]>(this.endpoints.user.get)
    }
}