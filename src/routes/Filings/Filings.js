import { useState, useEffect } from 'react'

import { getData } from '../../api/call'

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
    <>
      {loading && <div>Loading ...</div>}
      { !loading &&filings.map((filing, idx) => {

        return <p key={idx}>{filing.filer_id} {filing.filer_name} {filing.recipient_id} {filing.recipient_name}</p>
      })}
    </>
  )
}

export default Filings
