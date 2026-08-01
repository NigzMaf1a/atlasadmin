import React, { useEffect, useState } from "react"

//components
import CustomDiv from "./CustomDiv"
import Text from "./Text"

//styles
import Styles from "../styles/sections"

//types
import type { Colors } from "../styles/colors"

interface Props {
    children: React.ReactNode
    className?: string
    show?: boolean
    color?: Colors
    title?: string
    title_bg_color?: Colors
}

export default function Tray(
    {
        children,
        className = '',
        show = true,
        color = 'white',
        title = '',
        title_bg_color = 'white'
    }: Props
) {
    const [showTitle, setShowTitle] = useState<boolean>(false)

    useEffect(() => {
        // Don't create timers if there is no title
        if (!title.trim()) {
            setShowTitle(false)
            return
        }

        let hideTimeout: ReturnType<typeof setTimeout>

        const displayTitle = () => {
            setShowTitle(true)

            // Hide title after 3 seconds
            hideTimeout = setTimeout(() => {
                setShowTitle(false)
            }, 10000)
        }

        // Display immediately when the component mounts
        displayTitle()

        // Display every 3 minutes
        const interval = setInterval(() => {
            displayTitle()
        }, 3 * 60 * 1000)

        return () => {
            clearInterval(interval)
            clearTimeout(hideTimeout)
        }
    }, [title])

    return (
        <CustomDiv
            className={`${Styles.tray(color)} ${className}`}
            show={show}
        >
            {
                showTitle && title && (
                    <CustomDiv
                        className={(() => {
                            const defaults = 'rounded-lg w-full flex justify-center items-center'
                            let bg

                            switch (title_bg_color) {
                                case 'black':
                                    bg = 'bg-black'
                                    break
                                case 'blue':
                                    bg = 'bg-blue-500'
                                    break
                                case 'green':
                                    bg = 'bg-green-500'
                                    break
                                case 'red':
                                    bg = 'bg-red-500'
                                    break
                                case 'yellow':
                                    bg = 'bg-yellow-500'
                                    break
                                case 'white':
                                default:
                                    bg = 'bg-white'
                            }

                            return `${defaults} ${bg}`
                        })()}
                    >
                        <Text
                            text={title}
                            color={
                                title_bg_color === 'black' ? 'white' :
                                    title_bg_color === 'blue' ? 'white' :
                                        title_bg_color === 'green' ? 'white' :
                                            title_bg_color === 'red' ? 'white' :
                                                title_bg_color === 'yellow' ? 'black' :
                                                    'white'
                            }
                        />
                    </CustomDiv>
                )
            }

            {children}
        </CustomDiv>
    )
}
