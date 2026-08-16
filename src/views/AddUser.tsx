import { useNavigate } from "react-router-dom"

//components
import Rib from "../components/Rib"
import CustomDiv from "../components/CustomDiv"
import ButtonAdv from "../components/ButtonAdv"

export default function AddUser() {
    const navigate = useNavigate()



    const styles = {
        cont: 'fixed top-0 left-0',
        sect: 'w-[200px] h-[50px] absolute top-[90px] right-0',
        flex: 'flex flex-row justify-between items-center',
        margins: 'mr-4 px-2',
        borders: 'rounded border-1 border-gray-200'
    }

    return (
        <>
            <Rib className={styles.cont}>
                <CustomDiv className={`${styles.sect} ${styles.flex} ${styles.margins} ${styles.borders}`}>
                    AddUser
                    <ButtonAdv
                        label="Add"
                        onClick={() => navigate('/user/add')}
                    />
                </CustomDiv>
            </Rib>
        </>
    )
}
