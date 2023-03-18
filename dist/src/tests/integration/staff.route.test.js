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
const staff_model_1 = require("../models/staff.model");
describe('CRUD operations for StaffModel', () => {
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
    describe('POST /staff', () => {
        it('should create a new staff', () => __awaiter(void 0, void 0, void 0, function* () {
            const Staff = { name: 'John Doe', email: 'johndoe@example.com' };
            const res = yield (0, supertest_1.default)(app_1.default).post('/staff').send(Staff);
            (0, chai_1.expect)(res.status).to.equal(201);
            (0, chai_1.expect)(res.body.name).to.equal(Staff.name);
            (0, chai_1.expect)(res.body.email).to.equal(Staff.email);
        }));
    });
    describe("GET /staff", () => {
        it("should get all Staffs", () => __awaiter(void 0, void 0, void 0, function* () {
            yield staff_model_1.StaffModel.bulkCreate([
                {
                    name: "John Doe",
                    email: "john.doe@example.com",
                },
                {
                    name: "Jane Doe",
                    email: "jane.doe@example.com",
                },
            ]);
            const res = yield (0, supertest_1.default)(app_1.default).get("/staff");
            (0, chai_1.expect)(res.statusCode).to.equal(200);
            (0, chai_1.expect)(res.body.length).to.equal(2);
            (0, chai_1.expect)(res.body[0].name).to.equal("John Doe");
            (0, chai_1.expect)(res.body[1].name).to.equal("Jane Doe");
        }));
    });
    describe('GET /staff/:id', () => {
        let Staff;
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            // Create a Staff before running the test
            Staff = yield staff_model_1.StaffModel.create({ name: 'John Doe', email: 'johndoe@example.com' });
        }));
        it('should get a Staff by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default).get(`/staff/${Staff.id}`);
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body.name).to.equal(Staff.name);
            (0, chai_1.expect)(res.body.email).to.equal(Staff.email);
        }));
    });
    describe('PUT /staff/:id', () => {
        let Staff;
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            // Create a Staff before running the test
            Staff = yield staff_model_1.StaffModel.create({ name: 'John Doe', email: 'johndoe@example.com' });
        }));
        it('should update a staff by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedStaffModel = { name: 'Jane Doe', email: 'janedoe@example.com' };
            const res = yield (0, supertest_1.default)(app_1.default)
                .put(`/staff/${Staff.id}`)
                .send({ name: "Jane Doe" });
            (0, chai_1.expect)(res.statusCode).to.equal(200);
            (0, chai_1.expect)(res.body.name).to.equal(updatedStaffModel.name);
            (0, chai_1.expect)(res.body.email).to.equal(updatedStaffModel.email);
        }));
    });
});
