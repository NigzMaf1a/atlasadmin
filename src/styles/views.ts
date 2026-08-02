interface AddSectorStyles {
    cont: string
    tray: string
}

export default class StylesForViews {
    static addSector(): AddSectorStyles {
        const border = 'border border-neutral-300 rounded-lg'
        const colors = 'bg-blue-500 text-white'

        return {
            cont: `w-full flex h-[30px] justify-end items-center px-4 mt-2`,
            tray: `${border} ${colors} hover:cursor-pointer w-[100px] h-full flex justify-center items-center`
        }
    }

    static menu(): string {
        const dim = 'w-[200px] px-1 pt-2 h-full z-50 border border-neutral-300 my-2 rounded'
        const flex = 'flex flex-col gap-1'

        return `${dim} ${flex}`
    }

    static menuItem() {
        const dim = 'w-full h-[50px] hover:cursor-pointer'
        const flex = 'flex flex-row gap-6 justify-center items-center'
        const borders = 'border border-neutral-300 rounded'

        const icon = 'w-[24px] h-[24px] border border-neutral-300 rounded-full'
        const iconFlex = 'flex justify-center items-center'

        return {
            cont: `${dim} ${flex} ${borders}`,
            icon: `${icon} ${iconFlex}`
        }
    }

    static menuLogo(): string {
        const dim = 'w-full h-[150px]'
        const borders = 'rounded'
        const flex = 'flex justify-center items-center'

        return `${dim} ${borders} ${flex}`
    }
}