import React, { useState, useContext } from "react";
import {
  AiOutlineLogout,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { motion } from "framer-motion";
import { Spinner } from "react-bootstrap";

import "./Navbar.scss";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
// import { logout } from "../../actions/userActions";
import Announcement from "../announcement/Announcement";
import Search from "./Search";
import { UserContext } from "../../context/UserContext";
import { useSelector } from "react-redux";

const Navbar = () => {
  const items = useSelector((state) => state.cart);
  const [toggle, setToggle] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const { user, setUser, setAuthenticated } = useContext(UserContext);
  const history = useHistory();

  let loading = false;

  // Sticky Menu Area
  // useEffect(() => {
  //   window.addEventListener("scroll", isSticky);
  //   return () => {
  //     window.removeEventListener("scroll", isSticky);
  //   };
  // });

  /* Method that will fix header after a specific scrollable */
  // const isSticky = (e) => {
  //   const header = document.querySelector(".links");
  //   const scrollTop = window.scrollY;
  //   scrollTop >= 150
  //     ? header.classList.add("is-sticky")
  //     : header.classList.remove("is-sticky");
  // };

  const alert = useAlert();

  const logoutHandler = () => {
    setUser(null);
    setAuthenticated(null);
    alert.success("Logged out successfully.");
  };
  return (
    <div className="nav_container">
      {/* <Announcement /> */}
      <nav className="navbar">
        <div className="container">
          <div className="left-navbar">
            <div className="d-flex align-items-center logo">
              <Link to="/">
                <h2>Anokha</h2>
              </Link>
            </div>
          </div>
          <div className="nav_links">
            <ul className="d-flex align-items-center">
              <li className="cart">
                <Link to="/cart">
                  <AiOutlineShoppingCart className="icon" size={25} />
                  <span>{items?.length}</span>
                </Link>
              </li>
              {loading ? (
                <>
                  <Spinner animation="border" className="mt-2" />
                </>
              ) : (
                <>
                  {user ? (
                    <>
                      <li>
                        <div> {user.name}</div>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            dropdown ? setDropdown(false) : setDropdown(true);
                          }}
                        >
                          {user?.name}
                        </button>
                      </li>
                      {dropdown && (
                        <div className="dropdown">
                          <Link to="/me" onClick={() => setDropdown(false)}>
                            <AiOutlineUser size={20} className="me-3" />
                            Profile
                          </Link>
                          {user?.isAdmin == true && (
                            <>
                              <Link
                                to="/admin"
                                onClick={() => setDropdown(false)}
                              >
                                <MdOutlineDashboard
                                  size={20}
                                  className="me-3"
                                />
                                Dashboard
                              </Link>
                            </>
                          )}
                          <Link to="/login" id="logout" onClick={logoutHandler}>
                            <AiOutlineLogout size={20} className="me-3" />
                            Logout
                          </Link>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                    </>
                  )}
                </>
              )}
            </ul>
          </div>
          <div className="app__navbar-menu">
            <HiMenuAlt3 onClick={() => setToggle(true)} />

            {toggle && (
              <motion.div
                whileInView={{ x: [300, 0] }}
                transition={{ duration: 0.85, ease: "easeOut" }}
              >
                <HiX onClick={() => setToggle(false)} />
                <ul>
                  <li>
                    <Link to="/" onClick={() => setToggle(false)}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" onClick={() => setToggle(false)}>
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" onClick={() => setToggle(false)}>
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" onClick={() => setToggle(false)}>
                      About
                    </Link>
                  </li>
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </nav>
      {/* <div className="links">
        <Links />
      </div> */}
    </div>
  );
};

export default Navbar;
