import React, { useState, useEffect } from "react";
import AdminMenu from "../../Components/AdminMenu";
import Layout from "../../Components/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/authContext";
import moment from "moment";
import { Select } from "antd";

const { Option } = Select;
const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliver",
    "cancel",
  ]);
  const [changedStutus, setChangedStutus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  //Getting order
  const getOrder = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/auth/allorders"
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
  //
  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/auth/orderstatus/${orderId}`,
        { status: value }
      );
      getOrder();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">ALl Orders</h1>
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
                      <td>
                        <Select
                          border={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((stat, index) => (
                            <Option key={index} value={stat}>
                              {stat}
                            </Option>
                          ))}
                        </Select>
                      </td>
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
      </Layout>
    </>
  );
};

export default AdminOrders;
