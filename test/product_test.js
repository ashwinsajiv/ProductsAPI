import chai from 'chai'
import chaiHttp from 'chai-http'
import Product from '../models/productModel.js'
import server from '../server.js'

chai.should()
chai.use(chaiHttp)

// Only to run in dev mode, switching to prod would not 
// run the seeder.js script to avoid overwritting data.
describe('GET /products', () => {
    it('Should GET all the products', (done) => {
        chai.request(server)
            .get("/products")
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
    })
    it('Should NOT GET all the products', (done) => {
        chai.request(server)
            .get("/wrong")
            .end((err, res) => {
                res.should.have.status(404)
                res.body.should.be.a('object')
                done()
            })
    })
})

describe('GET /products?name={name}', () => {
    it('Should GET products matching the specified name', (done) => {
        const name = "samsung"
        chai.request(server)
            .get("/products?name=" + name)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
    })
})

describe('GET /products/:id', () => {
    const Id = "DE1287C0-4B15-4A7B-9D8A-DD21B3CAFEC3"
    it('Should GET the product matching the specified UUID', (done) => {
        chai.request(server)
            .get("/products/" + Id)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('Id').eq(Id)
                done()
            })
    })
    it('Should NOT GET a product matching the specified UUID', (done) => {
        chai.request(server)
            .get("/products/wrongId")
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
})

describe('POST /products', () => {
    // Seeder script is run at the start of each test suit
    // to make sure that the previous data is overwritten.
    // Since this test adds data, we would want to remove it
    // before we run the test suite again.
    it('Should POST a new product', (done) => {
        const product = {
            "Name": "Temp",
            "Description": "Temp",
            "Price": 1,
            "DeliveryPrice": 1
        }
        chai.request(server)
            .post("/products")
            .send(product)
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')
                res.body.should.have.property('Name').eq("Temp")
                res.body.should.have.property('Description').eq("Temp")
                res.body.should.have.property('Price').eq(1)
                res.body.should.have.property('DeliveryPrice').eq(1)
                done()
            })
    })
})

describe('PUT /products/:id', () => {
    const Id = "DE1287C0-4B15-4A7B-9D8A-DD21B3CAFEC3"
    it('Should PUT an existing product', (done) => {
        const product = {
            "Name": "Temp",
            "Description": "Temp",
            "Price": 1,
            "DeliveryPrice": 1
        }
        chai.request(server)
            .put("/products/" + Id)
            .send(product)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('Name').eq("Temp")
                res.body.should.have.property('Description').eq("Temp")
                res.body.should.have.property('Price').eq(1)
                res.body.should.have.property('DeliveryPrice').eq(1)
                done()
            })
    })
    it('Should NOT PUT an existing product', (done) => {
        const product = {
            "Name": "Temp",
            "Description": "Temp",
            "Price": 1,
            "DeliveryPrice": 1
        }
        chai.request(server)
            .put("/products/wrongId")
            .send(product)
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
})

describe('DELETE /products/:id', () => {
    // Variable that stores the Id of the created product.
    var Id
    it('Should POST a product', (done) => {
        // Create a product that will be deleted at in the following test case.
        const product = {
            "Name": "Temp",
            "Description": "Temp",
            "Price": 1,
            "DeliveryPrice": 1
        }
        chai.request(server)
            .post("/products")
            .send(product)
            .end((err, res) => {
                Id = res.body.Id
                done()
            })
    })
    it('Should DELETE the product matching the specified UUID', (done) => {
        chai.request(server)
            .delete("/products/" + Id)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.have.property('message').eq('Product and options removed')
                done()
            })
    })
    it('Should NOT DELETE the product matching the specified UUID', (done) => {
        chai.request(server)
            .delete("/products/wrongId")
            .end((err, res) => {
                res.should.have.status(404)
                res.body.should.have.property('message').eq('Product not found')
                done()
            })
    })
})