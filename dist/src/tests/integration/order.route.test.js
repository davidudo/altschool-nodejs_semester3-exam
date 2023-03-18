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
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const db_config_1 = require("../src/db.config");
const order_model_1 = require("../models/order.model");
describe('CRUD operations for OrderModel', () => {
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        // Connect to the database before running the tests
        yield db_config_1.connection.sync({ force: true });
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_config_1.connection.truncate();
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        // Disconnect from the database after running the tests
        yield db_config_1.connection.close();
    }));
    describe('POST /order', () => {
        it('should create a new order', () => __awaiter(void 0, void 0, void 0, function* () {
            const Order = { name: 'John Doe', email: 'johndoe@example.com' };
            const res = yield (0, supertest_1.default)(app_1.default).post('/order').send(Order);
            (0, chai_1.expect)(res.status).to.equal(201);
            (0, chai_1.expect)(res.body.name).to.equal(Order.name);
            (0, chai_1.expect)(res.body.email).to.equal(Order.email);
        }));
    });
    describe("GET /order", () => {
        it("should get all Orders", () => __awaiter(void 0, void 0, void 0, function* () {
            yield order_model_1.OrderModel.bulkCreate([
                {
                    name: "John Doe",
                    email: "john.doe@example.com",
                },
                {
                    name: "Jane Doe",
                    email: "jane.doe@example.com",
                },
            ]);
            const res = yield (0, supertest_1.default)(app_1.default).get("/order");
            (0, chai_1.expect)(res.statusCode).to.equal(200);
            (0, chai_1.expect)(res.body.length).to.equal(2);
            (0, chai_1.expect)(res.body[0].name).to.equal("John Doe");
            (0, chai_1.expect)(res.body[1].name).to.equal("Jane Doe");
        }));
    });
    describe('GET /order/:id', () => {
        let Order;
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            // Create a Order before running the test
            Order = yield order_model_1.OrderModel.create({ name: 'John Doe', email: 'johndoe@example.com' });
        }));
        it('should get a Order by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default).get(`/order/${Order.id}`);
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body.name).to.equal(Order.name);
            (0, chai_1.expect)(res.body.email).to.equal(Order.email);
        }));
    });
    describe('PUT /order/:id', () => {
        let Order;
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            // Create a Order before running the test
            Order = yield order_model_1.OrderModel.create({ name: 'John Doe', email: 'johndoe@example.com' });
        }));
        it('should update a order by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedOrderModel = { name: 'Jane Doe', email: 'janedoe@example.com' };
            const res = yield (0, supertest_1.default)(app_1.default)
                .put(`/order/${Order.id}`)
                .send({ name: "Jane Doe" });
            (0, chai_1.expect)(res.statusCode).to.equal(200);
            (0, chai_1.expect)(res.body.name).to.equal(updatedOrderModel.name);
            (0, chai_1.expect)(res.body.email).to.equal(updatedOrderModel.email);
        }));
    });
});
