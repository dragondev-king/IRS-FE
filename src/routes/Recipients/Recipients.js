import { useState, useEffect, useCallback, useMemo } from "react"
import { useSearchParams } from "react-router-dom"

import DataTable from "../../components/DataTable"
import { getData } from "../../api/call"
import SideBar from "../../components/SideBar"
import Filter from "../../components/Filter"
import { sideBarItems, organizationFields } from "../../constants"

const Recipients = () => {
  const [loading, setLoading] = useState(true)
  const [recipients, setRecipients] = useState([])
  const [filings, setFilings] = useState([])
  const [searchParams, setSearchParams] = useSearchParams({})
  
  useEffect(() => {
    setLoading(true)
    getData({url: '/recipients'})
    .then((data) => {
      setRecipients(data)
      setLoading(false)
    })
    .catch((err) => console.error(err))
  }, [setRecipients])

  useEffect(() => {
    setLoading(true)
    getData({url: '/filings'})
    .then((data) => {
      setFilings(data)
      setLoading(false)
    })
    .catch((err) => console.error(err))
  }, [setFilings])

  const filingOptions = useMemo(() =>[
    {label: 'All', value: ''},
    ...filings ? filings.map((filing) => ({
      value: filing.id,
      label: filing.id.toString()
    })) : []
  ],[filings]
  )

  const statesArray = useMemo(() => recipients.map(recipient => recipient.state), [recipients])
  const stateOptions = useMemo(() =>[
    {label: 'All', value: ''},
    ...Array.from(new Set(statesArray)).map((state) => ({
      value: state,
      label: state
    }))
  ],[statesArray]
  )

  const amountOptions = useMemo(() =>[
    {label: 'All', value: ''},
    ...filings ? filings.map((filing) => ({
      value: filing.amount,
      label: filing.amount.toString()
    })) : []
  ],[filings]
  )

  const handleFilingChange = useCallback((id) => {
    const params = Object.fromEntries([...searchParams])
    if (id) {
      setSearchParams({...params, filing: id})
    } else {
      setSearchParams({})
    }
  }, [setSearchParams, searchParams])

  const handleAmountChange = useCallback((amount) => {
    const params = Object.fromEntries([...searchParams])
    if (amount) {
      setSearchParams({...params, amount})
    } else {
      setSearchParams({})
    }
  }, [setSearchParams, searchParams])

  const handleStateChange = useCallback((state) => {
    const params = Object.fromEntries([...searchParams])
    if (state) {
      setSearchParams({...params, state})
    } else {
      setSearchParams({})
    }
  }, [setSearchParams, searchParams])

  useEffect(() => {
    setLoading(true)
    getData({url: '/recipients', params: searchParams})
    .then((data) => {
      setRecipients(data)
      setLoading(false)
    })
    .catch((err) => console.error(err))
  }, [searchParams])

  return (
    <div className="container">
      <div className="row"> 
        <div className="col-3">
          <SideBar items={sideBarItems}/>
          <p className="mt-5">Select Filing ID</p>
          { !loading &&<Filter options={filingOptions} onFilterChange={handleFilingChange} />}
          <p className="mt-2">Select Amount</p>
          { !loading &&<Filter options={amountOptions} onFilterChange={handleAmountChange} />}
          <p className="mt-2">Select State</p>
            { !loading &&<Filter options={stateOptions} onFilterChange={handleStateChange} />}
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
