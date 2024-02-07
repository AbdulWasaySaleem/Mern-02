import { Link, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <>
      <Layout>
        <div
          style={{
            background: "#f3f4f6",
            height: "85vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
         
       
        <div className="min-h-screen flex flex-col justify-center items-center">
          <img
            src="https://www.svgrepo.com/show/426192/cogs-settings.svg"
            alt="Logo"
            className="mb-8 h-40"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-700 mb-4">
            Error 404
          </h1>
          <p className="text-center text-gray-500 text-lg md:text-xl lg:text-2xl mb-8">
            Page Not Found!!
          </p>
          <div className="flex space-x-4">
            <button onClick={()=>{navigate("/")}} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded">
              GoBack
            </button>
          </div>
        </div>
        </div>
      </Layout>
    </>
  );
};

export default PageNotFound;
