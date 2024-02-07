import { Link } from "react-router-dom";
import AdminMenu from "../../Components/AdminMenu";
import Layout from "../../Components/Layout";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 d-flex align-items-center justify-content-center">
            <div>
              <h1 className="text-4xl font-bold mb-6">Welcome to Your Dashboard</h1>
              <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">
                Go to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
