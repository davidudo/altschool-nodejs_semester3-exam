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
const customer_model_1 = require("../models/customer.model");
describe('CRUD operations for CustomerModel', () => {
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
    describe('POST /customer', () => {
        it('should create a new customer', () => __awaiter(void 0, void 0, void 0, function* () {
            const Customer = { name: 'John Doe', email: 'johndoe@example.com' };
            const res = yield (0, supertest_1.default)(app_1.default).post('/customer').send(Customer);
            (0, chai_1.expect)(res.status).to.equal(201);
            (0, chai_1.expect)(res.body.name).to.equal(Customer.name);
            (0, chai_1.expect)(res.body.email).to.equal(Customer.email);
        }));
    });
    describe("GET /customer", () => {
        it("should get all Customers", () => __awaiter(void 0, void 0, void 0, function* () {
            yield customer_model_1.CustomerModel.bulkCreate([
                {
                    name: "John Doe",
                    email: "john.doe@example.com",
                },
                {
                    name: "Jane Doe",
                    email: "jane.doe@example.com",
                },
            ]);
            const res = yield (0, supertest_1.default)(app_1.default).get("/customer");
            (0, chai_1.expect)(res.statusCode).to.equal(200);
            (0, chai_1.expect)(res.body.length).to.equal(2);
            (0, chai_1.expect)(res.body[0].name).to.equal("John Doe");
            (0, chai_1.expect)(res.body[1].name).to.equal("Jane Doe");
        }));
    });
    describe('GET /customer/:id', () => {
        let Customer;
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            // Create a Customer before running the test
            Customer = yield customer_model_1.CustomerModel.create({ name: 'John Doe', email: 'johndoe@example.com' });
        }));
        it('should get a Customer by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default).get(`/customer/${Customer.id}`);
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body.name).to.equal(Customer.name);
            (0, chai_1.expect)(res.body.email).to.equal(Customer.email);
        }));
    });
    describe('PUT /customer/:id', () => {
        let Customer;
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            // Create a Customer before running the test
            Customer = yield customer_model_1.CustomerModel.create({ name: 'John Doe', email: 'johndoe@example.com' });
        }));
        it('should update a customer by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedCustomerModel = { name: 'Jane Doe', email: 'janedoe@example.com' };
            const res = yield (0, supertest_1.default)(app_1.default)
                .put(`/customer/${Customer.id}`)
                .send({ name: "Jane Doe" });
            (0, chai_1.expect)(res.statusCode).to.equal(200);
            (0, chai_1.expect)(res.body.name).to.equal(updatedCustomerModel.name);
            (0, chai_1.expect)(res.body.email).to.equal(updatedCustomerModel.email);
        }));
    });
});
