import React from 'react';

import { Container } from './styles';

import { IMuseumData, ITime_week_day } from 'models/museum.interfaces'

interface IMuseumCardProps {
  museum: IMuseumData
  id: string
}

const MuseumCard = (props: IMuseumCardProps): JSX.Element => {
  const { museum, id } = props

  return (
    <Container className="card" id={id}>
      <div className="content">
        <h2>{museum.name}</h2>

        <img
          src={museum.image_url}
          alt="Imagem do museu"
        />

        <h3>Horário de funcionamento:</h3>
        <div className="times">
          {museum.week_days.map((day: ITime_week_day) => (
            <div className="day-item" key={day.week_day}>
              <strong className="day">{day.week_day}:</strong>
              <p className="time">{`das ${day.start_time} às ${day.end_time}`}</p>
            </div>
          ))}
        </div>

        <span>
          Limite de pessoas no local:{' '}
          <strong>
            {museum.people_limit}
          </strong>
        </span>
      </div>
    </Container>
  );
}

export default MuseumCard;
