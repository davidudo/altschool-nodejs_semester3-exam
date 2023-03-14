import express, { type Express, type Request, type Response, type NextFunction } from 'express'
import { Server, type Socket } from 'socket.io'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import http from 'http'
import dotenv from 'dotenv'

import customerRouter from './src/routes/customer.route'
import staffRouter from './src/routes/staff.route'
import orderRouter from './src/routes/order.route'
import paymentRouter from './src/routes/payment.route'
import orderSocket from './src/sockets/order.socket'
import { dbConnection } from './src/configs/db.config'

void dbConnection()

dotenv.config()

const PORT: number = parseInt(process.env.PORT ?? '8000')
const HOST: string = process.env.HOST ?? 'localhost'
process.env.PWD = process.cwd()
const PWD = process.env.PWD

const app: Express = express()

const corsOptions = { origin: '*' }
app.use(cors(corsOptions))

app.use(helmet())
app.disable('x-powered-by')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('tiny'))

// Routes
app.get('/', (req: Request, res: Response) => {
  res.sendFile(`${PWD}/src/public/index.html`)
})

app.use('/api/v1/customer', customerRouter)
app.use('/api/v1/staff', staffRouter)
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/payment', paymentRouter)

// Handle errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err)

  const errorStatus: number = err.status

  res.status(errorStatus ?? 500).json({
    error: err.message
  })
  next()
})

const server = http.createServer(app)
const io: Server = new Server(server, {
  cors: {
    origin: '*',
    methods: '*'
  }
})

// Sockets
io.on('connection', (socket: Socket): void => {
  const socketId: string = socket.id

  console.log(`New connection: ${socketId}`)

  socket.emit('connected', 'connected to backend server')

  orderSocket(socket)

  // Handle disconnect
  socket.on('disconnect', (): void => {
    console.log(`Disconnected: ${socketId}`)
  })
})

server.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`)
})
