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

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import 'leaflet/dist/leaflet.css'
import { colors } from '../constants'

import LinesPairList from '../components/LinesPairList'
import LinesPairInfo from '../components/LinesPairInfo'
import { MapContainer, TileLayer, Polyline, Circle } from 'react-leaflet'
import CustomList from '../components/CustomList'
import { MdOutlineNoEncryptionGmailerrorred } from 'react-icons/md'
import { GrArticle } from 'react-icons/gr'
import DatesCard from '../components/DatesCard'
import LandProjectsCard from '../components/LandProjectsCard'
import LandParcelsCard from '../components/LandParcelsCard'

const PollinationLines = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [landProjects, setLandProjects] = useState([])
  const [landParcels, setLandParcels] = useState([])
  const [landParcelLines, setLandParcelLines] = useState({})
  const [dates, setDates] = useState([null, null])
  const navigate = useNavigate()

  const areDatesSelected =
    dates.at(0) instanceof Date && dates.at(1) instanceof Date

  const handleSelectedProject = (id) => {
    const landProjectsAltered = landProjects.map((landProject) => ({
      ...landProject,
      isSelected: landProject.id === id && !landProject.isSelected,
    }))

    setLandProjects(landProjectsAltered)
  }

  const handleSelectParcel = (id) => {
    const landParcelsAltered = landParcels.map((landParcel) => ({
      ...landParcel,
      isSelected: landParcel.id === id && !landParcel.isSelected,
    }))

    setLandParcels(landParcelsAltered)
  }

  const handleDateChange = (dates) => {
    setDates(dates)
  }

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token')

      if (!token) return navigate('/')

      try {
        await axios.post(
          'http://0.0.0.0:3002/api/auth/verify-token/',
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

    verifyToken()
  }, [])

  useEffect(() => {
    setIsLoading(true)

    const fetchLandProjects = async () => {
      try {
        const { data } = await axios.get(
          'http://0.0.0.0:3002/api/general/land-projects'
        )

        const landProjectsAltered = data.map((landProject) => ({
          ...landProject,
          isSelected: false,
        }))

        setLandProjects(landProjectsAltered)
      } catch (error) {
        alert('No es posible acceder a los datos')
      }
      setIsLoading(false)
    }

    fetchLandProjects()
  }, [dates])

  useEffect(() => {
    const fetchLandParcels = async () => {
      setLandParcelLines({})

      const selectedLandProject = landProjects.find(
        (landProject) => landProject.isSelected
      )

      if (!selectedLandProject) return

      setIsLoading(true)

      try {
        const { data } = await axios.get(
          `http://0.0.0.0:3002/api/general/land-projects/${selectedLandProject.id}/land-parcels`
        )
        const landParcelsAltered = data
          .toSorted(
            (landParcelA, landParcelB) =>
              parseInt(landParcelA.name) - parseInt(landParcelB.name)
          )
          .map((landParcel) => ({
            ...landParcel,
            isSelected: false,
          }))

        setLandParcels(landParcelsAltered)
      } catch (error) {
        alert('No es posible acceder a los datos')
      }

      setIsLoading(false)
    }

    fetchLandParcels()
  }, [landProjects])

  useEffect(() => {
    const fetchLandParcelLines = async () => {
      const selectedLandParcel = landParcels.find(
        (landParcelLine) => landParcelLine.isSelected
      )

      if (!selectedLandParcel) return

      setIsLoading(true)

      try {
        const startDate = dates[0].toISOString()
        const endDate = dates[1].toISOString()
        const targetUrl = `http://0.0.0.0:3002/api/pollination/pollination-line-pairs/bulk?land-parcel=${
          selectedLandParcel.id
        }&start-date=${startDate.substring(
          0,
          startDate.indexOf('T')
        )}&end-date=${endDate.substring(0, endDate.indexOf('T'))}`

        const { data } = await axios.get(targetUrl)

        const landParcelLinesAltered = {}

        data.forEach((landParcelLine) => {
          const linesPair = `${landParcelLine.start_line.number}-${landParcelLine.end_line.number}-${landParcelLine.start_line.num_palms}-${landParcelLine.end_line.num_palms}`
          if (landParcelLinesAltered[linesPair])
            landParcelLinesAltered[linesPair].push(landParcelLine)
          else landParcelLinesAltered[linesPair] = [landParcelLine]
        })
        console.log(landParcelLinesAltered)
        setLandParcelLines(landParcelLinesAltered)
      } catch (error) {
        alert('No es posible acceder a los datos')
      }

      setIsLoading(false)
    }

    fetchLandParcelLines()
  }, [landParcels])

  return (
    <div className="container">
      <section className="card-container left-pane">
        {Object.entries(landParcelLines)
          .toSorted((linesPairA, linesPairB) => {
            const linesPairASum =
              parseInt(linesPairA.at(0).split('-').at(0)) +
              parseInt(linesPairA.at(0).split('-').at(1))
            const linesPairBSum =
              parseInt(linesPairB.at(0).split('-').at(0)) +
              parseInt(linesPairB.at(0).split('-').at(1))

            return linesPairASum - linesPairBSum
          })
          .map(([linesPairKey, linesPairValues]) => {
            const startLine = linesPairKey.split('-').at(0)
            const endLine = linesPairKey.split('-').at(1)

            const numPalmsStartLine = parseInt(linesPairKey.split('-').at(2))
            const numPalmsEndLine = parseInt(linesPairKey.split('-').at(3))

            return (
              <article
                key={linesPairKey}
                className="card card--line-pairs-container"
              >
                <div className="lines-pair-container">
                  <LinesPairInfo
                    startLine={startLine}
                    endLine={endLine}
                    numPalmsStartLine={numPalmsStartLine}
                    numPalmsEndLine={numPalmsEndLine}
                  />
                </div>
                <hr className="lines-pair-container__horizontal-line" />
                <div>
                  <LinesPairList
                    linesPairValues={linesPairValues}
                    startLine={startLine}
                    endLine={endLine}
                    numPalmsStartLine={numPalmsStartLine}
                    numPalmsEndLine={numPalmsEndLine}
                  />
                </div>
              </article>
            )
          })}
      </section>
      <section className="card-container right-pane">
        <DatesCard dates={dates} handleDateChange={handleDateChange} />
        {areDatesSelected ? (
          <LandProjectsCard
            landProjects={landProjects}
            handleSelectedProject={handleSelectedProject}
            isLoading={isLoading}
          />
        ) : null}
        {landProjects.some((landProject) => landProject.isSelected) &&
        areDatesSelected ? (
          <LandParcelsCard
            landParcels={landParcels}
            handleSelectParcel={handleSelectParcel}
            isLoading={isLoading}
          />
        ) : null}
      </section>
    </div>
  )
}

export default PollinationLines
