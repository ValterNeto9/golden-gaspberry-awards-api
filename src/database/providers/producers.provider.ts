import { Knex } from "..";
import { Interval, IntervalsResponse } from "../../entities/interval-response";

export const getWinnerMoviesAndProducersIntervals = async (): Promise<IntervalsResponse | undefined> => {

    try {
        // 1. Obter todas as produções vencedoras, ordenadas por ano
        const winningProductions = await Knex('movies')
            .select('year', 'winner', 'producers')
            .where('winner', "yes")
            .orderBy('year', 'asc');

        // 2. Criar um mapa para armazenar os produtores e seus anos de vitória
        const producerWinsMap: { [producer: string]: number[] } = {};

        // 3. Iterar sobre as produções vencedoras e adicionar ao mapa
        winningProductions.forEach((production) => {
            const producers = production.producers.split(',').map((producer: string) =>
                producer.trim()
            );
            producers.forEach((producer: string) => {
                if (!producerWinsMap[producer]) {
                    producerWinsMap[producer] = [];
                }
                producerWinsMap[producer].push(production.year);
            });
        });

        // 4. Calcular o intervalo entre o primeiro e o segundo prêmio para cada produtor
        const producerIntervals: Interval[] = [];

        for (const [producer, wins] of Object.entries(producerWinsMap)) {
            if (wins.length >= 2) {
                const interval = wins[1] - wins[0];
                producerIntervals.push({
                    producer,
                    interval,
                    previousWin: wins[0],
                    followingWin: wins[1],
                });
            }
        }

        // 5. Encontrar o menor e o maior intervalo
        const minInterval = Math.min(
            ...producerIntervals.map((producer) => producer.interval)
        );

        const maxInterval = Math.max(
            ...producerIntervals.map((producer) => producer.interval)
        );

        // 6. Filtrar os produtores com o menor e o maior intervalo
        const producersWithShortestInterval = producerIntervals.filter(
            (producer) => producer.interval === minInterval
        );

        const producersWithLongestInterval = producerIntervals.filter(
            (producer) => producer.interval === maxInterval
        );

        // 7. Retornar os produtores com o maior intervalo
        const response: IntervalsResponse = {
            min: producersWithShortestInterval,
            max: producersWithLongestInterval
        }

        return response
    } catch (error) {
        console.error('Erro ao obter as linhas com produtores duplicados:', error);
        throw error;
    }
}
