import React from 'react'
import { useLocation } from 'react-router'

import BgCurve from './menu/BgCurve'




function Home() {
  const location = useLocation()
  return (
    <div>
        
        <BgCurve/>
        {/* <h1>`Hello {user.username}`</h1> */}
        
        
        
    </div>
  )
}

export default Home