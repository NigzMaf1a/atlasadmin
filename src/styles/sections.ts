import type { TextVariant } from "../scripts/types/text"
import type { Colors } from "./colors"

interface ListItemStyles {
    cont: string
    right: string
    left: string
}

export default class Styles {
    static form(): string {
        const pad = "px-4 py-4"
        const qual = "bg-white flex flex-col gap-2"
        const quan = "w-[350px] h-[400px] rounded border border-neutral-300 shadow"

        return `${pad} ${qual} ${quan}`
    }

    static formFooter(): string {
        const qual = "bg-white mt-auto mx-auto"
        const quan = "w-full flex justify-between items-center"
        const padding = "px-[50px] py-[10px]"

        return `${qual} ${quan} ${padding}`
    }

    static centered(): string {
        const flex = 'flex flex-col justify-center items-center'

        return `${flex}`
    }

    static text(variant: TextVariant = "default"): string {
        switch (variant) {
            case "caption":
                return `
                text-xs
                font-normal
                leading-4
                text-gray-500
            `

            case "head":
                return `
                text-3xl
                font-bold
                leading-tight
                tracking-tight
                text-gray-900
            `

            case "default":
            default:
                return `
                text-sm
                font-normal
                leading-6
                text-gray-700
            `
        }
    }

    static input(): string {
        return `
        w-full
        h-12
        px-4
        py-2
        rounded-lg
        border
        border-gray-300
        bg-white
        text-sm
        text-gray-900
        placeholder:text-gray-400
        outline-none
        transition-all
        duration-200
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-500/20
        disabled:bg-gray-100
        disabled:text-gray-500
        disabled:cursor-not-allowed
    `
    }

    static labelledInput(): string {
        const borders = "rounded border border-neutral-300 shadow"
        const pad = "px-2 py-4"
        const flex = "flex flex-col gap-2"

        return `${borders} ${pad} ${flex}`
    }

    static textColors(color?: Colors) {
        switch (color) {
            case 'red':
                return `text-red-800`
            case 'green':
                return `text-green-500`
            case 'blue':
                return `text-blue-500`
            case 'yellow':
                return `text-yellow-800`
            case 'white':
                return `text-white`
            case 'black':
            default:
                return `text-black`
        }
    }

    static noDataItemDivStyles(): string {
        const cont = 'w-full h-[30px]'
        const border = 'border border-neutral-300 rounded-lg'
        const flex = 'flex flex-col justify-center items-center'

        return `${cont} ${border} ${flex}`
    }

    static itemsContainerInaForm(): string {
        return `flex flex-col overflow-y-scroll gap-2`
    }

    static dropdownStyles(): string {
        const dim = 'w-full h-[50px]'

        return `${dim}`
    }

    static listItem(): ListItemStyles {
        //cont
        const dim = 'w-full h-[100px]'
        const flex = 'flex flex-row justify-between items-center'
        const border = 'border border-neutral-300 bg-white rounded-lg'

        //right
        const left = 'flex flex-col gap-3 pl-3'

        //left
        const right = 'flex flex-col justify-center items-center pr-2'

        return {
            cont: `${dim} ${flex} ${border}`,
            right: `${right}`,
            left: `${left}`
        }
    }

    static tray(color?: Colors): string {
        let bg: string

        switch (color) {
            case 'black':
                bg = 'bg-black'
                break
            case 'blue':
                bg = 'bg-blue-500'
                break
            case 'red':
                bg = 'bg-red-500'
                break
            case 'yellow':
                bg = 'bg-yellow-500'
                break
            case 'white':
                bg = 'bg-white'
                break
            case 'green':
            default:
                bg = 'bg-green-500'
        }

        const dim = 'w-full max-h-[300px] overflow-y-auto'
        const flex = 'flex flex-col items-center gap-1'
        const margin = 'mt-2 py-2 px-2'

        return `${bg} ${dim} ${flex} ${margin}`
    }
}