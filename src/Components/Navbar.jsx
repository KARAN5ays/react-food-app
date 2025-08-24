import { FaCartShopping } from "react-icons/fa6";
import Logo from "../assets/Logo.png";
import { useCart } from "../Context/CartContext.jsx";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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

  // Close dropdown when clicking outside
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
    <div className="navbar-container fixed-top z-1000">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow mb-3 rounded">
        <div className="container-fluid">
          {/* Logo */}
          <a className="navbar-brand" href="#">
            <img src={Logo} alt="Logo" style={{ width: "80px" }} />
          </a>

          {/* Toggler */}
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

          {/* Menu + Search + Cart */}
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Left Menu */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Menu</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Offers</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-danger ms-2" type="button" to="/Login"onClick={(e)=>{
                  e.preventDefault();
                  setShowLoginModal(true);
                }}>Login</Link>
              </li>
            </ul>

            {/* Right Side: Search + Cart */}
            <div className="d-flex align-items-center flex-grow-1 ms-4" ref={wrapperRef}>
              <div className="input-group w-75 me-3 position-relative">
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search Any Food or Restaurant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowDropdown(true)} // show dropdown only when input focused
                />
                <button className="btn btn-primary" type="button">Search</button>

                {/* Dropdown only when typing/focused */}
                {showDropdown && (
                  <SearchFilter filteredData={filteredData} searchTerm={searchTerm} />
                )}
              </div>

              {/* Cart */}
              <div className="position-relative">
                <Link
                  to="/cart"
                  className="btn position-relative p-1 ms-3 border-0 bg-transparent"
                >
                  <FaCartShopping className="fs-4" style={{ color: "white" }} />
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {cart.length}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <LoginForm isOpen={showLoginModal}
    onClose={()=>setShowLoginModal(false)}
    />
    </>
    
  );
};

export default Navbar;
