import { FaCartShopping } from "react-icons/fa6";
import Logo from "../assets/Logo.png";
import { useCart } from "../Context/CartContext.jsx";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import SearchFilter from "./SearchFilter.jsx";
import mydata from "../Food.json";
import LoginForm from "./LoginForm.jsx";

const Navbar = () => {
  const { cart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    setFilteredData(mydata);
  }, []);

  useEffect(() => {
    const results = mydata.filter((item) =>
      item.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top">
        <div className="container-fluid">
          {/* Logo */}
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img src={Logo} alt="Logo" style={{ width: "60px" }} />
          </NavLink>

          {/* Toggler for small screens */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar items */}
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Left menu */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center">
              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    "nav-link px-3 " +
                    (isActive ? "text-warning fw-bold" : "text-light")
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/menu"
                  className={({ isActive }) =>
                    "nav-link px-3 " +
                    (isActive ? "text-warning fw-bold" : "text-light")
                  }
                >
                  Menu
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/offer"
                  className={({ isActive }) =>
                    "nav-link px-3 " +
                    (isActive ? "text-warning fw-bold" : "text-light")
                  }
                >
                  Offers
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    "nav-link px-3 " +
                    (isActive ? "text-warning fw-bold" : "text-light")
                  }
                >
                  Cart
                </NavLink>
              </li>
              <li className="nav-item mt-2 mt-lg-0">
                <button
                  className="btn btn-danger w-100"
                  onClick={() => setShowLoginModal(true)}
                >
                  Login
                </button>
              </li>
            </ul>

            {/* Right side: search + cart */}
            <div
              className="d-flex align-items-center flex-grow-1 ms-lg-3 mt-3 mt-lg-0"
              ref={wrapperRef}
            >
              <div className="input-group w-100 position-relative">
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search Any Food or Restaurant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                />
                <button className="btn btn-primary" type="button">
                  Search
                </button>

                {showDropdown && (
                  <SearchFilter
                    filteredData={filteredData}
                    searchTerm={searchTerm}
                  />
                )}
              </div>

              <NavLink
                to="/cart"
                className="btn position-relative ms-3 border-0 bg-transparent"
              >
                <FaCartShopping className="fs-4 text-white" />
                {cart.length > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {cart.length}
                  </span>
                )}
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <LoginForm
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default Navbar;
