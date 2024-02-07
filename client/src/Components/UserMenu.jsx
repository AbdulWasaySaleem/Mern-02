import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
//cilUser
const UserMenu = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <div
        style={{
          background: "#f3f4f6",
          height: "85vh",
        }}
      >
        <div className="text-center">
          <div className="list-group">
            <div className="mt- font-bold m-2 border-b-4 text-lg">
              {auth.user.role === 1 ? (
                <p>
                  ADMIN PANEL
                  <p>Hello Admin, {auth.user.name}</p>
                </p>
              ) : (
                `Hello, ${auth.user.name}`
              )}
            </div>

            <div className="m-4  flex justify-center">
              <img
                className="w-52 h-52 rounded-full"
                src="https://i.pinimg.com/564x/14/a0/9c/14a09c943e7b0b75da636c5ea23df82a.jpg"
              />
            </div>
            <div className="">
              <NavLink
                to="/dashboard/user/profiles"
                className="list-group-item list-group-item-action flex items-center"
              >
                <div className="ml-10">
                  <AccountCircleIcon />
                  <span className="ml-2">Profile</span>
                </div>
              </NavLink>

              <NavLink
                to="/dashboard/user/orders"
                className="list-group-item list-group-item-action flex items-center "
              >
                <div className="ml-10">
                  <AddBoxIcon />
                  <span className="ml-2">Orders</span>
                </div>
              </NavLink>

              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
