import  { useEffect, useState, } from "react";
import AdminMenu from "../../Components/AdminMenu";
import Layout from "../../Components/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate  } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate()
  // Getting all the product from backend
  const getallproducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/getproduct"
      );
      console.log(data);
      setProduct(data.product);
    } catch (error) {
      console.log(error);
      toast.error("Error while getting all products....");
    }
  };

  useEffect(() => {
    getallproducts();
  }, []);

  
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div
            className="col-md-9"
            style={{
              background: "#f3f4f6",
              height: "85vh",
              overflow: "scroll",
            }}
          >
            <h1 className="text-2xl font-bold mb-2 mt-2">All products List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center justify-center mt-10 mb-5 mx-auto">
              {product.map((prdct) => (
                <div
                  className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                  key={prdct._id}
                >
                  <Link
                    to={`http://localhost:5173/dashboard/admin/products/${prdct.slug}`}
                    className="text-black"
                  >
                    <img
                      src={`http://localhost:8080/api/v1/product/productphoto/${prdct._id}`}
                      alt="Product"
                      className="h-80 w-72 object-cover rounded-t-xl"
                    />
                    <div className="px-4 py-3 w-72">
                      <span className="text-gray-400 mr-3 uppercase text-xs">
                        Brand
                      </span>
                      <p className="text-lg font-bold text-black truncate block capitalize">
                        {prdct.name}
                      </p>
                      <div className="flex items-center">
                        <p className="text-lg font-semibold text-black cursor-auto my-3">
                          ${prdct.price}
                        </p>
                        <div className="ml-auto">
                          <button className="btn btn-primary">Edit</button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
         
        </div>
      </div>
    </Layout>
  );
};

export default Products;
