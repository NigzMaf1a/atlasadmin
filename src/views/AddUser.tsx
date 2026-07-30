import { useState, useEffect } from "react"


//components
import Rib from "../components/Rib"
import CustomDiv from "../components/CustomDiv"
import ButtonAdv from "../components/ButtonAdv"
import Modal from "../components/Modal"
import LabelledInput from "../components/LabelledInput"
import LabelledDropdown from "../components/LabelledDropdown"

//styles
import Styles from "../styles/sections"

//scripts
import Payloads from "../scripts/utils/payloads"
import Users from "../scripts/utils/users"
import Session from "../scripts/utils/session"

//types
import type User from "../scripts/interfaces/user"
import type { DropDownValue } from "../components/LabelledDropdown"

interface AddUserProps {
    method: (val: User) => Promise<void>
}

export default function AddUser({ method }: AddUserProps) {
    const admin = new Users(Session.getToken())
    const [btnClicked, setBtnClicked] = useState<boolean>(false)
    const [addUser, setAddUser] = useState<boolean>(false)
    const [sectorId, setSectorId] = useState<number>(0)
    const [roleId, setRoleId] = useState<number>(0)
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [regtype, setRegtype] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [sectorValues, setSectorValues] = useState<DropDownValue[]>([])
    const [regtypeValues, setRegtypeValues] = useState<DropDownValue[]>([])
    const [roleValues, setRoleValues] = useState<DropDownValue[]>([])

    useEffect(() => {
        async function init() {
            const roles = await admin.getRoles()
            const sectors = await admin.getSectors()

            const sectVals = sectors.map((s): DropDownValue => {
                return {
                    label: s.sector_name,
                    value: s.sector_id as number
                }
            })

            const rolVals = roles.filter(r => r.sector_id === sectorId).map((r): DropDownValue => {
                return {
                    label: r.role_title,
                    value: r.role_id as number
                }
            })

            const regtypes: DropDownValue[] = ((): DropDownValue[] => {
                return rolVals.map((r): DropDownValue => {
                    return {
                        label: r.label as string,
                        value: r.label as string
                    }
                })
            })()

            setRoleValues(rolVals)
            setSectorValues(sectVals)
            setRegtypeValues(regtypes)
        }

        init()
    }, [sectorId])

    const styles = {
        cont: 'fixed top-0 left-0',
        sect: 'w-[200px] h-[50px] absolute top-[90px] right-0',
        flex: 'flex flex-row justify-between items-center',
        margins: 'mr-4 px-2',
        borders: 'rounded border-1 border-gray-200'
    }

    function clearFields() {
        setSectorId(0)
        setRoleId(0)
        setName('')
        setEmail('')
        setRegtype('')
        setPassword('')
        setLocation('')
    }

    function toggleAddUser() {
        setAddUser(prev => !prev)
    }

    return (
        <>
            <Rib className={styles.cont}>
                <CustomDiv className={`${styles.sect} ${styles.flex} ${styles.margins} ${styles.borders}`}>
                    AddUser
                    <ButtonAdv
                        label="Add"
                        onClick={() => toggleAddUser()}
                    />
                </CustomDiv>
            </Rib>

            <Modal
                showModal={addUser}
                onClose={() => toggleAddUser()}
            >
                <CustomDiv className={Styles.form()}>

                    <CustomDiv className={Styles.itemsContainerInaForm()}>
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
                            onChange={setSectorId as (val: string | number) => void}
                            label="Sector"
                            values={sectorValues}
                        />

                        <LabelledDropdown
                            value={roleId}
                            onChange={setRoleId as (val: string | number) => void}
                            label="Role"
                            values={roleValues}
                        />

                        <LabelledDropdown
                            value={regtype}
                            onChange={setRegtype as (val: string | number) => void}
                            label="Reg Type"
                            values={regtypeValues}
                        />
                    </CustomDiv>

                    <CustomDiv className={Styles.formFooter()}>
                        <ButtonAdv
                            label="Close"
                            onClick={() => {
                                toggleAddUser()
                            }}
                            color="info"
                            btn_type="secondary"
                            size="sm"
                        />
                        <ButtonAdv
                            label="Add"
                            onClick={async () => {

                                const user = Payloads.createUser(sectorId, roleId, name, email, regtype, location, password)
                                await method(user)
                                clearFields()
                                toggleAddUser()
                                setBtnClicked(false)
                            }}
                            isClicked={btnClicked}
                            setIsClicked={setBtnClicked}
                            color="success"
                            btn_type="secondary"
                            size="sm"
                        />
                    </CustomDiv>
                </CustomDiv>
            </Modal>
        </>
    )
}
