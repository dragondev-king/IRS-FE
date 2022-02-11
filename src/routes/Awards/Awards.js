import { useState, useEffect } from 'react'

import DataTable from '../../components/DataTable'
import { getData } from '../../api/call'

const Awards = () => {
  const [loading, setLoading] = useState(true)
  const [awards, setAwards] = useState([])
  
  useEffect(() => {
    setLoading(true)
    getData({url: '/awards'})
    .then((data) => {
      setAwards(data)
      setLoading(false)
    })
    .catch((err) => console.error(err))
  }, [setAwards])
  return (
    <div className="container">
      {loading && <div>Loading ...</div>}
      {!loading && 
        <DataTable data={awards} fieldNames={['amount', 'purpose', 'tax_period']} tableName='Awards'/>
      }
    </div>
  )
}

export default Awards
