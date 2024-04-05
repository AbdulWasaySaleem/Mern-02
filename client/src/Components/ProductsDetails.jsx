import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from "../context/cart";

export const ProductsDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  console.log(params);
  const [cart, setCart] = useCart();
  //state to hold all product || in Object cause one product
  const [products, setProducts] = useState({});
  //Related product
  const [relatedProducts, setRelatedProducts] = useState([]);
  //getSimilar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/similarproduct/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(relatedProducts);

  //Get PRoduct From Parameteer
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/getproduct/${params.slug}`
      );
      console.log(data);
      setProducts(data?.product);
      console.log(products);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  return (
    <>
      <Layout>
        <div className="bg-slate-100 p-10">
          <div className="container mx-auto bg-slate-50 border-2 border-slate-500">
            <div className="flex justify-center gap-x-8 m-2">
              <div className="flex-shrink-0 w-96">
                <img
                  className="w-full h-auto"
                  src={`http://localhost:8080/api/v1/product/productphoto/${products._id}`}
                  alt={products.name}
                />
              </div>
              <div className="flex-grow border-l-4 p-4 flex flex-col justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Product Details</h1>
                  <p className="mb-2">
                    <span className="font-bold">Name:</span> {products.name}
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">Description:</span>{" "}
                    {products.description}
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">Price:</span> $ {products.price}
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">Quantity:</span>{" "}
                    {products.quantity}
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">Category:</span>{" "}
                    {products.category?.name}
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">Shipping:</span> No
                  </p>
                </div>

                <div className="flex -mx-2 mb-4">
                  <div className="w-1/2 px-2">
                    <button
                      className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                      onClick={() => {
                        setCart([...cart, products]);
                        toast.success("Added to cart");
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, products])
                        );
                        console.log(cart);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div className="w-1/2 px-2">
                    <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related products */}

          <div className="bg-slate-50 p-4">
            <h2 className="flex justify-center text-2xl md:text-3xl font-bold">
              Related Products
            </h2>
            <div className="flex justify-center m-3">
              <span>{products.category?.name}</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {relatedProducts.length !== 0 ? (
                relatedProducts.map((relpro, index) => (
                  <div
                    key={index}
                    className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                  >
                    <a href="#">
                      <img
                        src={`http://localhost:8080/api/v1/product/productphoto/${relpro._id}`}
                        alt={relpro.name}
                        className="h-80 w-72 object-cover rounded-t-xl"
                      />

                      <div className="px-4 py-3 w-72">
                        <span className="text-gray-400 mr-3 uppercase text-xs">
                          {products.category?.name}
                        </span>
                        <p className="text-lg font-bold text-black truncate block capitalize">
                          {relpro.name}
                        </p>
                        <div className="flex items-center">
                          <p className="text-lg font-semibold text-black cursor-auto my-3">
                            ${relpro.price}
                          </p>

                          <div className="ml-auto">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={20}
                              height={20}
                              fill="currentColor"
                              className="bi bi-bag-plus"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                              />
                              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                            </svg>
                          </div>
                        </div>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            navigate(`/products/${relpro.slug}`, 2000);
                          }}
                        >
                          Details
                        </button>
                      </div>
                    </a>
                  </div>
                ))
              ) : (
                <div>No Products</div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

{
  /*<div className="card" style={{ width: "100%" }}>
                      <img
                        className="card-img-top"
                        src={`http://localhost:8080/api/v1/product/productphoto/${prdct._id}`}
                        alt={prdct.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{prdct.name}</h5>
                        <p className="card-text">{prdct.description}</p>
                        <div className="flex justify-between">
                          <a href="#" className="btn btn-primary">
                            Details
                          </a>
                          <p className="card-text  font-extrabold p-2">
                            <span className="text-gray-700">Price: </span>$
                            {prdct.price}
                          </p>
                        </div>
                      </div>
                    </div> */
}
