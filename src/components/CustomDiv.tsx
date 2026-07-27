interface RibProps {
    children: React.ReactNode
    className?: string
}

export default function CustomDiv(
    { children, className = '' }: RibProps
) {
    const styles = {
        container: `${className}`
    }

    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}
