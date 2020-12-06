export type WeekDaysType = "segunda-feira" | "terça-feira" | "quarta-feira" | "quinta-feira" | "sexta-feira" | "sábado" | "domingo"

export interface ITime_week_day {
  week_day: WeekDaysType
  start_time: string
  end_time: string
}

export interface IMuseumData {
  id: string
  image_url: string
  name: string
  people_limit: number
  week_days: ITime_week_day[]
}
