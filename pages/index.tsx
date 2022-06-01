import type {NextPage} from 'next'
import styles from '../styles/Home.module.css'
import useSWR, { mutate } from 'swr'
import { MosaicTile } from '@prisma/client'
import Tile from '../components/tile'
import React, { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client/build/socket'
import Footer from '../components/footer'
import Header from '../components/header'
import { initSocket } from '../services/tiles-service'
import { fetcher, makeSetColor } from '../services/api-service'
import { TilesContext } from '../context/tiles-context'

const Home: NextPage = () => {
    const socketRef = useRef<Socket>()
    const [colorEvent, setColorEvent] = useState<number>(0)
    const [user, setUser] = useState<string>('')
    const [whoMadeAChange, setWhoMadeAChange] = useState<string>('')

    const {data, error} = useSWR<MosaicTile[]>('/api/tiles', fetcher, {
        revalidateOnFocus: false,
    })

    useEffect(() => {
        initSocket({ updateTiles: mutate, setUser, setWhoMadeAChange })
            .then(socket => socketRef.current = socket)
            .finally(() => console.log('browser:use-effect:socket-initialized'))

        return function cleanup() {
            socketRef.current?.disconnect()
        }
    }, [])

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.emit('color-event', user)
            console.log('browser:color-event:emitted')
        }
    }, [colorEvent])

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
        <div className={styles.container}>
            <Header/>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to the Mosaic Game, {user}
                </h1>
                <div className="monitor-changes">
                    {whoMadeAChange.length > 0 ? `${whoMadeAChange} has mada a change` : ''}
                </div>
                <div className={styles.tilescontainer}>
                    <TilesContext.Provider value={{
                        setColor: makeSetColor(data, mutate),
                        emitColorEvent: setColorEvent
                    }}>
                        {data.map((tile, index) => {
                            return (<Tile
                                key={index}
                                x={tile.x}
                                y={tile.y}
                                color={tile.color}
                                position={index + 1}
                            />)
                        })}
                    </TilesContext.Provider>
                </div>
            </main>

            <Footer/>
        </div>
    )
}

export default Home
