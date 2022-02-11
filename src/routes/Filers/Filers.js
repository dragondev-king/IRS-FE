import { useEffect, useState } from "react"

import DataTable from "../../components/DataTable"
import SideBar from "../../components/SideBar"
import { getData } from "../../api/call"
import { sideBarItems, organizationFields } from "../../constants"

const Filers = () => {
  const [loading, setLoading] = useState(true)
  const [filers, setFilers] = useState([])
  
  useEffect(() => {
    getData({url: '/filers'})
    .then((data) => {
      setFilers(data)
      setLoading(false)
    })
    .catch((err) => console.error(err))
  }, [setFilers])
  return (
    <div className="container">
      <div className="row"> 
        <div className="col-3">
          <SideBar items={sideBarItems}/>
        </div>
        <div className="col-9">
          {loading && <div>Loading ...</div>}
          {!loading && 
            <DataTable data={filers} fieldNames={organizationFields} tableName='Filers'/>
          }
        </div>
      </div>
    </div>
  )
}

export default Filers
