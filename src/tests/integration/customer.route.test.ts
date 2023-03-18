import app from '../../app'
import request from 'supertest'
import { expect } from 'chai'
import { connection } from '../src/db.config'
import { CustomerModel } from '../models/customer.model'

describe('CRUD operations for CustomerModel', () => {
  before(async () => {
    // Connect to the database before running the tests
    await connection.sync({ force: true })
  });
  
  afterEach(async () => {
    await connection.truncate()
  })

  after(async () => {
    // Disconnect from the database after running the tests
    await connection.close()
  });

  describe('POST /customer', () => {
    it('should create a new customer', async () => {
      const Customer = { name: 'John Doe', email: 'johndoe@example.com' }
      
      const res = await request(app).post('/customer').send(Customer)
      
      expect(res.status).to.equal(201)
      expect(res.body.name).to.equal(Customer.name)
      expect(res.body.email).to.equal(Customer.email)
    });
  });
  
  describe("GET /customer", () => {
    it("should get all Customers", async () => {
      await CustomerModel.bulkCreate([
        {
          name: "John Doe",
          email: "john.doe@example.com",
        },
        {
          name: "Jane Doe",
          email: "jane.doe@example.com",
        },
      ])
      const res = await request(app).get("/customer")
      expect(res.statusCode).to.equal(200)
      expect(res.body.length).to.equal(2)
      expect(res.body[0].name).to.equal("John Doe")
      expect(res.body[1].name).to.equal("Jane Doe")
    })
  })

  describe('GET /customer/:id', () => {
    let Customer: CustomerModel

    before(async () => {
      // Create a Customer before running the test
      Customer = await CustomerModel.create({ name: 'John Doe', email: 'johndoe@example.com' })
    })

    it('should get a Customer by id', async () => {
      const res = await request(app).get(`/customer/${Customer.id}`)
      expect(res.status).to.equal(200)
      expect(res.body.name).to.equal(Customer.name)
      expect(res.body.email).to.equal(Customer.email)
    })
  })

  describe('PUT /customer/:id', () => {
    let Customer: CustomerModel

    before(async () => {
      // Create a Customer before running the test
      Customer = await CustomerModel.create({ name: 'John Doe', email: 'johndoe@example.com' })
    })

    it('should update a customer by id', async () => {
      const updatedCustomerModel = { name: 'Jane Doe', email: 'janedoe@example.com' }
      const res = await request(app)
        .put(`/customer/${Customer.id}`)
        .send({ name: "Jane Doe" })
      expect(res.statusCode).to.equal(200)
      expect(res.body.name).to.equal(updatedCustomerModel.name)
      expect(res.body.email).to.equal(updatedCustomerModel.email)
    })
  })
})
