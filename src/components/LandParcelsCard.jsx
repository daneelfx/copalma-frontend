import React from 'react'
import { Checkbox, Loader } from '@mantine/core'

import CustomList from './CustomList'

const LandParcelsCard = ({ landParcels, handleSelectParcel, isLoading }) => {
  return (
    <div className="card">
      <p className="card-title card-title--main">LOTE</p>
      <div className="card-body--list-info">
        <div className="card-row card-title--secondary card__list-value">
          {isLoading ? (
            <div className="loader-container">
              <Loader color="rgba(63, 105, 0, 0.8)" size={30} />
            </div>
          ) : (
            <React.Fragment>
              <CustomList
                items={landParcels}
                fieldNames={['name', 'init_year']}
                handleSelectedItem={handleSelectParcel}
                areItemsSelectable={!isLoading}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

export default LandParcelsCard
