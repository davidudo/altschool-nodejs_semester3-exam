"use strict";
/* import app from '../../app'
import request from 'supertest'
import { expect } from 'chai'
import { connection } from '../src/db.config'
import { PaymentModel } from '../models/payment.model'

describe('CRUD operations for PaymentModel', () => {
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

  describe('POST /payment', () => {
    it('should create a new payment', async () => {
      const Payment = { name: 'John Doe', email: 'johndoe@example.com' }

      const res = await request(app).post('/payment').send(Payment)

      expect(res.status).to.equal(201)
      expect(res.body.name).to.equal(Payment.name)
      expect(res.body.email).to.equal(Payment.email)
    });
  });

  describe("GET /payment", () => {
    it("should get all Payments", async () => {
      await PaymentModel.bulkCreate([
        {
          name: "John Doe",
          email: "john.doe@example.com",
        },
        {
          name: "Jane Doe",
          email: "jane.doe@example.com",
        },
      ])
      const res = await request(app).get("/payment")
      expect(res.statusCode).to.equal(200)
      expect(res.body.length).to.equal(2)
      expect(res.body[0].name).to.equal("John Doe")
      expect(res.body[1].name).to.equal("Jane Doe")
    })
  })

  describe('GET /payment/:id', () => {
    let Payment: PaymentModel

    before(async () => {
      // Create a Payment before running the test
      Payment = await PaymentModel.create({ name: 'John Doe', email: 'johndoe@example.com' })
    })

    it('should get a Payment by id', async () => {
      const res = await request(app).get(`/payment/${Payment.id}`)
      expect(res.status).to.equal(200)
      expect(res.body.name).to.equal(Payment.name)
      expect(res.body.email).to.equal(Payment.email)
    })
  })

  describe('PUT /payment/:id', () => {
    let Payment: PaymentModel

    before(async () => {
      // Create a Payment before running the test
      Payment = await PaymentModel.create({ name: 'John Doe', email: 'johndoe@example.com' })
    })

    it('should update a payment by id', async () => {
      const updatedPaymentModel = { name: 'Jane Doe', email: 'janedoe@example.com' }
      const res = await request(app)
        .put(`/payment/${Payment.id}`)
        .send({ name: "Jane Doe" })
      expect(res.statusCode).to.equal(200)
      expect(res.body.name).to.equal(updatedPaymentModel.name)
      expect(res.body.email).to.equal(updatedPaymentModel.email)
    })
  })
})
*/
