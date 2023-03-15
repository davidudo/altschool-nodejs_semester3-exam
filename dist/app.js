"use strict";
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
const customer_route_1 = __importDefault(require("./src/routes/customer.route"));
const staff_route_1 = __importDefault(require("./src/routes/staff.route"));
const order_route_1 = __importDefault(require("./src/routes/order.route"));
const payment_route_1 = __importDefault(require("./src/routes/payment.route"));
const order_socket_1 = __importDefault(require("./src/sockets/order.socket"));
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
// Routes
app.get('/', (req, res) => {
    res.sendFile(`${PWD}/src/public/index.html`);
});
app.use('/api/v1/customer', customer_route_1.default);
app.use('/api/v1/staff', staff_route_1.default);
app.use('/api/v1/order', order_route_1.default);
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
    socket.emit('connected', 'connected to backend server');
    (0, order_socket_1.default)(socket);
    // Handle disconnect
    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socketId}`);
    });
});
server.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
});
