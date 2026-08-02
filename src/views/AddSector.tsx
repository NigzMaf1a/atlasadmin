import { useState } from "react"

//components
import CustomDiv from "../components/CustomDiv"
import Modal from "../components/Modal"
import ButtonAdv from "../components/ButtonAdv"
import LabelledInput from "../components/LabelledInput"

//styles
import StylesForViews from "../styles/views"
import Styles from "../styles/sections"

//scripts
import Session from "../scripts/utils/session"
import Users from "../scripts/utils/users"
import Payloads from "../scripts/utils/payloads"
import Toaster from "../scripts/utils/Toaster"

interface Props {
    show: boolean
}

export default function AddSector(
    { show }: Props
) {

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [showModal, setShowModal] = useState<boolean>(false)

    async function addSector() {
        try {
            if (!name.trim() || !description.trim()) {
                Toaster('Please fill in all the fields')
                return
            }

            const admin = new Users(Session.getToken())
            const payload = Payloads.createSector(name, description)
            await admin.createSector(payload)

            Toaster('Sector created successfully', 'success')
            unmountModal()
        } catch (error) {
            Toaster('An error occurred while adding the new sector', 'danger')
        }
    }

    function mountModal() {
        setShowModal(true)
    }

    function unmountModal() {
        setDescription('')
        setName('')
        setShowModal(false)
    }

    return (
        <>
            {
                show && <CustomDiv
                    className={StylesForViews.addSector().cont}
                >
                    <CustomDiv
                        className={StylesForViews.addSector().tray}
                        onClick={() => {
                            mountModal()
                        }}
                    >
                        Add User
                    </CustomDiv>
                </CustomDiv>
            }
            <Modal
                showModal={showModal}
                onClose={() => {
                    setDescription('')
                    setName('')
                    setShowModal(false)
                }}
            >
                <CustomDiv className={Styles.form()}>
                    <LabelledInput
                        label="Sector Name"
                        value={name}
                        onChange={setName}
                        placeholder="Please enter the sector name here"
                    />

                    <LabelledInput
                        label="Sector Description"
                        value={description}
                        onChange={setDescription}
                        placeholder="Please enter the sector description here"
                    />

                    <CustomDiv className={Styles.formFooter()}>
                        <ButtonAdv
                            label="Close"
                            onClick={() => unmountModal()}
                            btn_type="secondary"
                            size="sm"
                            color="info"
                        />

                        <ButtonAdv
                            label="Add"
                            onClick={async () => {
                                await addSector()
                            }}
                            btn_type="secondary"
                            size="sm"
                            color="success"
                        />
                    </CustomDiv>
                </CustomDiv>
            </Modal>
        </>
    )
}
