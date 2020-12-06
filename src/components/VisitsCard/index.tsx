import React, { useEffect, useState } from 'react';
import { parseISO } from 'date-fns';
import BR from 'date-fns/locale/pt-BR'

import { Container } from './styles';

import { IVisitData } from 'models/visit.interfaces';
import { IMuseumData } from 'models/museum.interfaces';

interface IMuseumCardProps {
  visits: IVisitData[]
  museum: IMuseumData
  date: string
  id: string
}

const VisitsCard = (props: IMuseumCardProps): JSX.Element => {
  const { visits, museum, date, id } = props

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
            visits.length > 0
              ? visits.map((visitItem: IVisitData) => (
                <div className="visit-item" key={visitItem.id}>
                  <p className="day">Visita de <strong>{visitItem.people_quantity}</strong> pessoas:</p>
                  <p className="time">das <strong>{visitItem.start_time}</strong> às <strong>{visitItem.end_time}</strong></p>
                </div>
              )) : <span>Não há agendamentos para este museu</span>
          }
        </div>
      </div>
    </Container>
  );
}

export default VisitsCard;
