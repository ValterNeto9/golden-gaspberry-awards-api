import { Request, Response } from 'express';
import { getWinnerMoviesAndProducersIntervals } from '../database/providers';

export const getAwardsIntervalsController = async (req: Request, res: Response) => {

    const result = await getWinnerMoviesAndProducersIntervals()
    return res.status(200).json(result)
}
