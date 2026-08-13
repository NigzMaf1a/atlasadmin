//components
import CustomDiv from "../components/CustomDiv"

//styles
import StylesForViews from "../styles/views"

interface Props {
    onClick: () => void
    clicked: boolean
}

export default function UpdateAbout(
    { onClick, clicked }: Props
) {
    return (
        <CustomDiv className={StylesForViews.addSector().cont}>
            <CustomDiv
                className={StylesForViews.addSector().tray}
                onClick={() => {
                    onClick()
                }}
            >
                {clicked ? 'Editing' : 'Update'}
            </CustomDiv>
        </CustomDiv>
    )
}
