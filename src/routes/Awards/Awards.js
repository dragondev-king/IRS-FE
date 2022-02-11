import { useState, useEffect } from 'react'

import DataTable from '../../components/DataTable'
import SideBar from '../../components/SideBar'
import { getData } from '../../api/call'
import { sideBarItems, awardFields } from '../../constants'

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
      <div className="row"> 
        <div className="col-3">
          <SideBar items={sideBarItems}/>
        </div>
        <div className="col-9">
          {loading && <div>Loading ...</div>}
          {!loading && 
            <DataTable data={awards} fieldNames={awardFields} tableName='Awards'/>
          }
        </div>
      </div>
    </div>
  )
}

export default Awards
