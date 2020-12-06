import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { isPast, parseISO, intervalToDuration, format, isWithinInterval, isBefore } from 'date-fns'
import BR from 'date-fns/locale/pt-BR'

import api from 'services/api'
import axios from 'axios'

import { MuseumCard, VisitsCard } from 'components/index'

import { Container, Footer } from 'styles/pages/Home'

import museumLogo from '../assets/museum.svg'

import { museums } from 'utils/museums'

import { IMuseumData } from 'models/museum.interfaces'
import { INewVisit, IVisitData } from 'models/visit.interfaces'

export default function Home() {
  const [selectedMuseum, setSelectedMuseum] = useState<IMuseumData | undefined>()
  const [museumCardId, setMuseumCardId] = useState<'open-museum-details' | 'close-museum-details'>('close-museum-details')
  const [selectedMuseumVisits, setSelectedMuseumVIsits] = useState<IVisitData[] | undefined>()
  const [museumVisitsId, setMuseumVisitsId] = useState<'open-museum-visits' | 'close-museum-visits'>('close-museum-visits')

  const [date, setDate] = useState<string>('')
  const [startTime, setStartTime] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')
  const [peopleQuantity, setPeopleQuantity] = useState<number>(0)

  const [isEmpty, setIsEmpty] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    handleCheckFields()
  }, [selectedMuseum, date, peopleQuantity])

  function handleCheckFields() {
    const isEmpty = !!selectedMuseum && !!date && (peopleQuantity > 0)

    setIsEmpty(!isEmpty)
  }

  function handleChangeMuseum(museumId: string) {
    setMuseumCardId('close-museum-details')

    setTimeout(() => {
      const selectedMuseum = museums.find(museumItem => museumItem.id === museumId)
      setSelectedMuseum(selectedMuseum)

      setMuseumCardId('open-museum-details')
    }, 700)
  }

  function handleChangeDate(date: string) {
    setDate(date)

    setMuseumVisitsId('close-museum-visits')

    setTimeout(async () => {
      const { data } = await axios.get(`/api/visits/${selectedMuseum.id}?date=${date}`)
      setSelectedMuseumVIsits(data.visits)

      setMuseumVisitsId('open-museum-visits')
    }, 700)
  }

  function validateDate() {
    const startDateTime = parseISO(`${date}T${startTime}`)
    const endDateTime = parseISO(`${date}T${endTime}`)

    const { hours } = intervalToDuration({ start: startDateTime, end: endDateTime })

    if (hours < 1 || isBefore(endDateTime, startDateTime)) {
      return 'Período de visita inválido'
    } else {

      let totalQuantity = peopleQuantity

      const dateWeekDay = format(parseISO(date), "EEEE", { locale: BR })

      const selectedWeekDay = selectedMuseum.week_days.find(weekDay => {
        const [day] = weekDay.week_day.split('-')
        return day === dateWeekDay
      })

      if (selectedWeekDay === undefined) {
        return `O ${selectedMuseum.name} não abre neste dia da semana`
      } else {

        const startTimeIsWI = isWithinInterval(startDateTime, { start: parseISO(`${date}T${selectedWeekDay.start_time}`), end: parseISO(`${date}T${selectedWeekDay.end_time}`) })
        const endTimeIsWI = isWithinInterval(endDateTime, { start: parseISO(`${date}T${selectedWeekDay.start_time}`), end: parseISO(`${date}T${selectedWeekDay.end_time}`) })

        if (startTimeIsWI && endTimeIsWI) {

          selectedMuseumVisits.forEach((visit: IVisitData) => {
            const startTimeIsWI = isWithinInterval(startDateTime, { start: parseISO(`${visit.date}T${visit.start_time}`), end: parseISO(`${visit.date}T${visit.end_time}`) })
            const endTimeIsWI = isWithinInterval(endDateTime, { start: parseISO(`${visit.date}T${visit.start_time}`), end: parseISO(`${visit.date}T${visit.end_time}`) })

            if (startTimeIsWI || endTimeIsWI) {
              totalQuantity += visit.people_quantity
            }
          })

          const [peopleQuantityMuseum] = museums.filter(m => m.id === selectedMuseum.id && m)

          return totalQuantity > peopleQuantityMuseum.people_limit ? false : true

        } else {
          return 'Horário selecionado fora do horário de funcionamento'
        }
      }
    }
  }

  function handleCheckValues() {
    const errors = []

    isPast(parseISO(`${date}T${startTime}`)) && errors.push('A data selecionada já passou')

    peopleQuantity > 30 && errors.push('Limite de 30 pessoas excedido')

    const supportedQuantity = validateDate()
    typeof supportedQuantity === typeof ''
      ? errors.push(supportedQuantity)
      : !supportedQuantity && errors.push('Quantidade máxima de pessoas no local excedida, neste horário')

    return errors
  }

  function clearFields() {
    setSelectedMuseum(undefined)
    setDate("")
    setStartTime("")
    setEndTime("")
    setPeopleQuantity(0)
    setErrors([])
  }

  async function handleSubmit() {

    const errors = handleCheckValues()

    if (errors.length > 0) {
      setErrors(errors)
    } else {
      setIsLoading(true)

      const newVisit: INewVisit = {
        museum_id: selectedMuseum.id,
        date,
        start_time: startTime,
        end_time: endTime,
        people_quantity: peopleQuantity
      }

      try {
        axios.post('/api/visits/create_visit', { visit: newVisit })

        alert('Visita agendada com sucesso.')
      } catch (err) {
        alert('Ops, erro ao salvar.\nPor favor, tente novamente.')
      } finally {
        clearFields()
        setIsLoading(false)
      }
    }

  }

  return (
    <Container>
      <Head>
        <title>Visite um Museu</title>
      </Head>

      <main>
        <div className="header">
          <h1>VISITE UM MUSEU</h1>
          <img src={museumLogo} alt="Museum Logo" width="100" />
        </div>

        <div className="content-page">
          {
            selectedMuseum
              ? <MuseumCard id={museumCardId} museum={selectedMuseum} />
              : <div style={{ flex: '1' }} />
          }

          <div className="container-new-visit">
            <h1>
              Selecione um museu e agende sua visita:
            </h1>

            <div className="new-visit">
              <div className="form">
                <label htmlFor="museum">Museu:</label>
                <select name="museums" id="museum" onChange={e => handleChangeMuseum(e.target.value)}>
                  <option value="">Museus Disponíveis</option>
                  {
                    museums.map(museum => <option value={museum.id} key={museum.id}>{museum.name}</option>)
                  }
                </select>

                <label htmlFor="date">Data:</label>
                <input
                  type="date"
                  id="date"
                  disabled={!(!!selectedMuseum)}
                  value={date}
                  onChange={e => handleChangeDate(e.target.value)}
                />

                <label htmlFor="start_time">Horário de entrada:</label>
                <input
                  type="time"
                  id="start_time"
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                />

                <label htmlFor="end_time">Horário de saída:</label>
                <input
                  type="time"
                  id="end_time"
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                />

                <label htmlFor="quantity">Quantidade de pessoas:</label>
                <input
                  type="number"
                  id="quantity"
                  placeholder="Máximo de 30 pessoas"
                  value={peopleQuantity}
                  onChange={e => setPeopleQuantity(Number(e.target.value))}
                />

                {
                  errors.length > 0 && errors.map(error => <label className="error-message" key={error}>{error}</label>)
                }
                <button
                  type="button"
                  disabled={isEmpty || isLoading}
                  className={isEmpty ? 'disabled' : ''}
                  onClick={handleSubmit}
                >
                  Agendar
                </button>
              </div>
            </div>
          </div>

          {
            selectedMuseumVisits && selectedMuseum
              ? <VisitsCard id={museumVisitsId} date={date} visits={selectedMuseumVisits} museum={selectedMuseum} />
              : <div style={{ flex: '1' }} />
          }

        </div>
      </main>

      <Footer>
        <a
          href="https://github.com/alemon-ice"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Rafael Dias
        </a>
      </Footer>
    </Container>
  )
}
