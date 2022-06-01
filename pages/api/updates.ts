import { IncomingMessage, ServerResponse } from 'http'
import { Server } from 'socket.io'
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

const config: Config = {
    dictionaries: [names]
}

const SocketHandler = (req: IncomingMessage, res: ServerResponse) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', socket => {
            const name = uniqueNamesGenerator(config)
            socket.emit('connected', name)
            console.log(`${name} has connected`)
            socket.on('color-event', (msg: string) => {
                socket.broadcast.emit('color-propagated', msg)
            })
        })
    }
    res.end()
}

export default SocketHandler