import express, { type Express, type Request, type Response, type NextFunction } from 'express'
import { Server, type Socket } from 'socket.io'
import session from 'express-session'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import http from 'http'
import dotenv from 'dotenv'
import colors from 'colors'

import customerRouter from './src/routes/customer.route'
import staffRouter from './src/routes/staff.route'
import orderRouter from './src/routes/order.route'
import menuItemRouter from './src/routes/menu_item.route'
import paymentRouter from './src/routes/payment.route'
import orderSocket from './src/sockets/order.socket'
import adminSocket from './src/sockets/admin.socket'
import { MenuItemModel } from './src/models/menu_item.model'
import { OrderModel } from './src/models/order.model'
import { OrderItemModel } from './src/models/order_item.model'
import { CustomerModel } from './src/models/customer.model'
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

app.use(express.static(`${process.env.PWD}/src/public`))

// Routes
app.get('/', (req: Request, res: Response) => {
  res.sendFile(`${PWD}/src/public/index.html`)
})

app.use('/api/v1/customer', customerRouter)
app.use('/api/v1/staff', staffRouter)
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/menu_item', menuItemRouter)
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

// Socket
const server = http.createServer(app)
const io: Server = new Server(server, {
  cors: {
    origin: '*',
    methods: '*'
  }
})

// Session middleware
const sessionMiddleware = session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new session.MemoryStore()
})

app.use(sessionMiddleware)

// Attach Socket.io middleware to capture session from handshake
io.use((socket: Socket, next) => {
  sessionMiddleware(socket.request as Request, {} as any, next as any)
})

io.on('connection', (socket: Socket): void => {
  const socketId: string = socket.id
  console.log(`New connection: ${socketId}`)

  const session = socket.request.httpVersion
  console.log(session)

  // Set session data
  // session.username = 'example'
  // session.save()

  const welcomeMessage: string = `
      Welcome to QuickOrder<br>
      <br>
      Select 1 to Place an order<br>
      Select 99 to checkout order<br>
      Select 98 to see order history<br>
      Select 97 to see current order<br>
      Select 0 to cancel order<br>
    `

  let menuMessage: string = ''
  let orderHistoryMessage: string = ''
  let currentOrderMessage: string = ''
  let currentOrderInfo: string = ''
  let orderHistory: any = []
  let currentOrder: any = {}
  let menuList: MenuItemModel[] = []
  let menuItems: string[] = []
  let orderToCancel: any = {}
  let previousOrders: string[] = []

  let customerId: number = 0
  const orderId: number = 0

  socket.on('id-customer', (customerId) => {
    if (customerId == null ?? customerId === undefined) {
      socket.emit('id-customer', 'What is your name?')

      socket.on('create-customer', async (name) => {
        const customer = await CustomerModel.create({ name })

        console.log(customer.id)

        socket.emit('store-customer', customer)
      })
    }
  })

  socket.emit('connected', welcomeMessage)

  socket.on('select-options', async (data) => {
    switch (data.option) {
      case 0:
        customerId = data.customerId

        orderToCancel = await OrderModel.findOne({
          where: { customerId },
          order: [['createdAt', 'DESC']]
        })

        if (orderToCancel == null) {
          socket.emit('cancel-order', 'Order not found')
          break
        }

        orderToCancel.status = 'canceled'

        await orderToCancel.save()

        console.log(orderToCancel)

        socket.emit('cancel-order', 'Your order has been cancelled')
        break

      case 1:
        menuList = await MenuItemModel.findAll({
          where: { deletedAt: null }
        })

        menuItems = menuList.map((item) => `${item.id} - ${item.name} - ₦${item.price}`)

        menuMessage = `
          These are the available menu items<br>
          Please select the items you would like to order<br>
          <br>
          ${menuItems.join('<br>')}
        `

        socket.emit('place-order', menuMessage)
        break

      case 97:
        customerId = data.customerId

        currentOrder = await OrderModel.findOne({
          where: { customerId },
          order: [['createdAt', 'DESC']]
        })

        if (currentOrder == null) {
          currentOrderMessage = 'You have made no order'
        }

        currentOrderInfo = `Order Id: ${currentOrder.id} - ${currentOrder.status} - ₦${currentOrder.totalPrice}`

        currentOrderMessage = `
          Here is your current order information:
          <br>
          <br>
          ${currentOrderInfo}
        `

        socket.emit('current-order', currentOrderMessage)
        break

      case 98:
        customerId = data.customerId

        try {
          orderHistory = await OrderModel.findAll({
            where: { customerId },
            include: [
              {
                model: OrderItemModel,
                as: 'orderItems',
                include: [
                  {
                    model: MenuItemModel,
                    as: 'menuItem',
                    attributes: ['id', 'name', 'price']
                  }
                ]
              }
            ],
            order: [['createdAt', 'DESC']]
          })

          if (orderHistory.length === 0) {
            orderHistoryMessage = 'You have made no order'
          }

          previousOrders = orderHistory.map((item: any
          ) => `Order Id: ${item.id} - ${item.status} - ₦${item.totalPrice}`)

          orderHistoryMessage = `
            Here is your order history:
            <br>
            <br>
            ${previousOrders.join('<br>')}
          `

          socket.emit('order-history', orderHistoryMessage)
        } catch (error) {
          console.error('Error fetching order history:', error)
          throw error
        }
        break

      case 99:
        void orderSocket(socket, data)
        break

      default:
        socket.emit('invalid-number', 'The number you entered is invalid')
        break
    }
  })

  // adminSocket(socket)

  // Handle disconnect
  socket.on('disconnect', (): void => {
    console.log(`Disconnected: ${socketId}`)
  })
})

server.listen(PORT, HOST, () => {
  console.log(colors.yellow.bold(`Server is running at http://${HOST}:${PORT}`))
})

module.exports = app
