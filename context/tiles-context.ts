import React, { createContext, Dispatch, SetStateAction } from 'react'

type TileContextProps = {
    setColor: (ev: React.MouseEvent<HTMLDivElement>, x: number, y: number) => Promise<void>
    emitColorEvent: Dispatch<SetStateAction<number>>
}

export const TilesContext = createContext<TileContextProps>({
    setColor: (ev: React.MouseEvent<HTMLDivElement>, x: number, y: number) => Promise.resolve(),
    emitColorEvent: () => undefined
})