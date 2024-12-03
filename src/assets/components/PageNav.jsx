import { useContext } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { UserContext } from "../pages/userContext";

function PageNav() {
  const { userId, setUserId } = useContext(UserContext);

  const handleLogout = () => {
    setUserId(null);
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary shadow rounded p-3 mb-2">
      <div className="container-fluid">
        <Logo />
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!userId ? (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="btn btn-success text-uppercase fw-bold me-2 p-4">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin" className="btn btn-success text-uppercase fw-bold p-4">
                    Admin Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/myTickets" className="btn btn-success text-uppercase fw-bold me-2">
                    My Tickets
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/movie" className="btn btn-success text-uppercase fw-bold me-2">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-danger text-uppercase fw-bold">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default PageNav;
