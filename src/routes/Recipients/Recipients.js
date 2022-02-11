import { useState, useEffect } from "react"

import DataTable from "../../components/DataTable"
import { getData } from "../../api/call"

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
      {loading && <div>Loading ...</div>}
      {!loading && 
        <DataTable data={recipients} fieldNames={['ein', 'name', 'address', 'city', 'city', 'zipcode']} tableName='Recipients'/>
      }
    </div>
  )
}

export default Recipients
