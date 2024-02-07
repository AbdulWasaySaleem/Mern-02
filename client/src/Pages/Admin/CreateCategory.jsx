import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../Components/form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/category/createcategory",
        { name }   
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
   
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong In Input Form!..");
    }
  };

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/allcategory"
      );
      if (data?.success) {
        setCategory(data?.category);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong!..");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/updatecategory/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success("Name Updated");
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong ");
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/deletecategory/${categoryId}`
      );
      if (data.success) {
        toast.success("Category is deleted");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong ");
    }
  };

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
            <h1 className="text-2xl font-bold mb-2 mt-2">Manage Category</h1>
            <div className="p-3">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Slugs</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((categ, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{categ.name}</td>
                      <td>{"/" + categ.slug}</td>
                      <td className="gap-x-4">
                        <div className="space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(categ.name);
                              setSelected(categ);
                            }}
                            className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-red"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
                            onClick={() => {
                              handleDelete(categ._id);

                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
