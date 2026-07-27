import Rib from "../components/Rib"
import CustomDiv from "../components/CustomDiv"

export default function AddUser() {
    const styles = {
        cont: 'fixed top-0 left-0',
        sect: 'w-[200px] h-[50px] absolute top-[90px] right-0',
        flex: 'flex flex-row justify-between items-center',
        margins: 'mr-4',
        borders: 'rounded border-1 border-gray-200'
    }

    return (
        <Rib className={styles.cont}>
            <CustomDiv className={`${styles.sect} ${styles.flex} ${styles.margins} ${styles.borders}`}>
                AddUser
            </CustomDiv>
        </Rib>
    )
}
