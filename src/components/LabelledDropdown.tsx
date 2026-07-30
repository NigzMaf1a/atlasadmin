//components
import CustomDiv from "./CustomDiv"
import Text from "./Text"

//styles
import Styles from "../styles/sections"

interface Props {
    label: string
    value: string | number
    onChange: (val: string | number) => void
    values: DropDownValue[]
}

export interface DropDownValue {
    label: string
    value: string | number
}

export default function LabelledDropdown(
    { label, value, onChange, values }: Props
) {
    return (
        <CustomDiv className={Styles.labelledInput()}>
            <Text text={label} variant='caption' color="green" />
            <select
                className={Styles.dropdownStyles()}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option className={Styles.text('caption')} value="">Select a value below</option>
                {
                    values.map(v => <option className={Styles.text('caption')} value={v.value}>{v.label}</option>)
                }
            </select>
        </CustomDiv>
    )
}