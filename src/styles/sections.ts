import type { TextVariant } from "../scripts/types/text"
import type { Colors } from "./colors"

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

        return `${borders} ${pad}`
    }

    static textColors(color?: Colors) {
        switch (color) {
            case 'red':
                return `text-red-500`
            case 'green':
                return `text-green-500`
            case 'blue':
                return `text-blue-500`
            case 'yellow':
                return `text-yellow-500`
            case 'black':
            default:
                return `text-black-500`
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
}