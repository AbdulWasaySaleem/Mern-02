import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Layout from "../Components/Layout";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { useAuth } from "../context/authContext";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Cartpage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  //Getting token
  const [clientToken, setClientToken] = useState("");
  const [instance, setinstance] = useState("");
  const [loading, setLoading] = useState(false);
  //navigate
  const navigate = useNavigate();

  //SubTOtal
  const subtotal = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-Us", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //Total
  const total = () => {
    try {
      // Add $2 to the subtotal
      const subtotalAmount = parseFloat(subtotal().replace(/[^\d.]/g, ""));
      const totalAmount = subtotalAmount + 2;

      return totalAmount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //remove item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  //Get PAyment Gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );
      console.log(data);
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="">
          <div className="col-md-12 row mx-auto d-flex justify-content-center align-items-center">
            <div className="text-center font-extrabold ">
              <h1>{`Hello ${auth?.token && auth?.user?.name}`}</h1>
              <h4>
                {cart?.length > 0
                  ? `You have ${cart.length} item${
                      cart.length ? "s" : ""
                    } in your cart${auth?.token ? "" : ", please login first"}`
                  : "Your cart is empty"}
              </h4>
            </div>
          </div>
        </div>
        {/* Cart Stuffs */}

        <div className="bg-gray-100 h-screen py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-3/4">
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left font-semibold">Product</th>
                        <th className="text-left font-semibold">Price</th>
                        <th className="text-left font-semibold">Quantity</th>
                        <th className="text-left font-semibold">Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {cart?.map((product) => (
                        <tr key={product._id}>
                          <td className="py-4">
                            <div className="flex items-center">
                              <img
                                className="h-16 w-16 mr-4"
                                src={`http://localhost:8080/api/v1/product/productphoto/${product._id}`}
                                alt={product.name}
                              />
                              <span className="font-semibold">
                                {product.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-4">${product.price}</td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <button
                                className="border rounded-md py-2 px-4 mr-2"
                                onClick={() => {
                                  removeCartItem(product._id);
                                }}
                              >
                                -
                              </button>
                              <span className="text-center w-8">1</span>
                              <button className="border rounded-md py-2 px-4 ml-2">
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-4">${product.price}</td>
                        </tr>
                      ))}

                      {/* More product rows */}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="md:w-1/4">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-4">Summary</h2>
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>{subtotal()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Taxes</span>
                    {cart?.length > 0 ? <span>$2.00</span> : <p>$0</p>}
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Total</span>
                    {cart?.length > 0 ? (
                      <span className="font-semibold">{total()}</span>
                    ) : (
                      <p>$0</p>
                    )}
                  </div>
                  {!clientToken || !cart?.length ? (
                    ""
                  ) : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: { flow: "vault" },
                        }}
                        onInstance={(instance) => setinstance(instance)}
                      />
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                        onClick={handlePayment}
                      >
                        {loading ? "Processing" : "Checkout"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cartpage;
