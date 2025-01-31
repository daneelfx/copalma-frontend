import { DatePicker } from '@mantine/dates'

const DatesCard = ({ dates, handleDateChange }) => {
  return (
    <div className="card">
      <p className="card-title card-title--main">FECHAS</p>
      <DatePicker
        type="range"
        size="sm"
        value={dates}
        allowSingleDateInRange
        onChange={handleDateChange}
      />
    </div>
  )
}

export default DatesCard
