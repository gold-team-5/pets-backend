const request = require('supertest')
const productRoute = require('../server')
describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(productRoute)
      .post('/product')
      .send({
        product_name: 'product1',
        product_type:'qqq',
        product_price:'15',
        user_id:10
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('post')
  })
})