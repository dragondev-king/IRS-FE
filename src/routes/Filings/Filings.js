import { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import DataTable from '../../components/DataTable'
import SideBar from '../../components/SideBar'
import Filter from '../../components/Filter'
import { getData } from '../../api/call'
import { sideBarItems, filingFields } from '../../constants'

const Filings = () => {
  const [loading, setLoading] = useState(true)
  const [filings, setFilings] = useState([])
  const [filers, setFilers] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  
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

  const handleFilerChange = useCallback((id) => {
    if (id) {
      setSearchParams({filer: id})
    } else {
      setSearchParams({})
    }
  }, [setSearchParams])

  useEffect(() => {
    setLoading(true)
    getData({url: '/filings', params: searchParams})
    .then((data) => {
      setFilings(data)
      setLoading(false)
    })
    .catch((err) => console.error(err))
  }, [searchParams])

  return (
    <div className="container">
      <div className="row"> 
        <div className="col-3">
          <SideBar items={sideBarItems} />
          <p className='mt-5'>Select Filer</p>
          <Filter options={filerOptions} onFilterChange={handleFilerChange} />
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
