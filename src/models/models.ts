export interface IYearEvents {
    year: number,
    description: string
}


export interface ITimePeriodEntity {
    name: string,
    year_events: IYearEvents[]
}

export interface IDataResponse {
    header: string,
    time_periods: ITimePeriodEntity[]
}