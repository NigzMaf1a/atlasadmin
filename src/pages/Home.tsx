import { useState, useEffect, useMemo } from "react"

//components
import Page from "../components/Page"
import FancyLoad from "../views/FancyLoad"
import AddUser from "../views/AddUser"

//types
import type User from "../scripts/interfaces/user"

//scripts
import Users from "../scripts/utils/users"

export default function Home() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>
        async function init() {

            try {
                setLoading(true)
                const admin = new Users('')
                const curr_users = await admin.getUsers()

                setUsers(curr_users)
                timeout = setTimeout(() => { }, 3000)

            } catch (error) {
                setUsers([])
                throw new Error("An error occurred while initializing home")
            } finally {
                setTimeout(() => setLoading(false), 5000)
            }
        }

        init()

        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
        }
    }, [])

    return (
        <Page
            showSearch
            className="justify-center items-center"
        >
            <FancyLoad loading={loading} />
            <AddUser />
        </Page>
    )
}