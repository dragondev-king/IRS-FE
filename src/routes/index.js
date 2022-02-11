import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Filers from './Filers'
import Awards from './Awards'
import Filings from './Filings'
import Recipients from './Recipients'

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/filers' element={<Filers />}/>
        <Route path='/recipients' element={<Recipients />}/>
        <Route path='/awards' element={<Awards />}/>
        <Route path='/filings' element={<Filings />}/>
        <Route path='*' element={<Filers />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Main
