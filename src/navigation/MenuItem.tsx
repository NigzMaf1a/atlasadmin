import { useNavigate } from "react-router-dom"

//components
import CustomDiv from "../components/CustomDiv"
import Text from "../components/Text"

//styles
import StylesForViews from "../styles/views"

interface Props {
    label: string
    icon: string
    route: string
}

export default function MenuItem(
    { label, icon, route }: Props
) {
    const navigate = useNavigate()

    return (
        <CustomDiv
            className={StylesForViews.menuItem().cont}
            onClick={() => navigate(route)}
        >
            <Text text={label} />

            <CustomDiv className={StylesForViews.menuItem().icon}>
                <img
                    src={icon}
                    alt={`${label} icon`}
                    className="w-full h-full"
                />
            </CustomDiv>
        </CustomDiv>
    )
}