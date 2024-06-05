import { testServer } from "./jest.setup"

describe('Get all producers award intervals', () => {
    it('Get intervals', async () => {
        const response = await testServer.get('/worst-movie/awards-interval')
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
})