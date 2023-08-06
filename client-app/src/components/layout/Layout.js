import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import HeaderV2 from "./HeaderV2";


const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>

        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>

      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}</main>
      <Footer />
    </div>
  );
};

const LayoutAdmin = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <HeaderV2 />
      <main >
        <Toaster />
        {children}</main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app - Zaurach.co",
  description: "Toko Online Berkualitas",
  keywords: "ecommerce,zaurach,tokobaju",
  author: "kikiii"
}


export default Layout;

export {
  LayoutAdmin
}