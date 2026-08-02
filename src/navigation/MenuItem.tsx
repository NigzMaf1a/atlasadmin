import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

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
    const [hovered, setHovered] = useState<boolean>(false)
    const [styles, setStyles] = useState<string>('')
    const navigate = useNavigate()

    useEffect(() => {
        const s = hovered ? 'bg-blue-800' : 'bg-white'

        setStyles(s)
    }, [hovered])

    return (
        <CustomDiv
            className={`${StylesForViews.menuItem().cont} ${styles}`}
            onClick={() => navigate(route)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >

            <CustomDiv className={StylesForViews.menuItem().icon}>
                <img
                    src={icon}
                    alt={`${label} icon`}
                    className="w-full h-full"
                />
            </CustomDiv>

            <Text
                text={label}
                color={hovered ? 'white' : 'blue'}
            />
        </CustomDiv>
    )
}