export default class GridStyles {
    static container(): string {
        const dim = 'w-full grid grid-cols-2 px-2 py-2'

        return `${dim}`
    }

    static segment(): string {
        const dim = 'w-[50%] h-full'
        const borders = 'border border-neutral-300 rounded-sm'

        return `${dim} ${borders}`
    }

    static item() {
        const text = 'text-sm'

        return {
            cont: `w-[300px] h-[50px] border border-neutral-300 rounded-sm`,
            row: `flex flex-row h-[40px] justify-center items-center`,
            label: `${text}`,
            colon: `${text}`,
            value: `${text}`
        }
    }
}