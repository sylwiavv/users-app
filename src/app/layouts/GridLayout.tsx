import { ReactNode } from "react"

export const GridLayout = ({children}: {children: ReactNode}) => {
    return (
    <div className="grid-layout">
        {children}
    </div>
    )
}