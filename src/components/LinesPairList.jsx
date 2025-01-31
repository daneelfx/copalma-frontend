const LinesPairList = ({
  linesPairValues,
  startLine,
  endLine,
  numPalmsStartLine,
  numPalmsEndLine,
}) => {
  return (
    <table className="employee-list-container">
      <thead>
        <tr>
          <th className="label__title"></th>
          <th className="label__title"></th>
          <th className="label__title">APLICACIONES</th>
          <th className="label__title">AREA (ha)</th>
          <th className="label__title">PALMAS</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {linesPairValues
          .toSorted((linesPairA, linesPairB) =>
            linesPairA.created_at.split('T').at(0) >
            linesPairB.created_at.split('T').at(0)
              ? 1
              : -1
          )
          .map(
            ({
              universal_id: universalId,
              created_at: createdAt,
              employee,
              first,
              second,
              third,
              num_palms: numPalms,
              area_base: areBase,
              land_parcel_palms_density: palmsDensity,
            }) => {
              const linesPairArea =
                (startLine == endLine
                  ? numPalmsStartLine
                  : numPalmsStartLine + numPalmsEndLine) / palmsDensity
              return (
                <tr key={universalId} className="employee-container">
                  <td>{createdAt.split('T').at(0)}</td>
                  <td>{employee}</td>
                  <td className="pollinations-container">
                    <div className="pollinations-container__value-container number-container">
                      <span className="number-pollinations__value">
                        {first}
                      </span>
                      <span className="number-pollinations-label">1</span>
                    </div>
                    <div className="pollinations-container__value-container number-container">
                      <span className="number-pollinations__value">
                        {second}
                      </span>
                      <span className="number-pollinations-label">2</span>
                    </div>
                    <div className="pollinations-container__value-container number-container">
                      <span className="number-pollinations__value">
                        {third}
                      </span>
                      <span className="number-pollinations-label">3</span>
                    </div>
                  </td>
                  <td className="center">
                    {areBase
                      ? `${Math.round((areBase * 100) / linesPairArea)}%`
                      : '-'}
                  </td>
                  <td className="center">{numPalms ?? '-'}</td>
                  <td>
                    <button className="card-title card-title--main card-title--button">
                      EDITAR
                    </button>
                  </td>
                </tr>
              )
            }
          )}
      </tbody>
    </table>
  )
}

export default LinesPairList
