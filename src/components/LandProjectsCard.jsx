import React from 'react'
import { Checkbox, Loader } from '@mantine/core'
import CustomList from './CustomList'

const LandProjectsCard = ({
  landProjects,
  handleSelectedProject,
  isLoading,
}) => {
  return (
    <div className="card">
      <p className="card-title card-title--main">PROYECTO</p>
      <div className="card-body--list-info">
        <div className="card-row card-title--secondary card__list-value">
          {isLoading ? (
            <div className="loader-container">
              <Loader color="rgba(63, 105, 0, 0.8)" size={30} />
            </div>
          ) : (
            <React.Fragment>
              <CustomList
                items={landProjects}
                fieldNames={['name']}
                handleSelectedItem={handleSelectedProject}
                areItemsSelectable={!isLoading}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

export default LandProjectsCard
