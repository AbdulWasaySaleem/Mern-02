import React from 'react'
import Layout from '../../Components/Layout'
import AdminMenu from '../../Components/AdminMenu'

const Users = () => {
  return (
    <Layout>
     <div className="container-fluid">
    <div className="row">
      <div className="col-md-3"><AdminMenu/></div>
      <div className="col-md-9">users</div>
    </div>
    </div>
  </Layout>
  )
}

export default Users