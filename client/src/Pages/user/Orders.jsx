import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import UserMenu from "../../Components/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  //Getting order
  const getOrder = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/auth/orders"
      );
      setOrders(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth?.token]);
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div
            className="col-md-9"
            style={{
              background: "#f3f4f6",
              height: "85vh",
            }}
          >
            <h1 className="text-2xl font-semibold m-4 ">All Orders</h1>

            {orders?.map((o, i) => (
              <div className="border shadow" key={o?._id}>
                <table className="table">
                  <thead>
                    <tr>
                      <td scope="col">#</td>
                      <td scope="col">Product</td>
                      <td scope="col">Status</td>
                      <td scope="col">Buyer</td>
                      <td scope="col">Orders</td>
                      <td scope="col">Payment</td>
                      <td scope="col">Quantity</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td className="w-64">
                        {o?.products?.map((product) => product.name).join(", ")}
                      </td>
                      <td>{o?.status}</td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
