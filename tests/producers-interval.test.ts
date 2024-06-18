import { Test } from "supertest";
import { testServer } from "./jest.setup"

describe('Get all producers award intervals', () => {
    let response: any;

    beforeAll( async () => {
        response = await testServer.get('/worst-movie/awards-interval')
    })

    it('Get intervals - testing body structure', async () => {
        
        const { statusCode, body } = response

        expect(statusCode).toBe(200)

        expect(body).toEqual(
            expect.objectContaining({
                min: expect.any(Array),
                max: expect.any(Array),
            })
        );

        if (body.min) {
            expect(body.min).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        producer: expect.any(String),
                        interval: expect.any(Number),
                        previousWin: expect.any(Number),
                        followingWin: expect.any(Number),
                    }),
                ])
            );
        }

        if (body.max) {
            expect(body.max).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        producer: expect.any(String),
                        interval: expect.any(Number),
                        previousWin: expect.any(Number),
                        followingWin: expect.any(Number),
                    }),
                ])
            );
        }
    })

    it('Get intervals - testing return of min and max interval values', async () => {
        const { statusCode, body } = response

        expect(statusCode).toBe(200)

        expect(body.min[0].interval).toEqual(1)
        expect(body.max[0].interval).toEqual(13)
    })
})