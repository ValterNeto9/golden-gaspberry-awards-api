export interface Interval {
    producer: string
    interval: number
    previousWin: number
    followingWin: number
}

export interface IntervalsResponse {
    min: Interval[]
    max: Interval[]
}