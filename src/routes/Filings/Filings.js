import { useState, useEffect, useMemo } from 'react'

import DataTable from '../../components/DataTable'
import SideBar from '../../components/SideBar'
import Filter from '../../components/Filter'
import { getData } from '../../api/call'
import { sideBarItems, filingFields } from '../../constants'

const Filings = () => {
  const [loading, setLoading] = useState(true)
  const [filings, setFilings] = useState([])
  const [filers, setFilers] = useState([])
  
  useEffect(() => {
    setLoading(true)
    getData({url: '/filings'})
    .then((data) => {
      setFilings(data)
      setLoading(false)
    })
    .catch((err) => console.error(err))
  }, [setFilings])

  useEffect(() => {
    getData({url: '/filers'})
    .then((data) => {
      setFilers(data)
    })
    .catch((err) => console.error(err))
  }, [setFilers])

  const filerOptions = useMemo(() =>[
    {label: 'All', value: ''},
    ...filers ? filers.map((filer) => ({
      value: filer.id,
      label: filer.name
    })) : []
  ],[filers]
  )

  return (
    <div className="container">
      <div className="row"> 
        <div className="col-3">
          <SideBar items={sideBarItems}/>
          <Filter options={filerOptions} />
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
