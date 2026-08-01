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
}