import { Checkbox, em } from '@mantine/core'
import { useState } from 'react'

const CustomList = ({
  items,
  fieldNames,
  handleSelectedItem,
  areItemsSelectable,
}) => {
  return (
    <ul className="items__list">
      {items.map((item) => {
        let text = ''

        for (let idx = 0; idx < fieldNames.length; idx++) {
          const fieldValue = item[fieldNames[idx]]

          if (fieldValue) {
            if (idx === 0) text += fieldValue
            else text += ` - ${fieldValue}`
          }
        }

        return (
          <li key={item.id} className="items__list-container">
            <div>
              <Checkbox
                disabled={!areItemsSelectable}
                checked={item.isSelected}
                onChange={() => handleSelectedItem(item.id)}
                color={'#666'}
              />
            </div>
            <div>{text}</div>
          </li>
        )
      })}
    </ul>
  )
}

export default CustomList
