import { useState, useEffect } from 'react'

import DataTable from '../../components/DataTable'
import { getData } from '../../api/call'

const Filings = () => {
  const [loading, setLoading] = useState(true)
  const [filings, setFilings] = useState([])
  
  useEffect(() => {
    setLoading(true)
    getData({url: '/filings'})
    .then((data) => {
      setFilings(data)
      setLoading(false)
    })
    .catch((err) => console.error(err))
  }, [setFilings])
  return (
    <div className="container">
      {loading && <div>Loading ...</div>}
      {!loading && 
        <DataTable data={filings} fieldNames={['filer_name', 'recipient_name']} tableName='Filings'/>
      }
    </div>
  )
}

export default Filings
