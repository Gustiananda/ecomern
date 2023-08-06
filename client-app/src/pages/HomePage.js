import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { Box, VStack, Text, chakra, Icon, Flex, Tooltip, Button, Image } from '@chakra-ui/react'
import { toFormatPrice } from "../utils/currency";
import { FiShoppingCart } from 'react-icons/fi';
import { AiOutlineEye } from "react-icons/ai";
import { useAuth } from "../context/auth";

const HomePage = () => {
  const [auth] = useAuth();
  const userType = auth.user?.role === 1 ? 'admin' : 'user';
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(1);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  //get Total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //filter produk
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  //get filter produk
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="container-fluid row">
        <VStack py="1.5rem" bgColor="gray.100" alignItems="flex-start" spacing={4} boxShadow='md' className="col-md-2">
          <Box>
            <Text fontSize="md" fontWeight="600">
              Filter By Category
            </Text>
            <VStack ml=".8rem" alignItems="flex-start">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.nama}
                </Checkbox>
              ))}
            </VStack>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="600">
              Filter By Prices
            </Text>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              <VStack ml=".8rem" alignItems="flex-start">
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.nama}</Radio>
                  </div>
                ))}
              </VStack>
            </Radio.Group>
          </Box>
        </VStack>
        <div className="col-md-9 py-4">
          <h1 className="text-center fs-2">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Box
                width="18rem"
                bg='white'
                // maxW="sm"
                borderWidth="1px"
                rounded="lg"
                m="2"
                shadow="lg"
                position="relative">
                {/* {data.isNew && (
                  <Circle
                    size="10px"
                    position="absolute"
                    top={2}
                    right={2}
                    bg="red.200"
                  />
                )} */}

                <Image
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt={p.nama}
                  roundedTop="lg"
                  className="card-img-top"
                />

                <Box p="6">
                  {/* <Box d="flex" alignItems="baseline">
                    {data.isNew && (
                      <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                        New
                      </Badge>
                    )}
                  </Box> */}
                  <Flex mt="1" justifyContent="space-between" alignContent="center">
                    <Box
                      fontSize="2xl"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated>
                      {p.nama}
                    </Box>
                  </Flex>

                  <Flex justifyContent="space-between" alignContent="center">
                    <Box fontSize="2xl" color='gray.800'>
                      <Box as="span" color={'gray.600'} fontSize="lg">
                        Rp{' '}
                      </Box>
                      {toFormatPrice(p.price, 'IDR')}
                    </Box>
                  </Flex>
                  <Text mt="2" color={'gray.500'}>
                    {p.description.substring(0, 60)}...
                  </Text>
                  <VStack spacing={2} w="full">
                    {userType === 'user' &&
                      <Button
                        w="full"
                        colorScheme="green"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item berhasil dimasukan keranjang");
                        }}
                        rightIcon={<FiShoppingCart />}
                      >
                        Add to cart
                  </Button>
                    }
                    <Button w="full"
                      onClick={() => navigate(`/product/${p.slug}`)}
                      colorScheme='blue'
                      rightIcon={<AiOutlineEye />}
                    >
                      Lihat Detail
                    </Button>
                  </VStack>
                </Box>
              </Box>

              // <div class="card m-2" style={{ width: "18rem" }}>
              //   <img
              //     src={`/api/v1/product/product-photo/${p._id}`}
              //     class="card-img-top"
              //     alt={p.nama}
              //   />
              //   <div class="card-body">
              //     <h5 class="card-title"> {p.nama}</h5>
              //     <p class="card-text">{p.description.substring(0, 30)}...</p>
              //     <p class="card-text">Rp. {p.price}</p>
              //     <button
              //       class="btn btn-primary ms-1"
              //       onClick={() => navigate(`/product/${p.slug}`)}
              //     >
              //       Lihat Detail
              //     </button>
              //     <button
              //       class="btn btn-secondary ms-1"
              //       onClick={() => {
              //         setCart([...cart, p]);
              //         localStorage.setItem(
              //           "cart",
              //           JSON.stringify([...cart, p])
              //         );
              //         toast.success("Item berhasil dimasukan keranjang");
              //       }}
              //     >
              //       Add to cart
              //     </button>
              //   </div>
              // </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
