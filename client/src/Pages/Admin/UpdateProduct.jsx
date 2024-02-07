import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("")
  //Buildin
  const navigate = useNavigate();
  const params = useParams();

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/getproduct/${params.slug}`
      );
      //fullfilling above state || for further update we can do changes on variable of usestate
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setCategory(data.product.category._id);
      setQuantity(data.product.quantity);
      //Photo on bassis of id
      setId(data.product._id)
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong....");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);
  //get all categories || from category route
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/allcategory"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong!..");
    }
  };

  //creating product || btn
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/editproduct/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product Updated Successfully!");
       
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong!..");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleDelete = async()=>{
try {
  let answer = window.prompt("Are You Sure You want to delete?")
  if(!answer) return
  const {data} = await axios.delete(`http://localhost:8080/api/v1/product/delete/${id}`)
  toast.success("Product Deleted!")
} catch (error) {
  console.error(error);
      toast.error("Something Went Wrong While Deleting!..");
}
  }
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
            }}
          >
            <div className="p-4 ">
              <h1 className="text-2xl font-bold mb-3 mt-2">Update Product</h1>
              {/*Search with all category from DB*/}
              <div className="p-4 border-4">
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  value={category}
                >
                  {categories.map((categ) => (
                    <Option key={categ._id} value={categ._id}>
                      {categ.name}
                    </Option>
                  ))}
                </Select>

                <div className="flex items-center justify-center border-2">
                  <div className=" w-1/2 p-4">
                    <label className="btn btn-primary flex items-center justify-center">
                      {photo ? photo.name : "Upload Photo"}
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => {
                          setPhoto(e.target.files[0]);
                        }}
                        hidden
                      />
                    </label>

                    <div className="mt-4">
                      {photo ? (
                        <div className="text-center">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt="photo"
                            className="img img-responsive"
                            style={{
                              maxHeight: "200px",
                              maxWidth: "100%",
                              display: "inline-block",
                            }}
                          />
                        </div>
                      ) : (
                        <div className="text-center">
                          <img
                            src={`http://localhost:8080/api/v1/product/productphoto/${id}`}
                            alt="photo"
                            className="img img-responsive"
                            style={{
                              maxHeight: "200px",
                              maxWidth: "100%",
                              display: "inline-block",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className=" w-1/2 p-4">
                    <div className="mb-3">
                      <input
                        type="text"
                        value={name}
                        placeholder="Write Name of Product"
                        className="form-control"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <textarea
                        rows={4}
                        value={description}
                        placeholder="Write description of Product"
                        className="w-full rounded-md p-2"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <input
                        type="number"
                        value={price}
                        placeholder="Write Price of Product(100-200)"
                        className="form-control"
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <input
                        type="number"
                        value={quantity}
                        placeholder="Write Quantity of Product(10-20)"
                        className="form-control"
                        onChange={(e) => {
                          setQuantity(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <Select
                        placeholder="Set Shipping"
                        size="large"
                        showSearch
                        className="form-select mb-3"
                        bordered={false}
                        onChange={(value) => {
                          setShipping(value);
                        }}
                        value={shipping ? "Yes" : "No"}
                      >
                        <Option value="0">No</Option>
                        <Option value="1">Yes</Option>
                      </Select>
                    </div>

                    <div className="mb-3">
                      <button className="btn btn-primary" onClick={handleUpdate} >
                        Update Product
                      </button>
                    </div>
                    {/* Delete */}
                    <div className="mb-3">
                      <button className="btn btn-danger" onClick={handleDelete}>
                        Delete Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
