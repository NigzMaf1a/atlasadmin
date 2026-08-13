import { useState, useEffect } from "react"

//components
import Page from "../components/Page"
import Tray from "../components/Tray"
import FancyLoad from "../views/FancyLoad"
import Text from "../components/Text"
import UpdateAbout from "../views/UpdateAbout"
import Input from "../components/Input"
import ButtonAdv from "../components/ButtonAdv"

//types
import type About from "../scripts/interfaces/about"

//scripts
import Users from "../scripts/utils/users"
import Session from "../scripts/utils/session"
import Toaster from "../scripts/utils/Toaster"

export default function AboutPage() {
    const [about, setAbout] = useState<About[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [aboutText, setAboutText] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [adm, setAdm] = useState<Users>()

    async function updateCurrentAbout() {
        try {
            Toaster('Updating about', 'info')
            await adm?.updateAbout(1, text)
            Toaster('About updated successfully', 'success')
            setText('')
        } catch (error) {
            Toaster('Error occurred while updating about', 'danger')
        }
    }

    useEffect(() => {
        async function init() {
            try {
                setLoading(true)

                const admin = new Users(Session.getToken())
                const a = await admin.getAbout()

                setAbout(a)
                setAdm(admin)

                Toaster('About fetched successfully', 'success')
            } catch (error) {
                Toaster(
                    'There was an error while fetching about',
                    'danger'
                )
            } finally {
                setTimeout(() => setLoading(false), 3000)
            }
        }

        init()
    }, [])

    useEffect(() => {
        if (about.length > 0) {
            setAboutText(about[0].about_detail)
        }
    }, [about])

    return (
        <Page
            className={((): string => {
                return `flex flex-col gap-1 px-2`
            })()}
        >
            <FancyLoad loading={loading} />
            <UpdateAbout
                onClick={() => {
                    if (edit) setText('')
                    setEdit(prev => !prev)
                }}
                clicked={edit}
            />

            <Tray
                show={edit}
                title="Update About"
                title_bg_color="blue"
                color="white"
            >
                <Input
                    value={text}
                    onChange={setText}
                    placeholder={aboutText}
                />
                {
                    text.trim() && <ButtonAdv label="Submit" onClick={async () => {
                        await updateCurrentAbout()
                    }} />
                }
            </Tray>

            <Tray>
                <Text text={aboutText} />
            </Tray>
        </Page>
    )
}