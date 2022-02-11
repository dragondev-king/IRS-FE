import { useEffect, useState } from "react"

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
    <>
      {loading && <div>Loading ...</div>}
      {!loading && filers.map((filer, idx) => {

        return <p key={idx}>{filer.ein} {filer.name} {filer.addess} {filer.city} {filer.state} {filer.zipcode}</p>
      })}
    </>
  )
}

export default Filers
