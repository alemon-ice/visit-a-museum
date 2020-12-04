import React, { useEffect, useState } from 'react';
import { parseISO } from 'date-fns';
import BR from 'date-fns/locale/pt-BR'

import { Container } from './styles';

import { IScheduleData } from 'models/schedule.interfaces';
import { IMuseumData } from 'models/museum.interfaces';

interface IMuseumCardProps {
  schedules: IScheduleData[]
  museum: IMuseumData
  date: string
  id: string
}

const MuseumCard = (props: IMuseumCardProps): JSX.Element => {
  const { schedules, museum, date, id } = props

  const [formatedDate, setFormatedDate] = useState<string>('')

  useEffect(() => {
    setFormatedDate(parseISO(date).toLocaleDateString())
  }, [date])

  return (
    <Container id={id}>
      <div className="content">
        <h2>{museum.name}</h2>

        <h3>Visitas para {formatedDate}:</h3>
        <div className="visits">
          {
            schedules.length > 0
              ? schedules.map((scheduleItem: IScheduleData) => (
                <div className="schedule-item" key={scheduleItem.id}>
                  <p className="day">Visita de <strong>{scheduleItem.people_quantity}</strong> pessoas:</p>
                  <p className="time">das <strong>{scheduleItem.start_time}</strong> às <strong>{scheduleItem.end_time}</strong></p>
                </div>
              )) : <span>Não há agendamentos para este museu</span>
          }
        </div>
      </div>
    </Container>
  );
}

export default MuseumCard;
