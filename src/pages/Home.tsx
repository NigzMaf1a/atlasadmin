//hooks
import { useState, useEffect, useMemo } from "react"
import useAdmin from "../hooks/useAdmin"

//components
import Page from "../components/Page"
import FancyLoad from "../views/FancyLoad"
import AddUser from "../views/AddUser"
import UserDisplayCard from "../views/UserDisplayCard"
import Text from "../components/Text"
import Tray from "../components/Tray"

//types
import type User from "../scripts/interfaces/user"

export default function Home() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [showPending, setShowPending] = useState<boolean>(false)
    const [showInactive, setShowInactive] = useState<boolean>(false)
    const [showActive, setShowActive] = useState<boolean>(false)

    const admin = useAdmin()

    const [search] = useState<boolean>((): boolean => {
        if (users.length > 6) return true
        return false
    })

    useEffect(() => {

        async function init() {

            try {
                setLoading(true)
                setUsers(admin.users)

                setShowPending(pending.length <= 0)
                setShowInactive(inactive.length <= 0)
                setShowActive(active.length <= 0)

            } catch (error) {
                setUsers([])
                throw new Error("An error occurred while initializing home")
            } finally {
                setTimeout(() => setLoading(false), 5000)
            }
        }

        init()
    }, [])

    const active = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()
        if (!query) return admin.users.filter(u => u.acc_status === 'Approved')
        return admin.users.filter(u => u.acc_status === 'Approved').filter((user) =>
            Object.values(user).some((value) =>
                String(value).toLowerCase().includes(query)
            )
        )
    }, [admin.users, searchQuery])

    const pending = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()
        if (!query) return admin.users.filter(u => u.acc_status === 'Pending')
        return admin.users.filter(u => u.acc_status === 'Pending').filter((user) =>
            Object.values(user).some((value) =>
                String(value).toLowerCase().includes(query)
            )
        )
    }, [admin.users, searchQuery])

    const inactive = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()
        if (!query) return admin.users.filter(u => u.acc_status === 'Inactive')
        return admin.users.filter(u => u.acc_status === 'Inactive').filter((user) =>
            Object.values(user).some((value) =>
                String(value).toLowerCase().includes(query)
            )
        )
    }, [admin.users, searchQuery])

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>

        function display() {
            timeout = setTimeout(() => {
                setShowPending(pending.length > 0)
                setShowInactive(inactive.length > 0)
                setShowActive(active.length > 0)
            }, 10000)
        }

        display()

        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
        }
    }, [active, pending, inactive])

    return (
        <Page
            showSearch={search}
            className="flex flex-col justify-center items-center gap-3"
            value={searchQuery}
            setValue={setSearchQuery as (val: string | number) => void}
        >
            <FancyLoad loading={loading} />
            <AddUser />

            <Tray
                show={showActive}
                title="Approved Users"
                title_bg_color="green"
                data={active}
            >
                {
                    active.length > 0 ? active.map(u => <UserDisplayCard user={u} />) :
                        <Text text="No approved users found" color="white" />
                }
            </Tray>

            <Tray
                show={showPending}
                title="Pending Users"
                title_bg_color="yellow"
                data={pending}
            >
                {
                    pending.length > 0 ? pending.map(u => <UserDisplayCard user={u} />) :
                        <Text text="No pending users found" color="black" />
                }
            </Tray>

            <Tray
                show={showInactive}
                title="Disabled Users"
                title_bg_color="red"
                data={inactive}
            >
                {
                    inactive.length > 0 ? inactive.map(u => <UserDisplayCard user={u} />) :
                        <Text text="No inactive users found" color="white" />
                }
            </Tray>
        </Page>
    )
}