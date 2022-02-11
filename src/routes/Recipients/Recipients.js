import { useState, useEffect } from "react"

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
    <>
      {loading && <div>Loading ...</div>}
      { !loading &&recipients.map((recipient, idx) => {

        return <p key={idx}>{recipient.ein} {recipient.name} {recipient.addess} {recipient.city} {recipient.state} {recipient.zipcode}</p>
      })}
    </>
  )
}

export default Recipients
