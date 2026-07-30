//components
import CustomDiv from "./CustomDiv"
import Text from "./Text"
import Input from "./Input"

//styles
import Styles from "../styles/sections"

interface Props {
    label: string
    value: string
    onChange: (val: string) => void
    placeholder: string
}

export default function LabelledInput(
    { label, value, onChange, placeholder }: Props
) {
    return (
        <CustomDiv className={Styles.labelledInput()}>
            <Text text={label} variant='caption' color="green" />
            <Input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </CustomDiv>
    )
}
