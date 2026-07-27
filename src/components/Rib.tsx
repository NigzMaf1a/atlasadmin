interface RibProps {
    children: React.ReactNode
    className?: string
}

export default function Rib(
    { children, className = '' }: RibProps
) {
    const styles = {
        container: `w-full flex flex-row ${className}`
    }

    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}
