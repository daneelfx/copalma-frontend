import React from 'react'

const LinesPairInfo = ({
  startLine,
  endLine,
  numPalmsStartLine,
  numPalmsEndLine,
}) => {
  return (
    <React.Fragment>
      <div className="number-container number-container--start-line">
        <span className="label__title label__title--start">INICIAL</span>
        <span className="lines-pair__value">{startLine}</span>
        <span className="lines-pair__number-palms">{numPalmsStartLine}</span>
      </div>
      <div className="number-container number-container--end-line">
        <span className="label__title label__title--end">FINAL</span>
        <span className="lines-pair__value">{endLine}</span>
        <span className="lines-pair__number-palms">{numPalmsEndLine}</span>
      </div>
      <div className="lines-pair-container__total_palms">
        <span>
          TOTAL PALMAS:{' '}
          {startLine === endLine
            ? numPalmsStartLine
            : numPalmsStartLine + numPalmsEndLine}
        </span>
      </div>
    </React.Fragment>
  )
}

export default LinesPairInfo
