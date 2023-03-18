import app from '../../app'
import request from 'supertest'
import { expect } from 'chai'
import { connection } from '../src/db.config'
import { MenuItemModel } from '../models/menu_tem.model'

describe('CRUD operations for MenuItemModel', () => {
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

  describe('POST /menu_tem', () => {
    it('should create a new menu_tem', async () => {
      const MenuItem = { name: 'John Doe', email: 'johndoe@example.com' }
      
      const res = await request(app).post('/menu_tem').send(MenuItem)
      
      expect(res.status).to.equal(201)
      expect(res.body.name).to.equal(MenuItem.name)
      expect(res.body.email).to.equal(MenuItem.email)
    });
  });
  
  describe("GET /menu_tem", () => {
    it("should get all MenuItems", async () => {
      await MenuItemModel.bulkCreate([
        {
          name: "John Doe",
          email: "john.doe@example.com",
        },
        {
          name: "Jane Doe",
          email: "jane.doe@example.com",
        },
      ])
      const res = await request(app).get("/menu_tem")
      expect(res.statusCode).to.equal(200)
      expect(res.body.length).to.equal(2)
      expect(res.body[0].name).to.equal("John Doe")
      expect(res.body[1].name).to.equal("Jane Doe")
    })
  })

  describe('GET /menu_tem/:id', () => {
    let MenuItem: MenuItemModel

    before(async () => {
      // Create a MenuItem before running the test
      MenuItem = await MenuItemModel.create({ name: 'John Doe', email: 'johndoe@example.com' })
    })

    it('should get a MenuItem by id', async () => {
      const res = await request(app).get(`/menu_tem/${MenuItem.id}`)
      expect(res.status).to.equal(200)
      expect(res.body.name).to.equal(MenuItem.name)
      expect(res.body.email).to.equal(MenuItem.email)
    })
  })

  describe('PUT /menu_tem/:id', () => {
    let MenuItem: MenuItemModel

    before(async () => {
      // Create a MenuItem before running the test
      MenuItem = await MenuItemModel.create({ name: 'John Doe', email: 'johndoe@example.com' })
    })

    it('should update a menu_tem by id', async () => {
      const updatedMenuItemModel = { name: 'Jane Doe', email: 'janedoe@example.com' }
      const res = await request(app)
        .put(`/menu_tem/${MenuItem.id}`)
        .send({ name: "Jane Doe" })
      expect(res.statusCode).to.equal(200)
      expect(res.body.name).to.equal(updatedMenuItemModel.name)
      expect(res.body.email).to.equal(updatedMenuItemModel.email)
    })
  })
})
