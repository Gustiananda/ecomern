import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PagenotFound from "./pages/PagenotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import UserOrders from "./pages/user/Orders";
// import CreateOrder from "./pages/user/CreateOrder";
import Profile from "./pages/user/Profile";
// import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
// import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminCustomer from "./pages/Admin/AdminCustomer";
import AdminDetailCustomer from "./pages/Admin/AdminDetailCustomer";
import AdminListProduct from "./pages/Admin/AdminListProduct";
import AdminDetailProduk from "./pages/Admin/AdminDetailProduk";
import AdminListShipping from "./pages/Admin/AdminListShipping";
import AdminReport from "./pages/Admin/AdminReport";
import { useEffect, useState } from "react";
import UserDashboard from "./pages/user/UserDashboard";
import UserBuktiPayment from "./pages/user/UserBuktiPayment";
import CartUser from "./pages/user/Cart";
import UserPayment from "./pages/user/UserPayment";


function App() {
  const [scrollTop, setScrollTop] = useState(0);


  const onScorllModalBody = () => {
    // Get the navbar
    let navbar;
    let sidebar;
    let modalBody;

    if (typeof window !== 'undefined') {
      modalBody = document.getElementById('headerApp');
      navbar = document.getElementById('sidebarApp');
    }

    // Get the offset position of the navbar
    let sticky = navbar?.offsetTop;
    let stickySidebar = sidebar?.offsetTop;
    // When the user scrolls the page, execute myFunction
    if (typeof window !== 'undefined') {
      // window.onscroll = function () {
      handleScroll();
      // };
    }

    function handleScroll() {
      if (window.pageYOffset >= modalBody?.offsetHeight) {
        navbar?.classList.add('stickySidebar');
      } else {
        navbar?.classList.remove('stickySidebar');
      }
    }
  };

  // useEffect(() => {
  //   onScorllModalBody()
  // },[])

  useEffect(() => {
    const onScroll = e => {
      setScrollTop(e.target.documentElement.scrollTop);
      onScorllModalBody();
      // setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  return (
    <>
      <Routes> 
        {/* PUBLIC ROUTE       */}
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        {/* USER FIX ROUTE */}
        <Route path="/user" element={<PrivateRoute />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="cart" element={<CartUser />} />
          <Route path="customer" element={<Profile />} />
          <Route path="paymant" element={<UserPayment />} />
          <Route path="bukti-paymant" element={<UserBuktiPayment />} />
          <Route path="orders" element={<UserOrders />} />
          {/* <Route path="user/create-order" element={<CreateOrder />} /> */}
          {/* <Route path="user/profile" element={<Profile />} /> */}
        </Route>
        {/* ADMIN FIX ROUTE */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="customer" element={<AdminCustomer />} />
          <Route path="customer/:id" element={<AdminDetailCustomer />} />
          <Route path="produk" element={<AdminListProduct />} />
          <Route path="statistik" element={<AdminReport />} />
          <Route path="produk/:id" element={<AdminDetailProduk />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="shipping" element={<AdminListShipping />} />
          <Route path="produk/create" element={<CreateProduct />} />
          <Route path="product/:slug" element={<UpdateProduct />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<AdminOrders />} />
          {/* <Route path="products" element={<Products />} /> */}
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PagenotFound />} />
      </Routes>
    </>
  );
}

export default App;
