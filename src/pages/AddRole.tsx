//hooks
import { useState } from "react"

//components
import Page from "../components/Page"
import CustomDiv from "../components/CustomDiv"
import LabelledDropdown from "../components/LabelledDropdown"
import LabelledInput from "../components/LabelledInput"

//shadcn
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"

export default function AddRole() {
    const [sectorId, setSectorId] = useState<number>(0)
    const [roleTitle, setRoleTitle] = useState<string>('')

    return (
        <Page className="overflow-y-hidden">
            <CustomDiv className="w-full h-full mx-2 mt-2">
                <Card className="mt-auto">
                    <CardHeader className="flex items-center justify-center">
                        <CardTitle className="text-blue-600">Add Role</CardTitle>
                    </CardHeader>

                    <CardContent className="flex items-center justify-center">
                        <CardContent className="h-100 w-200 grid grid-cols-2">
                            <LabelledDropdown
                                label="Sector"
                                value={sectorId}
                                onChange={setSectorId as (val: string | number) => void}
                            />

                            <LabelledInput
                                label="Role Title"
                                value={roleTitle}
                                onChange={setRoleTitle}
                                placeholder="Enter role title"
                            />
                        </CardContent>
                    </CardContent>
                </Card>
            </CustomDiv>
        </Page>
    )
}
