import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

//components
import Page from "../components/Page"
import FancyLoad from "../views/FancyLoad"

//scripts
import Session from "../scripts/utils/session"
import Toaster from "../scripts/utils/Toaster"

export default function Logout() {
    const navigate = useNavigate()

    useEffect(() => {
        Toaster('Bye Bye', 'info')

        const timeout = setTimeout(() => {
            Session.sessionClear()
            navigate('/login', { replace: true })
        }, 3000)

        return () => {
            clearTimeout(timeout)
        }
    }, [navigate])

    return (
        <Page>
            <FancyLoad loading />
        </Page>
    )
}