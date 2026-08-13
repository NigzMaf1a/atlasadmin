import { useState, useEffect } from "react"

//components
import Page from "../components/Page"
import CustomDiv from "../components/CustomDiv"
import FancyLoad from "../views/FancyLoad"

//scripts
import Session from "../scripts/utils/session"
import Users from "../scripts/utils/users"
import Toaster from "../scripts/utils/Toaster"

//types
import type Contact from "../scripts/interfaces/contact"

//styles
import GridStyles from "../styles/contacts"

interface Props {
    label: string
    value: string
}

function ContactItem(
    { label, value }: Props
) {
    return (
        <CustomDiv className={GridStyles.item().cont}>
            <CustomDiv className={GridStyles.item().row}>
                <CustomDiv className={GridStyles.item().label}>{label}</CustomDiv>
                <CustomDiv>:</CustomDiv>
                <CustomDiv className={GridStyles.item().value}>{value}</CustomDiv>
            </CustomDiv>
        </CustomDiv>
    )
}

export default function Contacts() {
    const [currContacts, setCurrContacts] = useState<Contact[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        async function init() {
            try {
                setLoading(true)

                const adm = new Users(Session.getToken())
                const c = await adm.getContact()

                setCurrContacts(c)
            } catch (error) {
                Toaster('An error occurred while fetching contacts', 'danger')
            } finally {
                setLoading(false)
            }
        }

        init()
    }, [])

    const cont = currContacts[0]

    const styles = 'grid grid-rows-6'

    return (
        <Page>
            <FancyLoad loading={loading} />

            {cont && (
                <CustomDiv className={GridStyles.container()}>
                    <CustomDiv className={`${GridStyles.segment()} ${styles}`}>
                        <ContactItem label="Slack" value={cont.slack} />
                        <ContactItem label="Slack" value={cont.slack} />
                        <ContactItem label="Slack" value={cont.slack} />
                        <ContactItem label="Slack" value={cont.slack} />
                        <ContactItem label="Slack" value={cont.slack} />
                        <ContactItem label="Slack" value={cont.slack} />
                    </CustomDiv>
                    <CustomDiv className={GridStyles.segment()}>
                        Trials
                    </CustomDiv>
                </CustomDiv>
            )}
        </Page>
    )
}