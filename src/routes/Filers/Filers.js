import { useEffect, useState } from "react"

import DataTable from "../../components/DataTable"
import { getData } from "../../api/call"

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
      {loading && <div>Loading ...</div>}
      {!loading && 
        <DataTable data={filers} fieldNames={['ein', 'name', 'address', 'city', 'city', 'zipcode']} tableName='Filers'/>
      }
    </div>
  )
}

export default Filers
