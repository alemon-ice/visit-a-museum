export interface IScheduleData {
  id: number
  museum_id: string
  date: string
  start_time: string
  end_time: string
  people_quantity: number
}

export interface INewSchedule {
  museum_id: string
  date: string
  start_time: string
  end_time: string
  people_quantity: number
}
