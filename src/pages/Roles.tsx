import { useState, useEffect, useMemo } from "react"

//components
import Page from "../components/Page"
import ListItemWithBtn from "../components/ListItemWithBtn"
import Tray from "../components/Tray"
import FancyLoad from "../views/FancyLoad"
import Text from "../components/Text"

//types
import type Role from "../scripts/interfaces/roles"
import type Sector from "../scripts/interfaces/sectors"

//scripts
import Users from "../scripts/utils/users"
import Session from "../scripts/utils/session"
import Toaster from "../scripts/utils/Toaster"
import RoleClass from "../scripts/utils/roles"

export default function Roles() {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [roles, setRoles] = useState<Role[]>([])
    const [sectors, setSectors] = useState<Sector[]>([])
    const [showPending, setShowPending] = useState<boolean>(false)
    const [showInactive, setShowInactive] = useState<boolean>(false)
    const [showActive, setShowActive] = useState<boolean>(false)

    function toggleModal() {
        setShowModal(prev => !prev)
    }

    useEffect(() => {

        async function init() {
            try {
                setLoading(true)
                const admin = new Users(Session.getToken())
                const r = await admin.getRoles()
                const s = await admin.getSectors()

                setSectors(s)
                setRoles(r)

                Toaster('Roles fetched successfully', 'success')
            } catch (error) {
                Toaster('An error occurred while initializing roles', 'danger')
            } finally {
                setLoading(false)
            }
        }

        init()
    }, [])

    useEffect(() => {
        console.log("roles state:", roles)
    }, [roles])

    const queried = useMemo(() => {
        if (!searchQuery.trim().toLowerCase()) return roles
        return roles.filter((r) =>
            Object.values(r).some((value) =>
                String(value).toLowerCase().includes(searchQuery)
            ))
    }, [searchQuery, roles])

    const pending = useMemo(() => {
        return queried.filter(q => q.role_status === 'Pending')
    }, [queried])

    const active = useMemo(() => {
        return queried.filter(q => q.role_status == 'Approved')
    }, [queried])

    const inactive = useMemo(() => {
        return queried.filter(q => q.role_status === 'Inactive')
    }, [queried])

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>

        function display() {
            setShowActive(true)
            setShowInactive(true)
            setShowPending(true)

            timeout = setTimeout(() => {
                setShowPending(pending.length > 0)
                setShowActive(active.length > 0)
                setShowInactive(inactive.length > 0)
            }, 10000)
        }

        display()

        return () => {
            clearTimeout(timeout)
        }
    }, [pending, active, inactive])

    return (
        <Page
            showSearch={true}
            value={searchQuery}
            setValue={setSearchQuery as (val: string | number) => void}
            className={((): string => {
                return `flex flex-col gap-1`
            })()}
        >
            <FancyLoad loading={loading} />
            <Tray
                show={showActive}
                color={active.length === 0 ? 'green' : 'white'}
                title="Approved Roles"
                title_bg_color="green"
                className={active.length === 0 ? 'rounded-lg' : ''}
            >
                {
                    active.length > 0 ? active.map(a => <ListItemWithBtn
                        label_one="Role title"
                        label_two="Role Sector"
                        text_one={a.role_title}
                        text_two={RoleClass.getRoleSector(a.sector_id, sectors)}
                        btn_label="View"
                        btn_color="success"
                        onClick={() => toggleModal()}
                    />) : <Text text="No pending roles found" color="white" />
                }
            </Tray>

            <Tray
                show={showPending}
                color={pending.length === 0 ? 'yellow' : 'white'}
                title="Pending Roles"
                title_bg_color="yellow"
                className={pending.length === 0 ? 'rounded-lg' : ''}
            >
                {
                    pending.length > 0 ? pending.map(a => <ListItemWithBtn
                        label_one="Role title"
                        label_two="Role Sector"
                        text_one={a.role_title}
                        text_two={RoleClass.getRoleSector(a.sector_id, sectors)}
                        btn_label="View"
                        onClick={() => toggleModal()}
                    />) : <Text text="No approved roles found" color="white" />
                }
            </Tray>

            <Tray
                show={showInactive}
                color={inactive.length === 0 ? 'red' : 'white'}
                title="Inactive Roles"
                title_bg_color="red"
                className={inactive.length === 0 ? 'rounded-lg' : ''}
            >
                {
                    inactive.length > 0 ? inactive.map(a => <ListItemWithBtn
                        label_one="Role title"
                        label_two="Role Sector"
                        text_one={a.role_title}
                        text_two={RoleClass.getRoleSector(a.sector_id, sectors)}
                        btn_label="View"
                        onClick={() => toggleModal()}
                    />) : <Text text="No inactive roles found" color="white" />
                }
            </Tray>
        </Page>
    )
}
