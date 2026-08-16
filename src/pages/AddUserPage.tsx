// hooks
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useAdmin from "../hooks/useAdmin"

// components
import Page from "../components/Page"
import LabelledInput from "../components/LabelledInput"
import LabelledDropdown from "../components/LabelledDropdown"
import ButtonAdv from "../components/ButtonAdv"
import FancyLoad from "../views/FancyLoad"

// shadcn
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "../components/ui/card"

// types
import type { DropDownValue } from "../components/LabelledDropdown"

// scripts
import Toaster from "../scripts/utils/Toaster"
import Payloads from "../scripts/utils/payloads"
import getRegtype from "../scripts/utils/regtype"

export default function AddUserPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [location, setLocation] = useState("")
    const [sectorId, setSectorId] = useState<number>(0)
    const [roleId, setRoleId] = useState<number>(0)
    const [regtype, setRegtype] = useState("")
    const [btnClicked, setBtnClicked] = useState(false)

    const admin = useAdmin()
    const navigate = useNavigate()

    const { roles, sectors, loading } = admin

    const sectorValues: DropDownValue[] = sectors.map((sector) => ({
        label: sector.sector_name,
        value: sector.sector_id as number,
    }))

    const roleValues: DropDownValue[] = roles
        .filter((role) => Number(role.sector_id) === sectorId)
        .map((role) => ({
            label: role.role_title,
            value: role.role_id as number,
        }))

    const regtypeValues: DropDownValue[] = roleValues.map((role) => ({
        label: role.label,
        value: role.label,
    }))

    function clearFields() {
        setName("")
        setEmail("")
        setPassword("")
        setLocation("")
        setSectorId(0)
        setRoleId(0)
        setRegtype("")
    }

    function handleSectorChange(value: string | number) {
        const newSectorId = Number(value)

        setSectorId(newSectorId)
        setRoleId(0)
        setRegtype("")
    }

    function handleRoleChange(value: string | number) {
        const newRoleId = Number(value)

        setRoleId(newRoleId)
        setRegtype("")
    }

    function validateForm(): boolean {
        if (
            !name.trim() ||
            !email.trim() ||
            !password ||
            !location.trim() ||
            !sectorId ||
            !roleId ||
            !regtype
        ) {
            Toaster("Please fill in all the fields", "info")
            return false
        }

        return true
    }

    async function handleSubmit() {
        if (btnClicked) {
            return
        }

        if (!validateForm()) {
            return
        }

        const user = Payloads.createUser(
            sectorId,
            roleId,
            name.trim(),
            email.trim(),
            regtype,
            location.trim(),
            password
        )

        const expectedRegtype = getRegtype(roles, roleId)

        if (user.reg_type !== expectedRegtype) {
            Toaster(
                "Registration type does not match the selected role",
                "danger"
            )

            setRegtype("")
            return
        }

        try {
            setBtnClicked(true)

            await admin.addUser(user)

            clearFields()

            Toaster(
                "User added successfully",
                "success"
            )
        } catch (error) {
            console.error("Error adding user:", error)

            Toaster(
                "An error occurred while adding the user",
                "danger"
            )
        } finally {
            setBtnClicked(false)
        }
    }

    if (loading) {
        return (
            <Page>
                <FancyLoad loading={loading} />
            </Page>
        )
    }

    return (
        <Page>
            <Card className="w-full h-full">
                <CardHeader className="w-full"></CardHeader>

                <CardContent className="w-full h-[90%] grid grid-cols-2 gap-2">

                    <LabelledInput
                        value={name}
                        onChange={setName}
                        label="Name"
                        placeholder="Enter a name here"
                    />

                    <LabelledInput
                        value={email}
                        onChange={setEmail}
                        label="Email"
                        placeholder="Enter an email here"
                    />

                    <LabelledInput
                        value={password}
                        onChange={setPassword}
                        label="Password"
                        placeholder="Enter a password here"
                    />

                    <LabelledInput
                        value={location}
                        onChange={setLocation}
                        label="Location"
                        placeholder="Enter a location here"
                    />

                    <LabelledDropdown
                        value={sectorId}
                        onChange={handleSectorChange}
                        label="Sector"
                        values={sectorValues}
                    />

                    <LabelledDropdown
                        value={roleId}
                        onChange={handleRoleChange}
                        label="Role"
                        values={roleValues}
                    />

                    <LabelledDropdown
                        value={regtype}
                        onChange={(value) => {
                            setRegtype(String(value))
                        }}
                        label="Reg Type"
                        values={regtypeValues}
                    />
                </CardContent>

                <CardFooter className="w-full h-[10%] flex flex-row justify-evenly items-center">
                    <ButtonAdv
                        label="Back"
                        onClick={() => navigate(-1)}
                        color="info"
                        btn_type="secondary"
                        size="sm"
                    />

                    <ButtonAdv
                        label="Add"
                        onClick={handleSubmit}
                        isClicked={btnClicked}
                        setIsClicked={setBtnClicked}
                        color="success"
                        btn_type="secondary"
                        size="sm"
                    />
                </CardFooter>
            </Card>
        </Page>
    )
}