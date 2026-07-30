//components
import Text from "./Text"
import CustomDiv from "./CustomDiv"

import StylesTwo from "../styles/components"

interface Props {
    label: string
    text: string
}

export default function LabelledText({ label, text }: Props) {
    return (
        <CustomDiv className={StylesTwo.labelledText().container}>
            <Text text={`${label}:`} variant="caption" color="green" />
            <Text text={text} />
        </CustomDiv>
    )
}
