import { useState, useEffect } from 'react'

import DataTable from '../../components/DataTable'
import SideBar from '../../components/SideBar'
import { getData } from '../../api/call'
import { sideBarItems, filingFields } from '../../constants'

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
      <div className="row"> 
        <div className="col-3">
          <SideBar items={sideBarItems}/>
        </div>
        <div className="col-9">
          {loading && <div>Loading ...</div>}
          {!loading && 
            <DataTable data={filings} fieldNames={filingFields} tableName='Filings'/>
          }
        </div>
      </div>
    </div>
  )
}

export default Filings
