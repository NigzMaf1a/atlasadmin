//hooks
import { useState } from "react"

//shadcn
import { CardContent, Card, CardFooter, CardTitle, CardHeader } from "../components/ui/card"
import { Button } from "@base-ui/react"

//components
import LabelledInput from "../components/LabelledInput"

//types
import type Contact from "../scripts/interfaces/contact"

//scripts
import Toaster from "../scripts/utils/Toaster"

interface Props {
    setUpdate: (bool: boolean) => void
    update: (id: string, contact: Contact) => Promise<void>
    cont: Contact
}

export default function UpdateContact(
    { setUpdate, update, cont }: Props
) {
    const [slack, setSlack] = useState<string>(cont.slack)
    const [instagram, setInstagram] = useState<string>(cont.instagram)
    const [x, setX] = useState<string>(cont.x)
    const [facebook, setFacebook] = useState<string>(cont.facebook)
    const [email, setEmail] = useState<string>(cont.email)
    const [phone, setPhone] = useState<string>(cont.phone)

    function validate(): boolean {
        if (!slack.trim()) {
            Toaster('Please enter a valid slack account', 'info')
            return false
        }

        if (!instagram.trim()) {
            Toaster('Please enter a valid instagram account', 'info')
            return false
        }

        if (!x.trim()) {
            Toaster('Please enter a valid x account', 'info')
            return false
        }

        if (!facebook.trim()) {
            Toaster('Please enter a valid facebook account', 'info')
            return false
        }

        if (!email.trim()) {
            Toaster('Please enter a valid email account', 'info')
            return false
        }

        if (!phone.trim()) {
            Toaster('Please enter a valid phone account', 'info')
            return false
        }

        return true
    }

    async function initiate() {
        if (!validate()) {
            Toaster('Failed to update contact', 'danger')
            return
        }

        const contact: Contact = {
            slack,
            instagram,
            x,
            facebook,
            email,
            phone
        }

        Toaster('Wait.....', 'info')

        await update(String(cont.contact_id), contact)

        Toaster('Contact updated successfully', 'success')
    }

    return (
        <Card>
            <CardHeader className="w-full flex justify-center items-center">
                <CardTitle className="text-blue-500">Update Contact</CardTitle>
            </CardHeader>



            <CardContent className="grid grid-cols-2 gap-2 w-full">
                <LabelledInput
                    label="Slack"
                    value={slack}
                    onChange={setSlack}
                    placeholder={cont.slack}
                />

                <LabelledInput
                    label="Instagram"
                    value={instagram}
                    onChange={setInstagram}
                    placeholder={cont.instagram}
                />

                <LabelledInput
                    label="X"
                    value={x}
                    onChange={setX}
                    placeholder={cont.x}
                />

                <LabelledInput
                    label="Facebook"
                    value={facebook}
                    onChange={setFacebook}
                    placeholder={cont.facebook}
                />

                <LabelledInput
                    label="Email"
                    value={email}
                    onChange={setEmail}
                    placeholder={cont.email}
                />

                <LabelledInput
                    label="Phone"
                    value={phone}
                    onChange={setPhone}
                    placeholder={cont.phone}
                />
            </CardContent>

            <CardFooter className="w-full flex flex-row justify-evenly items-center">
                <Button
                    className="bg-blue-600 text-white hover:bg-blue-700 w-32 h-10 rounded-lg hover:cursor-pointer"
                    onClick={() => setUpdate(false)}
                >
                    Back
                </Button>

                <Button
                    className="bg-green-600 text-white hover:bg-green-700 w-32 h-10 rounded-lg hover:cursor-pointer"
                    onClick={async () => await initiate()}
                >
                    Submit
                </Button>
            </CardFooter>
        </Card>
    )
}
