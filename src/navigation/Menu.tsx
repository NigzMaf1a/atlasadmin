//components
import CustomDiv from "../components/CustomDiv"
import MenuItem from "./MenuItem"
import MenuLogo from "./MenuLogo"


//styles
import StylesForViews from "../styles/views"

export default function Menu() {
    return (
        <CustomDiv className={StylesForViews.menu()}>
            <MenuLogo />
            <MenuItem label="Home" icon="./favicon.svg" route="/" />
            <MenuItem label="Sectors" icon="./favicon.svg" route="/sectors" />
            <MenuItem label="Roles" icon="./favicon.svg" route="/roles" />
            <MenuItem label="About" icon="./favicon.svg" route="/about" />
            <MenuItem label="Contacts" icon="./favicon.svg" route="/contacts" />
            <MenuItem label="Logout" icon="./favicon.svg" route="/logout" />
        </CustomDiv>
    )
}
