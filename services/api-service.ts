import {MosaicTile} from '@prisma/client'
import React from 'react'

type TileRefresher = (key: string) => void

const findTile = (data: MosaicTile[], coordinates: [x: number, y: number]): MosaicTile | undefined => {
    const [x, y] = coordinates
    return data.find((tile: MosaicTile) => tile.x === x && tile.y === y)
}

const extractColorFromEvent = (ev: React.MouseEvent<HTMLDivElement>): string | undefined => {
    const { currentTarget: { dataset: { color }}} = ev
    return color || undefined
}

export const fetcher: (url: RequestInfo, options: {}) => Promise<any> = (url, options) =>
    fetch(url, options)
        .then(r => r.json())

export const makeSetColor = (data: MosaicTile[], refreshTiles: TileRefresher) => async (ev: React.MouseEvent<HTMLDivElement>, x: number, y: number): Promise<void> => {
    const [tile, color] = [findTile(data, [x, y]), extractColorFromEvent(ev)]
    if (tile && color) {
        await fetcher('/api/tiles', {
            method: 'POST',
            body: JSON.stringify({ ...tile, color }),
        })
        await refreshTiles('/api/tiles')
    }
}