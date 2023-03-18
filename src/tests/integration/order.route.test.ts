/* import app from '../../app'
import request from 'supertest'
import { expect } from 'chai'
import { connection } from '../src/db.config'
import { OrderModel } from '../models/order.model'

describe('CRUD operations for OrderModel', () => {
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

  describe('POST /order', () => {
    it('should create a new order', async () => {
      const Order = { name: 'John Doe', email: 'johndoe@example.com' }

      const res = await request(app).post('/order').send(Order)

      expect(res.status).to.equal(201)
      expect(res.body.name).to.equal(Order.name)
      expect(res.body.email).to.equal(Order.email)
    });
  });

  describe("GET /order", () => {
    it("should get all Orders", async () => {
      await OrderModel.bulkCreate([
        {
          name: "John Doe",
          email: "john.doe@example.com",
        },
        {
          name: "Jane Doe",
          email: "jane.doe@example.com",
        },
      ])
      const res = await request(app).get("/order")
      expect(res.statusCode).to.equal(200)
      expect(res.body.length).to.equal(2)
      expect(res.body[0].name).to.equal("John Doe")
      expect(res.body[1].name).to.equal("Jane Doe")
    })
  })

  describe('GET /order/:id', () => {
    let Order: OrderModel

    before(async () => {
      // Create a Order before running the test
      Order = await OrderModel.create({ name: 'John Doe', email: 'johndoe@example.com' })
    })

    it('should get a Order by id', async () => {
      const res = await request(app).get(`/order/${Order.id}`)
      expect(res.status).to.equal(200)
      expect(res.body.name).to.equal(Order.name)
      expect(res.body.email).to.equal(Order.email)
    })
  })

  describe('PUT /order/:id', () => {
    let Order: OrderModel

    before(async () => {
      // Create a Order before running the test
      Order = await OrderModel.create({ name: 'John Doe', email: 'johndoe@example.com' })
    })

    it('should update a order by id', async () => {
      const updatedOrderModel = { name: 'Jane Doe', email: 'janedoe@example.com' }
      const res = await request(app)
        .put(`/order/${Order.id}`)
        .send({ name: "Jane Doe" })
      expect(res.statusCode).to.equal(200)
      expect(res.body.name).to.equal(updatedOrderModel.name)
      expect(res.body.email).to.equal(updatedOrderModel.email)
    })
  })
})
*/
