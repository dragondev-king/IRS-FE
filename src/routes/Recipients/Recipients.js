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
  const [initialRecipients, setInitialRecipients] = useState([])
  const [searchParams, setSearchParams] = useSearchParams({})

  const queryObj = useMemo(() => Object.fromEntries([...searchParams]), [searchParams]) 
  
  useEffect(() => {
    setLoading(true)
    getData({url: '/recipients'})
    .then((data) => {
      setInitialRecipients(data)
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
      label: filing.id.toString(),
      value: filing.id,
    })) : []
  ],[filings]
  )

  const statesArray = useMemo(() => initialRecipients.map(recipient => recipient.state), [initialRecipients])
  const stateOptions = useMemo(() =>[
    {label: 'All', value: ''},
    ...Array.from(new Set(statesArray)).map((state) => ({
      value: state,
      label: state
    }))
  ],[statesArray]
  )

  const amountArray = useMemo(() => filings.map((filing) => filing.amount), [filings])
  const amountOptions = useMemo(() =>[
    {label: 'All', value: ''},
    ...Array.from(new Set(amountArray)).map((amount) => ({
      value: amount,
      label: amount.toString()
    }))
  ],[amountArray]
  )

  const handleFilingChange = useCallback((option) => {
    const params = Object.fromEntries([...searchParams])
    if (option?.value) {
      setSearchParams({...params, filing: option?.value})
    } else {
      delete params['filing']
      setSearchParams(params)
    }
  }, [setSearchParams, searchParams])

  const handleAmountChange = useCallback((option) => {
    const params = Object.fromEntries([...searchParams])
    if (option?.value) {
      setSearchParams({...params, amount: option?.value})
    } else {
      delete params['amount']
      setSearchParams(params)
    }
  }, [setSearchParams, searchParams])

  const handleStateChange = useCallback((option) => {
    const params = Object.fromEntries([...searchParams])
    if (option?.value) {
      setSearchParams({...params, state: option?.value})
    } else {
      delete params['state']
      setSearchParams(params)
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
          { !loading &&<Filter options={filingOptions} onFilterChange={handleFilingChange} selectedValue={{label: queryObj.filing?.toString(), value: queryObj.filing}} />}
          <p className="mt-2">Select Amount</p>
          { !loading &&<Filter options={amountOptions} onFilterChange={handleAmountChange} selectedValue={{label: queryObj.amount?.toString(), value: queryObj.amount}} />}
          <p className="mt-2">Select State</p>
            { !loading &&<Filter options={stateOptions} onFilterChange={handleStateChange} selectedValue={{label: queryObj.state, value: queryObj.state}}/>}
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
