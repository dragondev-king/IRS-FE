import { useState, useEffect } from 'react'

import { getData } from '../../api/call'

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
    <>
      {loading && <div>Loading ...</div>}
      { !loading &&awards.map((award, idx) => {

        return <p key={idx}>{award.amount} {award.purpose} {award.taxperiod} {award.filing_id}</p>
      })}
    </>
  )
}

export default Awards
