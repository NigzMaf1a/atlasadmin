import { useState, useEffect, useMemo } from "react"

//components
import Page from "../components/Page"
import Tray from "../components/Tray"
import ListItemWithBtn from "../components/ListItemWithBtn"
import Text from "../components/Text"
import FancyLoad from "../views/FancyLoad"
import SectorModal from "../views/SectorModal"
import AddSector from "../views/AddSector"

//scripts
import Users from "../scripts/utils/users"
import Session from "../scripts/utils/session"
import Toaster from "../scripts/utils/Toaster"

//types
import type Sector from "../scripts/interfaces/sectors"

export default function Sectors() {
    const [loading, setLoading] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showAddSector, setShowAddSector] = useState<boolean>(false)
    const [sectors, setSectors] = useState<Sector[]>([])
    const [query, setQuery] = useState<string>('')
    const [showPending, setShowPending] = useState<boolean>(false)
    const [showActive, setShowActive] = useState<boolean>(false)
    const [showInactive, setShowInactive] = useState<boolean>(false)
    const [sector, setSector] = useState<Sector>()

    useEffect(() => {
        async function init() {
            try {
                setLoading(true)
                const a = new Users(Session.getToken())
                const s = await a.getSectors()

                setSectors(s)
            } catch (error) {
                Toaster('An error occurred while initializing sectors')
                throw new Error('An error occurred while initializing sectors')
            } finally {
                setLoading(false)
            }
        }

        init()
    }, [])

    const queried = useMemo(() => {
        const queryExp = query.trim().toLowerCase()

        if (!queryExp) return sectors

        return sectors.filter((s) =>
            Object.values(s).some((value) =>
                String(value).toLowerCase().includes(query)
            ))
    }, [query, sectors])

    const pending = useMemo(() => {
        return queried.filter(q => q.sector_status === 'Pending')
    }, [queried])

    const active = useMemo(() => {
        return queried.filter(q => q.sector_status === 'Approved')
    }, [queried])

    const inactive = useMemo(() => {
        return queried.filter(q => q.sector_status === 'Inactive')
    }, [queried])

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>
        try {
            setShowPending(true)
            setShowActive(true)
            setShowInactive(true)

            timeout = setTimeout(() => {
                setShowPending(pending.length > 0)
                setShowActive(active.length > 0)
                setShowInactive(inactive.length > 0)
            }, 10000)
        } catch (error) {

        }

        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
        }
    }, [pending, active, inactive])

    function mountModal(s: Sector) {
        setSector(s)
        setShowModal(true)
    }

    function unmountModal() {
        setSector(undefined)
        setShowModal(false)
    }

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>

        function displayAddSector() {
            setShowAddSector(true)
            timeout = setTimeout(() => setShowAddSector(false), 15000)
        }

        displayAddSector()

        const interval = setInterval(() => {
            displayAddSector()
        }, 1 * 60 * 1000)

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }

    }, [])

    return (
        <>
            <Page
                showSearch={true}
                value={query}
                setValue={setQuery as (val: string | number) => void}
                className={((): string => {
                    return `flex flex-col gap-1`
                })()}
            >
                <FancyLoad loading={loading} />
                <AddSector show={showAddSector} />
                <Tray
                    show={showActive}
                    color="white"
                    className={active.length === 0 ? 'bg-green-500 rounded-lg' : ''}
                    title="Approved"
                    title_bg_color="green"
                >
                    {
                        active.length > 0 ? active.map((a) => <ListItemWithBtn
                            label_one="Sector Name"
                            label_two="Sector Status"
                            text_one={a.sector_name}
                            text_two={a.sector_status}
                            btn_label="View"
                            onClick={() => mountModal(a)}
                            btn_color="success"
                        />) : <Text
                            text="No approved accounts found"
                            color="white"
                        />
                    }
                </Tray>

                <Tray
                    show={showPending}
                    color="white"
                    className={pending.length === 0 ? 'bg-yellow-500 rounded-lg' : ''}
                    title="Pending"
                    title_bg_color="yellow"
                >
                    {
                        pending.length > 0 ? pending.map((a) => <ListItemWithBtn
                            label_one="Sector Name"
                            label_two="Sector Status"
                            text_one={a.sector_name}
                            text_two={a.sector_status}
                            btn_label="View"
                            onClick={() => mountModal(a)}
                            btn_color="warn"
                        />) : <Text
                            text="No pending accounts found"
                            color="black"
                        />
                    }
                </Tray>

                <Tray
                    show={showInactive}
                    color={inactive.length === 0 ? 'red' : 'white'}
                    className={inactive.length === 0 ? 'rounded-lg' : ''}
                >
                    {
                        inactive.length > 0 ? inactive.map((a) => <ListItemWithBtn
                            label_one="Sector Name"
                            label_two="Sector Status"
                            text_one={a.sector_name}
                            text_two={a.sector_status}
                            btn_label="View"
                            onClick={() => mountModal(a)}
                        />) : <Text
                            text="No inactive accounts found"
                            color="white"
                        />
                    }
                </Tray>
            </Page>

            {sector && (
                <SectorModal
                    show={showModal}
                    onClick={unmountModal}
                    sector={sector}
                />
            )}
        </>
    )
}
