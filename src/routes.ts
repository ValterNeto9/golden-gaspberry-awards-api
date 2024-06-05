import { Request, Response, Router } from "express";
import { getAwardsIntervalsController } from "./controllers/awards-interval.controller";
import { responseMock } from "./mocks/response-intervals";

const router = Router()

router.get('/worst-movie/winners', (req: Request, res: Response) => {
    return res.status(200).send(['ganhadores'])
})

router.get('/worst-movie/nominees', (req: Request, res: Response) => {
    return res.status(200).send(['indicados'])
})

router.get('/worst-movie/awards-interval', getAwardsIntervalsController)

export { router }