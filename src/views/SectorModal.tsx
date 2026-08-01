//components
import Modal from "../components/Modal"
import CustomDiv from "../components/CustomDiv"
import LabelledText from "../components/LabelledText"
import ButtonAdv from "../components/ButtonAdv"

//types
import type Sector from "../scripts/interfaces/sectors"

//scripts
import Users from "../scripts/utils/users"
import Session from "../scripts/utils/session"
import Toaster from "../scripts/utils/Toaster"

//styles
import Styles from "../styles/sections"

interface Props {
    sector: Sector
    show: boolean
    onClick?: () => void
}

export default function SectorModal(
    { sector, show, onClick }: Props
) {
    const admin = new Users(Session.getToken())

    async function action() {
        switch (sector.sector_status) {
            case 'Inactive':
                await admin.approveUserStatus(sector.sector_id as number, 'Pending')
                break
            case 'Approved':
                await admin.approveUserStatus(sector.sector_id as number, 'Inactive')
                break
            case 'Pending':
            default:
                await admin.approveUserStatus(sector.sector_id as number, 'Approved')
        }
    }

    return (
        <Modal
            showModal={show}
        >
            <CustomDiv className={Styles.form()}>
                <LabelledText
                    label="Sector ID"
                    text={String(Number(sector.sector_id))}
                />
                <LabelledText
                    label="Sector Name"
                    text={sector.sector_name}
                />
                <LabelledText
                    label="Sector Status"
                    text={sector.sector_status}
                />
                <LabelledText
                    label="Sector Description"
                    text={sector.sector_description}
                />
                <CustomDiv className={Styles.formFooter()}>
                    <ButtonAdv
                        label="Close"
                        onClick={() => {
                            onClick && onClick()
                        }}
                        size="sm"
                        btn_type="secondary"
                        color="info"
                    />
                    <ButtonAdv
                        label={
                            sector.sector_status === 'Approved' ? 'Disable' :
                                sector.sector_status === 'Pending' ? 'Approve' :
                                    'Enable'
                        }

                        onClick={async () => {
                            try {
                                await action()
                                Toaster('Sector status updated successfully', 'success')
                            } catch (error) {
                                Toaster('Failed to update sector status', 'danger')
                            }
                        }}

                        size="sm"
                        btn_type="secondary"
                        color={
                            sector.sector_status === 'Pending' ? 'success' :
                                sector.sector_status === 'Inactive' ? 'warn' :
                                    'danger'
                        }
                    />
                </CustomDiv>
            </CustomDiv>
        </Modal>
    )
}
