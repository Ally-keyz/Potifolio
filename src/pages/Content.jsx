import React, { useEffect } from 'react'
import Layout from './Container'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function Content() {
 



  return (
    <>
   <Layout >
   <div className=''>
        <Outlet />
      </div>
   </Layout>

    </>
  )
}

export default Content