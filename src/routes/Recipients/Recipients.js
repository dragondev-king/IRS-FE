import { useState, useEffect } from "react"

import DataTable from "../../components/DataTable"
import { getData } from "../../api/call"
import SideBar from "../../components/SideBar"
import { sideBarItems, organizationFields } from "../../constants"

const Recipients = () => {
  const [loading, setLoading] = useState(true)
  const [recipients, setRecipients] = useState([])
  
  useEffect(() => {
    setLoading(true)
    getData({url: '/recipients'})
    .then((data) => {
      setRecipients(data)
      setLoading(false)
    })
    .catch((err) => console.error(err))
  }, [setRecipients])
  return (
    <div className="container">
      <div className="row"> 
        <div className="col-3">
          <SideBar items={sideBarItems}/>
        </div>
        <div className="col-9">
          {loading && <div>Loading ...</div>}
          {!loading && 
            <DataTable data={recipients} fieldNames={organizationFields} tableName='Recipients'/>
          }
        </div>
      </div>
    </div>
  )
}

export default Recipients
