import './PollinationMap.css'
import {
  PiCaretDownBold,
  PiStarBold,
  PiStarFill,
  PiNumberCircleOneFill,
  PiNumberCircleTwoFill,
  PiNumberCircleThreeFill,
} from 'react-icons/pi'

import React from 'react'
import axios from 'axios'

import { Checkbox, Loader } from '@mantine/core'
import { DatePicker } from '@mantine/dates'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import 'leaflet/dist/leaflet.css'
import { colors } from '../constants'
import { MapContainer, TileLayer, Polyline, Circle } from 'react-leaflet'
import EmployeesList from '../components/EmployeesList'
import { MdOutlineNoEncryptionGmailerrorred } from 'react-icons/md'

const withLinePairsOptions = {
  color: '#23F4D1',
  smoothFactor: 0.0,
}
const withoutLinePairsOptions = { color: 'white', fillColor: '#000' }

const PollinationMap = () => {
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(false)
  const [isLoadingLocations, setIsLoadingLocations] = useState(false)
  const [employees, setEmployees] = useState([])
  const [dates, setDates] = useState([null, null])
  const navigate = useNavigate()

  let sessions = []

  employees.forEach((employee) => {
    if (
      employee.geo?.sessions &&
      Object.keys(employee.geo?.sessions).length > 0
    ) {
      for (const session in employee.geo?.sessions) {
        sessions.push({
          session,
          inside_line_pairs: {
            color_options: { color: employee.geo.color },
            locations: employee.geo?.sessions[session]['with_line_pairs'],
          },
          outside_line_pairs: {
            color_options: withoutLinePairsOptions,
            locations: employee.geo?.sessions[session]['without_line_pairs'],
          },
        })
      }
    }
  })

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token')

      if (!token) return navigate('/')

      try {
        await axios.post(
          'http://100.29.65.13:3002/api/auth/verify-token/',
          {},
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
      } catch (error) {
        return navigate('/')
      }
    }

    setIsLoadingEmployees(true)

    const fetchEmployees = async () => {
      try {
        const { data } = await axios.get(
          'http://100.29.65.13:3002/api/general/employees'
        )

        let remainingColors = [...colors]

        const employees = data.map((employee) => {
          const indexToBeDeleted = Math.floor(
            Math.random() * remainingColors.length
          )

          return {
            ...employee,
            geo: {
              color: remainingColors.splice(indexToBeDeleted, 1).at(0),
              sessions: null,
            },
            isSelected: false,
          }
        })

        setEmployees(employees)
      } catch (error) {
        alert('No es posible acceder a los datos')
      }
      setIsLoadingEmployees(false)
    }

    verifyToken()
    fetchEmployees()
  }, [])

  useEffect(() => {
    const employeesAltered = employees.map((employee) => ({
      ...employee,
      isSelected: false,
      geo: { ...employee.geo, sessions: null },
    }))

    setEmployees(employeesAltered)
  }, [dates])

  const handleDateChange = (dates) => {
    setDates(dates)
  }

  const handleSelectedEmployees = (id) => {
    const employeesAltered = employees.map((employee) => {
      if (employee.id == id)
        return {
          ...employee,
          isSelected: !employee.isSelected,
          geo: {
            ...employee.geo,
            sessions: employee.isSelected ? null : employee.geo.sessions,
          },
        }
      return employee
    })
    setEmployees(employeesAltered)
  }

  const toggleAllSelectedEmployees = (areSelected) => {
    const employeesAltered = employees.map((employee) => ({
      ...employee,
      isSelected: areSelected,
      geo: { ...employee.geo, sessions: null },
    }))
    setEmployees(employeesAltered)
  }

  const fetchLocations = async (event) => {
    setIsLoadingLocations(true)

    event.preventDefault()

    if (
      employees.some(
        (employee) => employee.isSelected && !employee.geo.sessions
      ) &&
      dates.at(0) instanceof Date &&
      dates.at(1) instanceof Date
    ) {
      const startDate = new Date(dates.at(0))
      const endDate = new Date(dates.at(1))

      const startDateString = `${startDate.getFullYear()}-${
        startDate.getMonth() + 1
      }-${startDate.getDate()}`

      endDate.setDate(endDate.getDate() + 1)

      const endDateString = `${endDate.getFullYear()}-${
        endDate.getMonth() + 1
      }-${endDate.getDate()}`

      const nationalIdsToFetch = employees
        .filter((employee) => employee.isSelected && !employee.geo.sessions)
        .map((employee) => employee.national_id)

      try {
        const { data } = await axios.get(
          `http://100.29.65.13:3002/api/pollination/pollination-locations/bulk?national_id=${nationalIdsToFetch.join(
            ','
          )}&start_date=${startDateString}&end_date=${endDateString}`
        )

        const employeesAltered = employees.map((employee) => {
          if (employee.national_id in data)
            return {
              ...employee,
              geo: {
                ...employee.geo,
                sessions: data[employee.national_id].sessions,
              },
            }
          return employee
        })
        setEmployees(employeesAltered)
      } catch (error) {}
    }
    setIsLoadingLocations(false)
  }

  return (
    <div className="container">
      <section className="left-pane">
        <MapContainer
          className="full-height-map"
          center={[3.565843, -73.575201]}
          zoom={14.5}
          minZoom={14}
          maxZoom={18}
          maxBounds={[]}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
          />
          {sessions.map(
            ({ session, inside_line_pairs, outside_line_pairs }) => (
              <React.Fragment key={session}>
                <Polyline
                  pathOptions={inside_line_pairs['color_options']}
                  positions={inside_line_pairs['locations'].map(
                    ({ latitude, longitude }) => [latitude, longitude]
                  )}
                  eventHandlers={{ click: () => alert('HOLA SOCIO') }}
                />
                {outside_line_pairs['locations'].map(
                  ({ id, latitude, longitude }) => (
                    <Circle
                      key={id}
                      center={[latitude, longitude]}
                      pathOptions={outside_line_pairs['color_options']}
                      radius={2}
                    />
                  )
                )}
              </React.Fragment>
            )
          )}
        </MapContainer>
      </section>
      <section className="card">
        <div className="card__container">
          <p className="card__container-title card__container-title--main">
            FECHAS
          </p>
          <DatePicker
            type="range"
            size="sm"
            value={dates}
            allowSingleDateInRange
            onChange={handleDateChange}
          />
        </div>
        <div className="card__container">
          <p className="card__container-title card__container-title--main">
            POLINIZADORES
          </p>
          <div className="card__container-body--list-info">
            <div className="card__container-row card__container-title--secondary card__list-value">
              {isLoadingEmployees || isLoadingLocations ? (
                <div className="loader-container">
                  <Loader color="rgba(63, 105, 0, 0.8)" size={30} />
                </div>
              ) : (
                <React.Fragment>
                  <EmployeesList
                    employees={employees}
                    handleSelectedEmployees={handleSelectedEmployees}
                    toggleAllSelectedEmployees={toggleAllSelectedEmployees}
                    areEmployeesSelectable={
                      !isLoadingLocations && dates.at(0) && dates.at(1)
                    }
                  />
                  <br />
                  {employees.some((employee) => employee.isSelected) ? (
                    <button
                      disabled={isLoadingLocations}
                      onClick={fetchLocations}
                      className="btn btn--fetch"
                    >
                      CARGAR UBICACIONES
                    </button>
                  ) : null}
                </React.Fragment>
              )}
            </div>
            {/* <div className="card__container-row card__container-title--secondary card__person-id">
              <span>1022482543</span>
            </div>
            <div className="card__container-row card__container-title--secondary card__person-entry-date">
              <span>05/MAY/2021 (HACE 3 AÑOS)</span>
            </div>
            <div className="card__container-row card__container-title--secondary card__person-performance">
              <span>
                <PiStarFill />
              </span>
              <span className="margin-left">
                <PiStarFill />
              </span>
              <span className="margin-left">
                <PiStarBold />
              </span>
            </div> */}
          </div>
        </div>
        <div className="card__container">
          <p className="card__container-title card__container-title--main">
            POLINIZACIÓN
          </p>
          <div className="card__counters-container">
            <div className="card__counter-container">
              <PiNumberCircleOneFill size={30} color="rgba(63, 105, 0, 0.8)" />
              <p className="card__counter-value">128</p>
            </div>
            <div className="card__counter-container">
              <PiNumberCircleTwoFill size={30} color="rgba(63, 105, 0, 0.8)" />
              <p className="card__counter-value">256</p>
            </div>
            <div className="card__counter-container">
              <PiNumberCircleThreeFill
                size={30}
                color="rgba(63, 105, 0, 0.8)"
              />
              <p className="card__counter-value">64</p>
            </div>
          </div>
          <div className="horizontal-grouping">
            <div className="card__info-container card__area-info-container">
              <div className="card__container-row card__container-title--secondary">
                <span>2.8</span>
              </div>
            </div>
            <div className="card__info-container card__calculated-area-info-container">
              <div className="card__container-row card__container-title--secondary">
                <span>2.5</span>
              </div>
            </div>
            <div className="card__info-container card__time-info-container">
              <div className="card__container-row card__container-title--secondary">
                <span>6.5</span>
              </div>
            </div>
            <div className="card__info-container card__rate-info-container">
              <div className="card__container-row card__container-title--secondary">
                <span>1.1</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PollinationMap
