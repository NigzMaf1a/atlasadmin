import Styles from "../styles/sections";

interface InputProps {
    value: string;
    onChange: (val: string) => void;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    name?: string;
    disabled?: boolean;
}

export default function Input({
    value,
    onChange,
    type = "text",
    placeholder = "",
    name,
    disabled = false,
}: InputProps) {
    return (
        <input
            className={Styles.input()}
            type={type}
            value={value}
            placeholder={placeholder}
            name={name}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}