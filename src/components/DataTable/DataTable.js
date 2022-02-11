const DataTable = ({ data, fieldNames, tableName }) => {
  return (
    <div>
      <h2 className="text-center">{tableName}</h2>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {fieldNames.map((field, idx) => (
              <th key={idx}>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              {fieldNames.map((field, key) => (
                <td key={key}>{item[field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
