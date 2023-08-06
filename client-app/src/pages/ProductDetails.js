import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import { List, ListItem, Text } from "@chakra-ui/layout";
import { toFormatPrice } from "../utils/currency";


const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const userType = auth.user?.role === 1 ? 'admin' : 'user';

  //initial detail
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get produk
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container mt-5">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            class="card-img-top"
            alt={product.nama}
            height="400px"
            width={"100px"}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <List padding="0" spacing={1}>
            <ListItem>
              <Text as={'span'} fontSize="22px" fontWeight={'bold'}>
                Nama:
              </Text>{' '}
              <Text as={'span'} fontSize="24px">{product.nama}</Text>
            </ListItem>
            <ListItem>
              <Text as={'span'} fontSize="22px" fontWeight={'bold'}>
                Harga:
              </Text>{' '}
              <Text as={'span'} fontSize="24px">Rp.  {toFormatPrice(product.price, 'IDR')}</Text>
            </ListItem>
            <ListItem>
              <Text as={'span'} fontSize="22px" fontWeight={'bold'}>
                Kategori:
              </Text>{' '}
              <Text as={'span'} fontSize="24px">{product.category?.nama}</Text>
            </ListItem>
            <ListItem>
              <Text as={'span'} fontSize="22px" fontWeight={'bold'}>
                Deskripsi:
              </Text>{' '}
              <Text as={'span'} fontSize="24px">{product.description}</Text>
            </ListItem>
          </List>
          {userType === 'user' && (
            <button onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem(
                "cart",
                JSON.stringify([...cart, product])
              );
              toast.success("Item berhasil dimasukan keranjang");
            }} class="btn btn-secondary ms-1">Add to cart</button>
          )}
          <hr />
        </div>
        <div className="row container">
          <h6>Similar Product</h6>
          {relatedProducts.length < 1 && (
            <p className="text-center">Tidak ada produk serupa!</p>
          )}
          <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
              <div class="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p?._id}`}
                  class="card-img-top"
                  alt={p.nama}
                />
                <div class="card-body">
                  <h5 class="card-title"> {p.nama}</h5>
                  <p class="card-text">{p.description.substring(0, 30)}...</p>
                  <p class="card-text">Rp. {p.price}</p>
                  {userType === 'user' && (
                    <button onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item berhasil dimasukan keranjang");
                    }} class="btn btn-secondary ms-1">Add to cart</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
