import { useEffect, useState } from "react"

import { getData } from "../../api/call"

const Filers = () => {
  const [filers, setFilers] = useState([])
  
  useEffect(() => {
    getData({url: '/filers'})
    .then((data) => {
      setFilers(data)
    })
    .catch((err) => console.error(err))
  }, [setFilers])
  return (
    <>
      {filers.map((filer, idx) => {

        return <p key={idx}>{filer.ein} {filer.name} {filer.addess} {filer.city} {filer.state} {filer.zipcode}</p>
      })}
    </>
  )
}

export default Filers
