export interface IVisitData {
  id: number
  museum_id: string
  date: string
  start_time: string
  end_time: string
  people_quantity: number
}

export interface INewVisit {
  museum_id: string
  date: string
  start_time: string
  end_time: string
  people_quantity: number
}
