interface BtnProps {
    onClick: () => Promise<void> | void
    label: string
    isClicked?: boolean
    clickLabel?: string
    setIsClicked?: (bool: boolean) => void
    className?: string
    btn_type?: `primary` | `secondary`
    color?: 'success' | 'warn' | 'info' | 'danger'
    size?: 'sm' | 'lg'
}

export default function ButtonAdv(
    {
        onClick,
        label,
        isClicked = false,
        clickLabel = 'Wait...',
        setIsClicked,
        className = '',
        btn_type = 'primary',
        color = 'info',
        size = 'sm'
    }: BtnProps
) {
    function getBtnType(): string {
        switch (btn_type) {
            case 'primary':
                switch (color) {
                    case 'danger':
                        return 'bg-red-500 text-white border-none'
                    case 'success':
                        return 'bg-green-500 text-white border-none'
                    case 'warn':
                        return 'bg-yellow-500 text-dark border-none'
                    case 'info':
                    default:
                        return 'bg-blue-500 text-white border-none'
                }
            case "secondary":
            default:
                switch (color) {
                    case 'danger':
                        return 'border border-red-400 text-red-400'
                    case 'success':
                        return 'border border-green-400 text-green-400'
                    case 'warn':
                        return 'border border-yellow-400 text-yellow-400'
                    case 'info':
                    default:
                        return 'border border-blue-400 text-blue-400'
                }
        }
    }

    function defaults(): string {
        const dimensions = size === 'sm' ? 'w-[90px]' : 'w-full'
        const margins = 'rounded'

        return `${dimensions} ${margins} hover:cursor-pointer`
    }

    function buttonClicked(): string {
        const colors = 'bg-blue-400 border-none text-white'

        return `${defaults()} ${getBtnType()} ${colors}`
    }
    function buttonNotClicked(): string {

        return `${defaults()} ${getBtnType()} ${className}`
    }

    const styles = {
        clickedTrue: buttonClicked(),
        clickedFalse: buttonNotClicked()
    }
    return (
        <button
            onClick={async () => {
                setIsClicked?.(true)
                await onClick()
            }}
            className={isClicked ? styles.clickedTrue : styles.clickedFalse}
        >
            {isClicked ? clickLabel : label}
        </button>
    )
}
