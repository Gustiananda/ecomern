import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  const userType = auth.user?.role === 1 ? 'admin' : 'user';

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              🛒 Zaurach.Co
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-3">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link fs-6">
                  Home
                </NavLink>
              </li>

              {/* <li class="nav-item dropdown">
                <Link
                  class="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul class="dropdown-menu">
                  <li>
                    <Link class="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link class="dropdown-item" to={`/category/${c.slug}`}>
                        {c.nama}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li> */}

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link fs-6">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link fs-6">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li class="nav-item dropdown">
                    <NavLink
                      class="nav-li fs-6"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.nama}
                    </NavLink>
                    <ul class="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/${auth?.user?.role === 1 ? "admin" : "user"
                            }/dashboard`}
                          className="dropdown-item fs-6"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item fs-6"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              {userType === 'user' ?  <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink to="/user/cart" className="nav-link fs-6">
                    Cart
                  </NavLink>
                </Badge>
              </li> : <div style={{width: '50px'}}/>
 }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
