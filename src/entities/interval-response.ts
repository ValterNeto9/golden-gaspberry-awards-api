export interface Interval {
    producer: string
    interval: number
    previousWin: number
    followingWin: number
}

export interface IntervalsResponse {
    min: Interval[] | undefined
    max: Interval[] | undefined
}