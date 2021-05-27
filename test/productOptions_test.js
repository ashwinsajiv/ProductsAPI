import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../server.js'

chai.should()
chai.use(chaiHttp)
const ProductId = 'DE1287C0-4B15-4A7B-9D8A-DD21B3CAFEC3'
const OptionId = "4E2BC5F2-699A-4C42-802E-CE4B4D2AC0EF"

describe('GET /products/:id/options', () => {
    it('Should GET all the product options', (done) => {
        chai.request(server)
            .get("/products/" + ProductId + "/options")
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
    })
    it('Should NOT GET all the product options', (done) => {
        chai.request(server)
            .get("/wrong")
            .end((err, res) => {
                res.should.have.status(404)
                res.body.should.be.a('object')
                done()
            })
    })
})

describe('GET /products/:id/options/:optionId', () => {
    it('Should GET the product option of a product matching the specified option Id', (done) => {
        chai.request(server)
            .get("/products/" + ProductId + "/options/" + OptionId)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eq(1)
                done()
            })
    })
    it('Should NOT GET the product option of a product matching the specified option Id', (done) => {
        chai.request(server)
            .get("/wrong")
            .end((err, res) => {
                res.should.have.status(404)
                res.body.should.be.a('object')
                done()
            })
    })
})

describe('POST /products/:id/options', () => {
    it('Should POST a new product option', (done) => {
        const productOption = {
            "Name": "Temp",
            "Description": "Temp"
        }
        chai.request(server)
            .post("/products/" + ProductId + "/options/")
            .send(productOption)
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')
                res.body.should.have.property('Name').eq("Temp")
                res.body.should.have.property('Description').eq("Temp")
                done()
            })
    })
})

describe('PUT /products/:id/options/:optionId', () => {
    it('Should PUT an existing product option', (done) => {
        const productOption = {
            "Name": "Temp",
            "Description": "Temp"
        }
        chai.request(server)
            .put("/products/" + ProductId + "/options/" + OptionId)
            .send(productOption)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('Name').eq("Temp")
                res.body.should.have.property('Description').eq("Temp")
                done()
            })
    })
    it('Should NOT PUT an existing product', (done) => {
        const productOption = {
            "Name": "Temp",
            "Description": "Temp"
        }
        chai.request(server)
            .put("/products/wrongId/options/wrongId")
            .send(productOption)
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
})


describe('DELETE /products/:id/options/:optionId', () => {
    // Variable that stores the Id of the created product option.
    var Id
    it('Should POST a product option', (done) => {
        // Create a product option that will be deleted at in the following test case.
        const productOption = {
            "Name": "Temp",
            "Description": "Temp"
        }
        chai.request(server)
            .post("/products/" + ProductId + "/options/")
            .send(productOption)
            .end((err, res) => {
                Id = res.body.Id
                done()
            })
    })
    it('Should DELETE the product option matching the specified UUID', (done) => {
        chai.request(server)
            .delete("/products/" + ProductId + "/options/" + Id)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.have.property('message').eq('Product option removed')
                done()
            })
    })
    it('Should NOT DELETE the product option matching the specified UUID', (done) => {
        chai.request(server)
            .delete("/products/wrongId/options/wrongId")
            .end((err, res) => {
                res.should.have.status(404)
                res.body.should.have.property('message').eq('Product option not found')
                done()
            })
    })
})