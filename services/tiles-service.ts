import { io } from 'socket.io-client'
import {ScopedMutator} from 'swr/dist/types'
import {Dispatch, SetStateAction} from 'react';

type SocketInitializationProps = {
    updateTiles: ScopedMutator<any>
    setUser: Dispatch<SetStateAction<string>>
    setWhoMadeAChange: Dispatch<SetStateAction<string>>
}

export const initSocket = async ({updateTiles, setUser, setWhoMadeAChange}: SocketInitializationProps) => {
    await fetch('/api/updates')
    const socket = io()
    socket.on('color-propagated', (msg: string) => {
        console.log('browser:mutate')
        updateTiles('/api/tiles')
        setWhoMadeAChange(msg)
    })
    socket.on('connected', (msg: string) => {
        console.log(`browser:connect ${msg}`)
        setUser(msg)
    })
    return socket
}