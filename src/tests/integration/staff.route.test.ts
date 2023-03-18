import app from '../../app'
import request from 'supertest'
import { expect } from 'chai'
import { connection } from '../src/db.config'
import { StaffModel } from '../models/staff.model'

describe('CRUD operations for StaffModel', () => {
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

  describe('POST /staff', () => {
    it('should create a new staff', async () => {
      const Staff = { name: 'John Doe', email: 'johndoe@example.com' }
      
      const res = await request(app).post('/staff').send(Staff)
      
      expect(res.status).to.equal(201)
      expect(res.body.name).to.equal(Staff.name)
      expect(res.body.email).to.equal(Staff.email)
    });
  });
  
  describe("GET /staff", () => {
    it("should get all Staffs", async () => {
      await StaffModel.bulkCreate([
        {
          name: "John Doe",
          email: "john.doe@example.com",
        },
        {
          name: "Jane Doe",
          email: "jane.doe@example.com",
        },
      ])
      const res = await request(app).get("/staff")
      expect(res.statusCode).to.equal(200)
      expect(res.body.length).to.equal(2)
      expect(res.body[0].name).to.equal("John Doe")
      expect(res.body[1].name).to.equal("Jane Doe")
    })
  })

  describe('GET /staff/:id', () => {
    let Staff: StaffModel

    before(async () => {
      // Create a Staff before running the test
      Staff = await StaffModel.create({ name: 'John Doe', email: 'johndoe@example.com' })
    })

    it('should get a Staff by id', async () => {
      const res = await request(app).get(`/staff/${Staff.id}`)
      expect(res.status).to.equal(200)
      expect(res.body.name).to.equal(Staff.name)
      expect(res.body.email).to.equal(Staff.email)
    })
  })

  describe('PUT /staff/:id', () => {
    let Staff: StaffModel

    before(async () => {
      // Create a Staff before running the test
      Staff = await StaffModel.create({ name: 'John Doe', email: 'johndoe@example.com' })
    })

    it('should update a staff by id', async () => {
      const updatedStaffModel = { name: 'Jane Doe', email: 'janedoe@example.com' }
      const res = await request(app)
        .put(`/staff/${Staff.id}`)
        .send({ name: "Jane Doe" })
      expect(res.statusCode).to.equal(200)
      expect(res.body.name).to.equal(updatedStaffModel.name)
      expect(res.body.email).to.equal(updatedStaffModel.email)
    })
  })
})
