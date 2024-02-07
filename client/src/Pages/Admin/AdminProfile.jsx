import React from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/AdminMenu";
import { useAuth } from "../../context/authContext";
import { NavLink } from "react-router-dom";

const AdminProfile = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
     <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div
          className="col-md-9 d-flex align-items-center"
          style={{
            background: "#f3f4f6",
            height: "85vh",
          }}
        >
       
          <div className="flex justify-center row m-auto bg-gray-100 p-8 rounded-md shadow-xl w-3/4 h-">
          <h1 className="text-center font-bold text-xl"> Admin Profile</h1>
            <div className="w-full ">
            
              <div className="border-b-2 border-gray-500 mb-4">
                <div className="ml-4">
                  <label className="text-gray-700">Name</label>
                  <p className="text-gray-900">{auth.user.name}</p>
                </div>
              </div>
              <div className="border-b-2 border-gray-500 mb-4">
                <div className="ml-4">
                  <label className="text-gray-700">Age</label>
                  <p className="text-gray-900">25</p>
                </div>
              </div>

              <div className="border-b-2 border-gray-500 mb-4">
                <div className="ml-4">
                  <label className="text-gray-700">Email</label>
                  <p className="text-gray-900">{auth.user.email}</p>
                </div>
              </div>
              <div className="border-b-2 border-gray-500 mb-4 ">
                <div className="ml-4">
                  <label className="text-gray-700">Phone</label>
                  <p className="text-gray-900">{auth.user.phone}</p>
                </div>
              </div>
              <div className="border-b-2 border-gray-500 mb-4">
                <div className="ml-4">
                  <label className="text-gray-700">Address</label>
                  <p className="text-gray-900">{auth.user.address}</p>
                </div>
              </div>
              <div className="border-b-2 border-gray-500 mb-4">
                <div className="ml-4">
                  <label className="text-gray-700">Role</label>
                  <p className="text-gray-900">Admin {auth.user.role}</p>
                </div>
              </div>
              <div>
                <NavLink to="/">
                  <button className='btn btn-primary'>Go Back</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default AdminProfile;
