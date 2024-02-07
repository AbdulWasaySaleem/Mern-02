import { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Price } from "../Components/Price";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import Carousil from "../Carousil";
import Buttonscrollup from "./Buttonscrollup";



const HomePage = () => {
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState([]);
  const [categories, setcategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  //Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/productcount"
      );
      console.log(data);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/productlist/${page}`
      );
      setProduct([...product, ...data.products]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //Getting All Categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/allcategory"
      );
      if (data?.success) {
        setcategories(data?.category);
        console.log(categories);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong!..");
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //getting all product from DB
  const getallproducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/productlist/${page}`
      );
      console.log(data);
      setLoading(false);
      setProduct(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Error while getting all products....");
    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getallproducts();
  }, [checked.length, radio.length]);

  //Filter by category || gettin id
  const handleFilter = (value, id) => {
    //making copy of object & if true it push id else will compare if id is equal ir remove
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((catego) => catego !== id);
    }
    setChecked(all);
    console.log(checked);
  };

  //Get Filter Produtcs
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/product/productfilter`,
        { checked, radio }
      );
      setProduct(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (checked.length > 0 || radio.length > 0) filterProduct();
  }, [checked, radio]);

  //go to top
const goToTop = ()=>{
console.log("hi")
}

  return (
    <Layout>
      <div className="row mt-3 ">
        <div className="col-md-2">
          {/* Filter by Category */}
          <div className="p-4 border rounded mb-4">
            <h4 className="text-lg font-bold mb-2 ">Filters by category</h4>
            <div className="space-y-2">
              {categories.map((categ) => (
                <Checkbox
                  key={categ._id}
                  onChange={(e) => {
                    handleFilter(e.target.checked, categ._id);
                    console.log(e.target.checked, categ._id);
                  }}
                >
                  {categ.name}
                </Checkbox>
              ))}
            </div>
          </div>

          {/* Filter by Price */}
          <div className="p-4 border rounded ">
            <h4 className="text-lg font-bold mb-2">Filters by Price</h4>
            <div className="space-y-2">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Price?.map((produ) => (
                  <div key={produ._id}>
                    <Radio value={produ.array}>{produ.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>
          <div className="flex justify-center m-2">
            <button
              className="btn btn-dark"
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-10 p-4 border rounded mb-4 ">
          <Carousil/>

          <h1 className="text-left font-bold text-xl">Best Selling</h1>
          <div className="flex flex-wrap">
            {/* All Products */}
            {product?.map((prdct) => (
              <div className="col-md-3 bg-gray-100 mb-4" key={prdct._id}>
                <div className="card shadow bg-slate-50 rounded m-1 flex flex-col h-full mb-4">
                  <img
                    className="card-img-top object-cover h-50"
                    src={`http://localhost:8080/api/v1/product/productphoto/${prdct._id}`}
                    alt={prdct.name}
                  />
                  <div className="card-body flex flex-col p-4">
                    <h5 className="card-title text-lg font-semibold mb-2 border-t-4 p-1">
                      <span className="text-gray-700 ">Name: </span>
                      {prdct.name}
                    </h5>
                    <p className="card-text flex-grow ">
                      <span className="text-gray-700 font-semibold">
                        Description:{" "}
                      </span>
                      {prdct.description.substring(0, 80)}
                    </p>
                    <div className="flex justify-between items-center mt-2 border-t-4 p-1">
                      <p className="card-text font-extrabold m-2">
                        <span className="text-gray-700 ">Price: </span>$
                        {prdct.price}
                      </p>
                    </div>
                    <div className="flex space-x-2 justify-between">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          navigate(`product/${prdct.slug}`);
                        }}
                      >
                        Details
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          setCart([...cart, prdct]);
                          toast.success("Added to cart")
                          localStorage.setItem('cart', JSON.stringify([...cart, prdct]))
                          console.log(cart)
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            {product && product.length < total && (
              <button
                className="btn btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
                disabled={loading} // Disable the button when loading
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
            <div className="flex justify-end w-full">

              <button className="btn btn-primary" onClick={goToTop}><Buttonscrollup/></button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
