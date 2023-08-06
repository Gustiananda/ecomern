import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { Flex, Box } from "@chakra-ui/layout";
import { InputGroup, Input, InputRightElement, Button, Select, Tooltip, chakra, Icon } from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi'

const HeaderV2 = () => {
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
    navigate('/login')
  };
  const navigate = useNavigate()
  // const onChangeSelect = () => {
  //   navigate('/login')
  // }
  const userType = auth.user.role === 1 ? 'admin' : 'user';

  return (
    <Flex bgColor="gray.100" id="headerApp" alignItems="center" p="3" justifyContent="space-between">
      <Box>
        <Link to="/" className="navbar-brand">
          🛒 Zaurach.Co
        </Link>
      </Box>
      <Box>
        <InputGroup size='md'>
          <Input
            pr='4.5rem'
            type='text'
            placeholder='Cari...'
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm'>
              Search
        </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
      <Flex alignItems="center" gap="3" px="3">
        <Select onChange={handleLogout} placeholder='Pilih User'>
          <option value='admin'>Admin</option>
          <option value='user'>Customer</option>
        </Select>
        {userType === 'user' && <Box>
          <Tooltip
            label="Cart"
            bg="white"
            placement={'top'}
            color={'gray.800'}
            fontSize={'1.2em'}>
            <chakra.a href={'/user/cart'} display={'flex'}>
              <Icon as={FiShoppingCart} h={5} w={5} alignSelf={'center'} />
            </chakra.a>
          </Tooltip>
        </Box>
        }
      </Flex>
    </Flex>
  )


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
                          to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                            }`}
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
              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink to="/user/cart" className="nav-link fs-6">
                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HeaderV2;
