"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const express_session_1 = __importDefault(require("express-session"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const colors_1 = __importDefault(require("colors"));
const customer_route_1 = __importDefault(require("./src/routes/customer.route"));
const staff_route_1 = __importDefault(require("./src/routes/staff.route"));
const order_route_1 = __importDefault(require("./src/routes/order.route"));
const menu_item_route_1 = __importDefault(require("./src/routes/menu_item.route"));
const payment_route_1 = __importDefault(require("./src/routes/payment.route"));
const order_socket_1 = __importDefault(require("./src/sockets/order.socket"));
const menu_item_model_1 = require("./src/models/menu_item.model");
const order_model_1 = require("./src/models/order.model");
const order_item_model_1 = require("./src/models/order_item.model");
const customer_model_1 = require("./src/models/customer.model");
const db_config_1 = require("./src/configs/db.config");
void (0, db_config_1.dbConnection)();
dotenv_1.default.config();
const PORT = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : '8000');
const HOST = (_b = process.env.HOST) !== null && _b !== void 0 ? _b : 'localhost';
process.env.PWD = process.cwd();
const PWD = process.env.PWD;
const app = (0, express_1.default)();
const corsOptions = { origin: '*' };
app.use((0, cors_1.default)(corsOptions));
app.use((0, helmet_1.default)());
app.disable('x-powered-by');
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.static(`${process.env.PWD}/src/public`));
// Routes
app.get('/', (req, res) => {
    res.sendFile(`${PWD}/src/public/index.html`);
});
app.use('/api/v1/customer', customer_route_1.default);
app.use('/api/v1/staff', staff_route_1.default);
app.use('/api/v1/order', order_route_1.default);
app.use('/api/v1/menu_item', menu_item_route_1.default);
app.use('/api/v1/payment', payment_route_1.default);
// Handle errors
app.use((err, req, res, next) => {
    console.error(err);
    const errorStatus = err.status;
    res.status(errorStatus !== null && errorStatus !== void 0 ? errorStatus : 500).json({
        error: err.message
    });
    next();
});
// Socket
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: '*'
    }
});
// Session middleware
const sessionMiddleware = (0, express_session_1.default)({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new express_session_1.default.MemoryStore()
});
app.use(sessionMiddleware);
// Attach Socket.io middleware to capture session from handshake
io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
});
io.on('connection', (socket) => {
    const socketId = socket.id;
    console.log(`New connection: ${socketId}`);
    const session = socket.request.httpVersion;
    console.log(session);
    // Set session data
    // session.username = 'example'
    // session.save()
    const welcomeMessage = `
      Welcome to QuickOrder<br>
      <br>
      Select 1 to Place an order<br>
      Select 99 to checkout order<br>
      Select 98 to see order history<br>
      Select 97 to see current order<br>
      Select 0 to cancel order<br>
    `;
    let menuMessage = '';
    let orderHistoryMessage = '';
    let currentOrderMessage = '';
    let currentOrderInfo = '';
    let currentOrderId = '';
    let currentOrderStatus = '';
    let currentOrderTotalPrice = 0;
    let orderHistory = [];
    let currentOrder = {};
    let menuList = [];
    let menuItems = [];
    let orderToCancel = {};
    let previousOrders = [];
    let customerId = 0;
    socket.on('id-customer', (customerId) => {
        var _a;
        if ((_a = customerId == null) !== null && _a !== void 0 ? _a : customerId === undefined) {
            socket.emit('id-customer', 'What is your name?');
            socket.on('create-customer', (name) => __awaiter(void 0, void 0, void 0, function* () {
                const customer = yield customer_model_1.CustomerModel.create({ name });
                console.log(customer.id);
                socket.emit('store-customer', customer);
                socket.emit('connected', welcomeMessage);
            }));
        }
    });
    socket.emit('connected', welcomeMessage);
    socket.on('select-options', (data) => __awaiter(void 0, void 0, void 0, function* () {
        switch (data.option) {
            case 0:
                customerId = data.customerId;
                orderToCancel = yield order_model_1.OrderModel.findOne({
                    where: { customerId },
                    order: [['createdAt', 'DESC']]
                });
                if (orderToCancel == null) {
                    socket.emit('cancel-order', 'Order not found');
                    break;
                }
                orderToCancel.status = 'canceled';
                yield orderToCancel.save();
                socket.emit('cancel-order', 'Your order has been cancelled');
                break;
            case 1:
                menuList = yield menu_item_model_1.MenuItemModel.findAll({
                    where: { deletedAt: null }
                });
                menuItems = menuList.map((item) => `${item.id} - ${item.name} - ₦${item.price}`);
                menuMessage = `
          These are the available menu items<br>
          Please select the items you would like to order<br>
          <br>
          ${menuItems.join('<br>')}
          <br>
          <br>
          100 - Exit selection mode
        `;
                socket.emit('place-order', { menuMessage, menuList });
                break;
            case 97:
                customerId = data.customerId;
                currentOrder = yield order_model_1.OrderModel.findOne({
                    where: { customerId },
                    order: [['createdAt', 'DESC']]
                });
                if (currentOrder == null) {
                    currentOrderMessage = 'You have made no order';
                }
                currentOrderId = currentOrder.id;
                currentOrderStatus = currentOrder.status;
                currentOrderTotalPrice = currentOrder.totalPrice;
                currentOrderInfo = `Order Id: ${currentOrderId} - ${currentOrderStatus} - ₦${currentOrderTotalPrice}`;
                currentOrderMessage = `
          Here is your current order information:
          <br>
          <br>
          ${currentOrderInfo}
        `;
                socket.emit('current-order', currentOrderMessage);
                break;
            case 98:
                customerId = data.customerId;
                try {
                    orderHistory = yield order_model_1.OrderModel.findAll({
                        where: { customerId },
                        include: [
                            {
                                model: order_item_model_1.OrderItemModel,
                                as: 'orderItems',
                                include: [
                                    {
                                        model: menu_item_model_1.MenuItemModel,
                                        as: 'menuItem',
                                        attributes: ['id', 'name', 'price']
                                    }
                                ]
                            }
                        ],
                        order: [['createdAt', 'DESC']]
                    });
                    if (orderHistory.length === 0) {
                        orderHistoryMessage = 'You have made no order';
                    }
                    previousOrders = orderHistory.map((item) => `Order Id: ${item.id} - ${item.status} - ₦${item.totalPrice}`);
                    orderHistoryMessage = `
            Here is your order history:
            <br>
            <br>
            ${previousOrders.join('<br>')}
          `;
                    socket.emit('order-history', orderHistoryMessage);
                }
                catch (error) {
                    console.error('Error fetching order history:', error);
                    throw error;
                }
                break;
            case 99:
                if (data.orderData.order.orderItems.length === 0) {
                    socket.emit('order-status', 'You have not selected any item, select 1 to place an order');
                    break;
                }
                void (0, order_socket_1.default)(socket, data);
                break;
            default:
                socket.emit('invalid-number', 'The number you entered is invalid');
                break;
        }
    }));
    // adminSocket(socket)
    // Handle disconnect
    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socketId}`);
    });
});
server.listen(PORT, HOST, () => {
    console.log(colors_1.default.yellow.bold(`Server is running at http://${HOST}:${PORT}`));
});
module.exports = app;
