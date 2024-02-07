import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import { useCart } from "../context/cart";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
    navigate("/login");
    setIsDropdownOpen(false);
  };

  return (
    <>
      <nav className="bg-gray-800 p-3">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-lg font-bold">
            🛒MyCompany
          </Link>

          <div className="space-x-4">
            <Link to="/" className="text-white hover:border-b-[2px]">
              Home
            </Link>
           
            {!auth.user ? (
              <>
                <Link to="/login" className="text-white hover:border-b-[3px]">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:border-b-[3px]"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="relative inline-block">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="text-white hover:border-b-[3px] focus:outline-none"
                  >
                    {auth?.user?.name}
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute z-50 bg-gray-800 text-white mt-2 p-2">
                      <Link
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="block"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>

                <Link to="/Cart" className="text-white hover:border-b-[3px]">
                  Cart: {cart?.length}
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
