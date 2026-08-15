import { useState, useEffect } from "react"

//types
import type Role from "../scripts/interfaces/roles"
import type Sector from "../scripts/interfaces/sectors"
import type User from "../scripts/interfaces/user"
import type Contact from "../scripts/interfaces/contact"
import type About from "../scripts/interfaces/about"

//scripts
import Toaster from "../scripts/utils/Toaster"
import Users from "../scripts/utils/users"
import Session from "../scripts/utils/session"

interface AdminInit {
    loading: boolean
    roles: Role[],
    sectors: Sector[],
    users: User[],
    contact: Contact,
    about: About

    //methods
    addRole: (role: Role) => Promise<void>
    addSector: (sector: Sector) => Promise<void>
    addUser: (user: User) => Promise<void>
    updateContact: (id: string, contact: Contact) => Promise<void>
}

export default function useAdmin(): AdminInit {
    const [loading, setLoading] = useState<boolean>(false)
    const [roles, setRoles] = useState<Role[]>([])
    const [sectors, setSectors] = useState<Sector[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [contacts, setContacts] = useState<Contact[]>([])
    const [about, setAbout] = useState<About[]>([])
    const [adm, setAdmin] = useState<Users>()

    useEffect(() => {
        async function init() {
            try {
                setLoading(true)
                const admin = new Users(Session.getToken())
                const r = await admin.getRoles()
                const s = await admin.getSectors()
                const u = await admin.getUsers()
                const c = await admin.getContact()
                const a = await admin.getAbout()

                setRoles(r)
                setSectors(s)
                setUsers(u)
                setAbout(a)
                setContacts(c)
                setAdmin(admin)
                Toaster('Data fetched successfully', 'success')
            } catch (error) {
                Toaster('An error occurred while initializing admin', 'danger')
            } finally {
                setLoading(false)
            }
        }

        init()
        const interval = setInterval(() => init(), 5 * 60 * 1000)

        return () => {
            if (interval) {
                clearInterval(interval)
            }
        }

    }, [])

    return {
        loading: loading,
        roles: roles,
        sectors: sectors,
        contact: contacts[0],
        about: about[0],
        users: users,
        addRole: adm?.createRole as (role: Role) => Promise<void>,
        addSector: adm?.createSector as (sector: Sector) => Promise<void>,
        addUser: adm?.createUser as (user: User) => Promise<void>,
        updateContact: async (id, contact) => {
            if (!adm) {
                throw new Error("Admin is not initialized")
            }

            await adm.updateContact(id, contact)
        }
    }
}