import { Checkbox, em } from '@mantine/core'
import { useState } from 'react'

const EmployeesList = ({
  employees,
  handleSelectedEmployees,
  toggleAllSelectedEmployees,
  areEmployeesSelectable,
}) => {
  const [areSelected, setAreSelected] = useState(() =>
    employees.every((employee) => employee.isSelected)
  )

  return (
    <ul className="employees__list">
      {employees.map((e) => (
        <li key={e.id} className="employee__list-container">
          <span>
            <Checkbox
              disabled={!areEmployeesSelectable}
              checked={e.isSelected}
              onChange={() => handleSelectedEmployees(e.id)}
              color={e.geo.color}
            />
          </span>
          <span>
            {`${e.last_name.split(' ').at(0)} ${e.first_name.split(' ').at(0)}`}{' '}
          </span>
          {e.geo.sessions && Object.keys(e.geo.sessions).length >= 0 ? (
            <span className="employee--sessions-quantity">{`(${
              Object.keys(e.geo.sessions).length
            })`}</span>
          ) : null}
        </li>
      ))}
      <br />
      <li className="employee__list-container">
        <span>
          <Checkbox
            disabled={!areEmployeesSelectable}
            checked={employees.every((employee) => employee.isSelected)}
            onChange={() => {
              toggleAllSelectedEmployees(!areSelected)
              setAreSelected(!areSelected)
            }}
            color="#333"
          />
        </span>
        <span>SELECCIONAR TODOS</span>
      </li>
    </ul>
  )
}

export default EmployeesList
