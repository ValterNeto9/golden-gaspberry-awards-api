import { Request, Response, Router } from "express";
import { getAwardsIntervalsController } from "./controllers/awards-interval.controller";
import { responseMock } from "./mocks/response-intervals";

const router = Router()

router.get('/worst-movie/awards-interval', getAwardsIntervalsController)

export { router }