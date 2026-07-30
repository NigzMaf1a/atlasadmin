import React from "react";

interface Styles {
    container: string;
    colors: string;
    content: string;
    search: string;
    searchInput: string;
}

interface PageProps {
    children: React.ReactNode
    showSearch?: boolean
    value?: string | number
    setValue?: (val: string | number) => void
    searchPlaceholder?: string
    className?: string
    moreSearchStyles?: string
}

function styles(): Styles {
    return {
        container: "w-screen h-screen overflow-hidden flex flex-col",
        colors: "bg-white",

        // Scrollable page content
        content: "flex-1 flex overflow-y-auto",

        // Sticky search bar
        search:
            "sticky top-0 left-0 w-full h-[80px] bg-white flex items-center px-6 shadow-sm z-10",

        // Search input
        searchInput:
            "w-full h-12 rounded-lg border border-gray-300 px-4 outline-none focus:ring-2 focus:ring-blue-500",
    };
}

export default function Page({
    children,
    showSearch = false,
    value = "",
    setValue,
    searchPlaceholder = "Search...",
    className = '',
    moreSearchStyles = ''
}: PageProps) {
    const stylez = styles()

    return (
        <div className={`${stylez.container} ${stylez.colors}`}>
            {showSearch && (
                <div className={`${stylez.search} ${moreSearchStyles}`}>
                    <input
                        className={stylez.searchInput}
                        type="text"
                        value={value}
                        placeholder={searchPlaceholder}
                        onChange={(e) => setValue?.(e.target.value)}
                    />
                </div>
            )}

            <div className={`${stylez.content} ${className}`}>
                {children}
            </div>
        </div>
    )
}