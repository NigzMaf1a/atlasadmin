//hooks
import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import useAdmin from "../hooks/useAdmin"

//components
import Page from "../components/Page"
import CustomDiv from "../components/CustomDiv"
import LabelledDropdown from "../components/LabelledDropdown"
import LabelledInput from "../components/LabelledInput"

//types
import type { DropDownValue } from "../components/LabelledDropdown"

//shadcn
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card"
import { Button } from "@base-ui/react"

//scripts
import Payloads from "../scripts/utils/payloads"
import Toaster from "../scripts/utils/Toaster"

export default function AddRole() {
    const [sectorId, setSectorId] = useState<number>(0)
    const [roleTitle, setRoleTitle] = useState<string>('')
    const navigate = useNavigate()
    const admin = useAdmin()

    const values = useMemo((): DropDownValue[] => {
        return admin.sectors.map((s): DropDownValue => {
            return {
                label: s.sector_name,
                value: Number(s.sector_id)
            }
        })
    }, [admin.sectors])

    function redirect() {
        navigate('/roles')
        setSectorId(0)
        setRoleTitle('')
    }

    function validate(): boolean {
        if (!sectorId || sectorId === 0) {
            Toaster('Please enter a valid sector', 'info')
            return false
        }

        if (!roleTitle.trim()) {
            Toaster('Please enter a valid role title', 'info')
            return false
        }

        return true
    }

    async function initiate() {
        if (validate()) await admin.addRole(Payloads.createRole(sectorId, roleTitle))
            .then(res => {
                console.log(res)
            }).finally()
    }

    return (
        <Page className="overflow-y-hidden">
            <CustomDiv className="w-full h-full mx-2 mt-2">
                <Card className="mt-auto">
                    <CardHeader className="flex items-center justify-center">
                        <CardTitle className="text-green-600">Add Role</CardTitle>
                    </CardHeader>

                    <CardContent className="flex items-center justify-center">
                        <CardContent className="h-30 w-200 grid grid-cols-2 gap-2">
                            <LabelledDropdown
                                label="Sector"
                                values={values}
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

                    <CardFooter className="w-full h-20 flex flex-row justify-evenly items-center">
                        <Button
                            className="bg-blue-600 text-white hover:bg-blue-700 w-32 h-10 rounded-lg hover:cursor-pointer"
                            onClick={() => redirect()}
                        >
                            Back
                        </Button>

                        <Button
                            className="bg-green-600 text-white hover:bg-green-700 w-32 h-10 rounded-lg hover:cursor-pointer"
                            onClick={async () => await initiate()}
                        >
                            Add
                        </Button>
                    </CardFooter>
                </Card>
            </CustomDiv>
        </Page>
    )
}
