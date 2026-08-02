import { useState } from "react"

//components
import CustomDiv from "../components/CustomDiv"
import Modal from "../components/Modal"
import LabelledText from "../components/LabelledText"
import ButtonAdv from "../components/ButtonAdv"
import ListItemWithBtn from "../components/ListItemWithBtn"

//scripts
import type User from "../scripts/interfaces/user"
import UserUtils from "../scripts/utils/user"
import Styles from "../styles/sections"
import Users from "../scripts/utils/users"
import Session from "../scripts/utils/session"

interface Props {
    user: User
}

export default function UserDisplayCard({ user }: Props) {
    const [sector, setSector] = useState<string>('')
    const [showModal, setShowModal] = useState<boolean>(false)
    const [btnClicked, setBtnClicked] = useState<boolean>(false)

    async function getSectorName() {
        const s = await UserUtils.getSectorName(user.sector_id)
        setSector(s)
    }

    function toggleMOdal() {
        setShowModal(prev => !prev)
    }

    getSectorName()

    async function action(id: number) {
        const admin = new Users(Session.getToken())

        switch (user.acc_status) {
            case 'Inactive':
                await admin.approveUserStatus(id, 'Pending')
                break
            case 'Approved':
                await admin.approveUserStatus(id, 'Inactive')
                break
            case 'Pending':
            default:
                await admin.approveUserStatus(id, 'Approved')
        }

        setTimeout(() => setBtnClicked(false), 1000)
        setTimeout(() => toggleMOdal(), 3000)
    }

    return (
        <>
            <ListItemWithBtn
                label_one="Sector"
                text_one={sector}
                label_two="User Name"
                text_two={user.user_name}
                btn_label="View"
                onClick={() => toggleMOdal()}
                btn_color={
                    user.acc_status === 'Approved' ? 'success' :
                        user.acc_status === 'Inactive' ? 'danger' :
                            'warn'
                }
            />

            <Modal showModal={showModal} onClose={() => setShowModal(false)}>
                <CustomDiv className={Styles.form()}>
                    <LabelledText
                        label="Name"
                        text={user.user_name}
                    />
                    <CustomDiv className={Styles.formFooter()}>
                        <ButtonAdv
                            label="Close"
                            onClick={() => toggleMOdal()}
                            color="info"
                            btn_type="secondary"
                        />
                        <ButtonAdv
                            label={
                                user.acc_status === 'Approved' ? 'Deactivate' :
                                    user.acc_status === 'Inactive' ? 'Reactivate' :
                                        'Approve'
                            }
                            onClick={async () => { await action(user.user_id as number) }}
                            isClicked={btnClicked}
                            setIsClicked={setBtnClicked}
                            color={
                                user.acc_status === 'Approved' ? 'danger' :
                                    user.acc_status === 'Inactive' ? 'success' :
                                        'warn'
                            }
                            btn_type="secondary"
                            clickLabel={
                                user.acc_status === 'Approved' ? 'Deactivating' :
                                    user.acc_status === 'Inactive' ? 'Reactivating' :
                                        'Approving'
                            }
                        />
                    </CustomDiv>
                </CustomDiv>
            </Modal>
        </>
    )
}
