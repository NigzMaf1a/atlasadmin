import { useState, useEffect, useMemo } from "react"

//components
import Page from "../components/Page"
import FancyLoad from "../views/FancyLoad"
import AddUser from "../views/AddUser"
import UserDisplayCard from "../views/UserDisplayCard"
import CustomDiv from "../components/CustomDiv"
import Text from "../components/Text"

//types
import type User from "../scripts/interfaces/user"

//scripts
import Users from "../scripts/utils/users"
import Session from "../scripts/utils/session"

//styles
import Styles from "../styles/sections"

export default function Home() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [admin, setAdmin] = useState<Users>()
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [blankStyles] = useState<string>(Styles.noDataItemDivStyles())

    const [search] = useState<boolean>((): boolean => {
        if (users.length > 6) return true
        return false
    })

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>

        async function init() {

            try {
                setLoading(true)
                const a = new Users(Session.getToken())
                const curr_users = await a.getUsers()
                console.log('Current users:', curr_users)

                setAdmin(a)
                setUsers(curr_users)
                timeout = setTimeout(() => {
                    console.log(users)
                }, 3000)

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

    const active = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()
        if (!query) return users.filter(u => u.acc_status === 'Approved')
        return users.filter(u => u.acc_status === 'Approved').filter((user) =>
            Object.values(user).some((value) =>
                String(value).toLowerCase().includes(query)
            )
        )
    }, [users, searchQuery])

    const pending = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()
        if (!query) return users.filter(u => u.acc_status === 'Pending')
        return users.filter(u => u.acc_status === 'Pending').filter((user) =>
            Object.values(user).some((value) =>
                String(value).toLowerCase().includes(query)
            )
        )
    }, [users, searchQuery])

    const inactive = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()
        if (!query) return users.filter(u => u.acc_status === 'Inactive')
        return users.filter(u => u.acc_status === 'Inactive').filter((user) =>
            Object.values(user).some((value) =>
                String(value).toLowerCase().includes(query)
            )
        )
    }, [users, searchQuery])

    return (
        <Page
            showSearch={search}
            className="flex flex-col justify-center items-center gap-3"
            value={searchQuery}
            setValue={setSearchQuery as (val: string | number) => void}
        >
            <FancyLoad loading={loading} />
            <AddUser method={admin?.createUser as ((val: User) => Promise<void>)} />
            {
                pending.length > 0 ? <CustomDiv>
                    {pending.map(u => <UserDisplayCard user={u} />)}
                </CustomDiv> : <CustomDiv className={blankStyles}>
                    <Text text="No pending users found" color="yellow" />
                </CustomDiv>
            }

            {
                active.length > 0 ? <CustomDiv>
                    {active.map(u => <UserDisplayCard user={u} />)}
                </CustomDiv> : <CustomDiv className={blankStyles}>
                    <Text text="No approved users found" color="red" />
                </CustomDiv>
            }

            {
                inactive.length > 0 ? <CustomDiv>
                    {inactive.map(u => <UserDisplayCard user={u} />)}
                </CustomDiv> : <CustomDiv className={blankStyles}>
                    <Text text="No inactive users found" color="red" />
                </CustomDiv>
            }
        </Page>
    )
}