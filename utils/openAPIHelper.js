const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Products and Options',
            description: 'Products and Options APIs definition',
            version: '1.0.0',
            author: {
                name: 'Ashwin Sajiv'
            },
            servers: ['http://localhost:3000/'],
        },
        components: {
            schemas: {
                Product: {
                    properties: {
                        Id: {
                            type: 'string',
                            required: true
                        },
                        Name: {
                            type: 'string',
                            required: true
                        },
                        Description: {
                            type: 'string',
                            required: true
                        },
                        Price: {
                            type: 'number',
                            required: true
                        },
                        DeliveryPrice: {
                            type: 'number',
                            required: true
                        }
                    }
                },
                ProductOption: {
                    properties: {
                        Id: {
                            type: 'string',
                            required: true
                        },
                        ProductId: {
                            type: 'string',
                            required: true
                        },
                        Name: {
                            type: 'string',
                            required: true
                        },
                        Description: {
                            type: 'string',
                            required: true
                        }
                    }
                },
            }
        }
    },
    apis: ['./controllers/*.js']
}

export default options