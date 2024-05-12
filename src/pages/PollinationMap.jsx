import Map, { Source, Layer } from 'react-map-gl'
import './PollinationMap.css'
import {
  PiCaretDownBold,
  PiStarBold,
  PiStarFill,
  PiNumberCircleOneFill,
  PiNumberCircleTwoFill,
  PiNumberCircleThreeFill,
} from 'react-icons/pi'
import { DatePicker } from '@mantine/dates'

const polygonJSON = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [-73.574737, 3.559212],
        [-73.571366, 3.557441],
        [-73.570937, 3.551112],
        [-73.572835, 3.553792],
        [-73.574737, 3.559212],
      ],
    ],
  },
}

const polygonJSON2 = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [-73.568289, 3.555903],
        [-73.571366, 3.557441],
        [-73.570937, 3.551112],
        [-73.567794, 3.547065],
        [-73.568289, 3.555903],
      ],
    ],
  },
}

const polygonLayerStyle = {
  id: 'my-datal',
  type: 'fill',
  source: 'my-datag', // reference the data source
  layout: {},
  paint: {
    'fill-color': '#0080ff',
    'fill-opacity': 0.5,
  },
}

const polygonLayerStyle2 = {
  id: 'my-data2',
  type: 'fill',
  source: 'my-data2', // reference the data source
  layout: {},
  paint: {
    'fill-color': '#55dd22',
    'fill-opacity': 0.5,
  },
}

const PollinationMap = () => {
  return (
    <div className="map-container">
      <section className="map">
        <Map
          mapLib={import('mapbox-gl')}
          initialViewState={{
            longitude: -73.563114,
            latitude: 3.566661,
            zoom: 13.7,
          }}
          minZoom={13.2}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
          mapboxAccessToken="pk.eyJ1IjoiZGFuZWVsZngiLCJhIjoiY2x2enkzODNwMzRqdTJpbWc1YTllaGV5ZiJ9.k4snA45IyAWoKQJu9xvriw"
        >
          <Source id="my-data" type="geojson" data={polygonJSON}>
            <Layer {...polygonLayerStyle} />
          </Source>
          {/* <Source id="my-data2" type="geojson" data={polygonJSON2}>
            <Layer {...polygonLayerStyle2} />
          </Source> */}
        </Map>
      </section>
      <section className="map-controls">
        <div className="map-controls__container">
          <p className="map-controls__container-title map-controls__container-title--main">
            POLINIZADOR
          </p>
          <div className="map-controls__container-body--person-info">
            <div className="map-controls__container-row map-controls__container-title--secondary map-controls__person-name">
              <span>DANIEL SOLANO</span>
              <span className="margin-left">
                <PiCaretDownBold />
              </span>
            </div>
            <div className="map-controls__container-row map-controls__container-title--secondary map-controls__person-id">
              <span>1022482543</span>
            </div>
            <div className="map-controls__container-row map-controls__container-title--secondary map-controls__person-entry-date">
              <span>05/MAY/2021 (HACE 3 AÑOS)</span>
            </div>
            <div className="map-controls__container-row map-controls__container-title--secondary map-controls__person-performance">
              <span>
                <PiStarFill />
              </span>
              <span className="margin-left">
                <PiStarFill />
              </span>
              <span className="margin-left">
                <PiStarBold />
              </span>
            </div>
          </div>
        </div>
        <div className="map-controls__container">
          <p className="map-controls__container-title map-controls__container-title--main">
            RANGO DE FECHAS
          </p>
          <DatePicker type="range" size="sm" />
        </div>
        <div className="map-controls__container">
          <p className="map-controls__container-title map-controls__container-title--main">
            POLINIZACIÓN
          </p>
          <div className="map-controls__counters-container">
            <div className="map-controls__counter-container">
              <PiNumberCircleOneFill
                size={30}
                color="rgba(255, 255, 255, 0.817)"
              />
              <p className="map-controls__counter-value">128</p>
            </div>
            <div className="map-controls__counter-container">
              <PiNumberCircleTwoFill
                size={30}
                color="rgba(255, 255, 255, 0.817)"
              />
              <p className="map-controls__counter-value">256</p>
            </div>
            <div className="map-controls__counter-container">
              <PiNumberCircleThreeFill
                size={30}
                color="rgba(255, 255, 255, 0.817)"
              />
              <p className="map-controls__counter-value">64</p>
            </div>
          </div>
          <div className="horizontal-grouping">
            <div className="map-controls__info-container map-controls__area-info-container">
              <div className="map-controls__container-row map-controls__container-title--secondary">
                <span>2.5 ha</span>
              </div>
            </div>
            <div className="map-controls__info-container map-controls__time-info-container">
              <div className="map-controls__container-row map-controls__container-title--secondary">
                <span>6.5 h</span>
              </div>
            </div>
            <div className="map-controls__info-container map-controls__rate-info-container">
              <div className="map-controls__container-row map-controls__container-title--secondary">
                <span>1.1 ha/h</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PollinationMap
