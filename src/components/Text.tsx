import Styles from "../styles/sections"
import type { TextVariant } from "../scripts/types/text"
import type { Colors } from "../styles/colors"

interface TextProps {
    text: string
    variant?: TextVariant
    color?: Colors
}

export default function Text(
    { text, variant = 'default', color = 'black' }: TextProps
) {
    return (
        <p className={`${Styles.text(variant)} ${Styles.textColors(color)}`}>
            {text}
        </p>
    )
}
