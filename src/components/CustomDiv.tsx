interface RibProps {
    children: React.ReactNode
    className?: string
    show?: boolean
    onClick?: () => void
    onMouseEnter?: () => Promise<void> | void
    onMouseLeave?: () => Promise<void> | void
    onMouseMove?: () => Promise<void> | void
}

export default function CustomDiv(
    { children, className = '', show = true, onClick, onMouseEnter, onMouseLeave, onMouseMove }: RibProps
) {
    const styles = {
        container: `${className}`
    }

    return (
        <>
            {
                show && <div
                    className={styles.container}
                    onClick={() => {
                        onClick && onClick()
                    }}
                    onMouseEnter={() => {
                        onMouseEnter && onMouseEnter()
                    }}
                    onMouseLeave={() => {
                        onMouseLeave && onMouseLeave()
                    }}
                    onMouseMove={() => {
                        onMouseMove && onMouseMove()
                    }}
                >
                    {children}
                </div>
            }
        </>
    )
}
