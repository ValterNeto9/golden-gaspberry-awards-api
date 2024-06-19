import { app } from '../src/app'
import request from 'supertest';

describe('Get all producers award intervals', () => {
    let api: any;

    beforeEach( async ()=> {
        api = await request(app)
    })

    it('Get intervals - testing return of min and max interval values', async () => {
        const response = await api.get('/worst-movie/awards-interval')
        const { statusCode, body } = response

        expect(statusCode).toBe(200)

        expect(body.min[0].interval).toEqual(1)
        expect(body.max[0].interval).toEqual(13)
        expect(api).toBeTruthy()
    }, 15000)
})