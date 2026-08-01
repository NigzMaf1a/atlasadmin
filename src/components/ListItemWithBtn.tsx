//components
import CustomDiv from "./CustomDiv"
import ButtonAdv from "./ButtonAdv"
import LabelledText from "./LabelledText"

//styles
import Styles from "../styles/sections"

interface Props {
    label_one: string
    label_two: string
    text_one: string
    text_two: string
    btn_label: string
    onClick: () => Promise<void> | void
    btn_type?: `primary` | `secondary`
    btn_color?: 'success' | 'warn' | 'info' | 'danger'
}

export default function ListItemWithBtn(
    {
        label_one, label_two,
        text_one, text_two,
        btn_label, onClick,
        btn_type = 'primary',
        btn_color = 'info'
    }: Props
) {
    return (
        <CustomDiv className={Styles.listItem().cont}>
            <CustomDiv className={Styles.listItem().left}>
                <LabelledText
                    label={label_one}
                    text={text_one}
                />

                <LabelledText
                    label={label_two}
                    text={text_two}
                />
            </CustomDiv>
            <CustomDiv className={Styles.listItem().right}>
                <ButtonAdv
                    label={btn_label}
                    onClick={onClick}
                    size="sm"
                    btn_type={btn_type}
                    color={btn_color}
                />
            </CustomDiv>
        </CustomDiv>
    )
}
