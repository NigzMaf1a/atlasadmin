//hooks
import useAdmin from "../hooks/useAdmin"
import { useState } from "react"

//components
import Page from "../components/Page"
import CustomDiv from "../components/CustomDiv"
import FancyLoad from "../views/FancyLoad"
import LabelledText from "../components/LabelledText"
import UpdateContact from "./UpdateContact"

//shadcn
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"

export default function Contacts() {
    const [update, setUpdate] = useState<boolean>(false)
    const admin = useAdmin()

    return (
        <Page className="px-2 overflow-y-hidden">
            <FancyLoad loading={admin.loading} />

            <CustomDiv className="w-full h-full mt-2">
                {
                    !update && !admin.loading && <Card>
                        <CardHeader className="w-full flex justify-center items-center">
                            <CardTitle className="text-blue-500">Contacts</CardTitle>
                        </CardHeader>

                        <CardContent className="flex flex-col gap-2 w-full grow">

                            <CardContent className="grid grid-cols-2 gap-2 w-full">
                                <LabelledText label="Email" text={admin.contact?.email} />
                                <LabelledText label="Facebook" text={admin.contact?.facebook} />
                                <LabelledText label="X" text={admin.contact?.x} />
                                <LabelledText label="Instagram" text={admin.contact?.instagram} />
                                <LabelledText label="Slack" text={admin.contact?.slack} />
                                <LabelledText label="Phone" text={admin.contact?.phone} />
                            </CardContent>

                            <CardFooter className="mt-3">
                                <CustomDiv className="w-full flex flex-row justify-center items-center">
                                    <Button
                                        className="bg-blue-600 text-white hover:bg-blue-700 w-32 h-10 rounded-lg hover:cursor-pointer"
                                        onClick={() => setUpdate(true)}
                                    >
                                        Update
                                    </Button>
                                </CustomDiv>
                            </CardFooter>
                        </CardContent>
                    </Card>
                }

                {
                    update && <UpdateContact
                        setUpdate={setUpdate}
                        update={admin.updateContact}
                        cont={admin.contact}
                    />
                }
            </CustomDiv>
        </Page>
    )
}
