export type LogVariant = 'success' | 'error' | 'warn'

export default function logger(
    message: string,
    variant?: LogVariant
) {
    switch (variant) {
        case 'warn':
            console.warn(message)
            break
        case 'error':
            console.error(message)
            break
        case 'success':
        default:
            console.log(message)
    }
}
