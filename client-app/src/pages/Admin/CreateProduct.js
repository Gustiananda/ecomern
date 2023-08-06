import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout, { LayoutAdmin } from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Center, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Button } from "@chakra-ui/button";
import AppTemplate from "../../components/AppTemplate";

const { Option } = Select;
const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [nama, setNama] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [price, setPrice] = useState(" ");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(" ");
  const [action, setAction] = useState("add");
  const [selectedId, setSelectedId] = useState(undefined);
  const [shipping, setShipping] = useState(" ");
  const [photo, setPhoto] = useState(undefined);
  const [searchParams, setSearchParams] = useSearchParams();

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  const getDetailProduct = async (id) => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-detail/${id}`);
      if (data?.success) {
        setNama(data.products.nama);
        setDescription(data.products.description);
        setPrice(data.products.price);
        setCategory(data.products.category._id);
        setQuantity(data.products.quantity);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    if (searchParams.get("id")) {
      setSelectedId(searchParams.get("id"))
      setAction("edit")
      getDetailProduct(searchParams.get("id"))
      // get detail product
    }
  }, [searchParams]);

  //create product
  const handleCreate = async (e) => {
    e.preventDefault();
    if (action === 'edit') {
      try {
        const productData = new FormData();
        productData.append("nama", nama);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
        productData.append("photo", photo);
        productData.append("category", category);
        const { data } = axios.put(
          `/api/v1/product//update-product/${selectedId}`,
          productData
        );
        if (data?.success) {
          toast.error(data?.message);
        } else {
          toast.success("Produk Berhasil Ditambahkan!");
          navigate("/admin/produk");
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    } else {
      try {
        const productData = new FormData();
        productData.append("nama", nama);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
        productData.append("photo", photo);
        productData.append("category", category);
        const { data } = axios.post(
          "/api/v1/product/create-product",
          productData
        );
        if (data?.success) {
          toast.error(data?.message);
        } else {
          toast.success("Produk Berhasil Ditambahkan!");
          navigate("/admin/produk");
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    }
  };

  const thumbs = () => {
    if (action === 'edit' && photo === undefined) {
      return <Box>
        <Image
          src={`/api/v1/product/product-photo/${selectedId}`}
          objectFit='contain'
          objectPosition='center'
          alt={nama}
        />
      </Box>
    } else if (photo) {
      if (URL) {
        const url = URL.createObjectURL(photo);
        return (
          <Box>
            <Image
              src={url}
              // width='full'
              // height='full'
              objectFit='contain'
              objectPosition='center'
            />
            {/* <Button w='full' size='xs' onClick={() => handleRemoveImages(key)}>
                Hapus
              </Button> */}
          </Box>
        );
      }
    } else {
      return <></>
    }
  };

  return (
    <LayoutAdmin title={`Dashboard - ${action === "add" ? "Create" : "Update"} Product`}>
      <AppTemplate>
        <Box w="full">
          <Text color="gray.800" fontSize="40px" fontWeight="400" textAlign="center" m='0'>{action === "add" ? "CREATE PRODUCT" : "UPDATE PRODUCT"}</Text>
          <Center my="4">
            <Box w="80%">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                value={category}
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.nama}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Foto"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {/* {photo && (
                    <div className="text-center">
                      <img
                        src={`/api/v1/product/product-photo/${photo}`}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )} */}
                {thumbs()}
              </div>
              <div className="mb-3">
                <h4>Nama Produk</h4>
                <input
                  type="text"
                  placeholder="Tuliskan Nama Produk"
                  value={nama}
                  className="form-control"
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <h4>Deskripsi Produk</h4>
                <textarea
                  type="text"
                  value={description}
                  placeholder="Tuliskan Deskripsi Produk"
                  alt="Tuliskan Deskripsi Produk"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <h4>Harga</h4>
                <input
                  type="number"
                  value={price}
                  placeholder="Tuliskan Harga Produk"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <h4>Jumlah</h4>
                <input
                  type="number"
                  value={quantity}
                  placeholder="Tuliskan Jumlah Produk"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              {/* <div className="mb-3">
                <h4>Pengiriman</h4>
                <Select
                  bordered={false}
                  placeholder="Pilih Pengiriman"
                  size="large"
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">COD</Option>
                </Select>
              </div> */}
              <div className="mb-3">
                <Center w="full">
                  <button style={{ width: '100%' }} className="btn btn-primary" onClick={handleCreate}>
                    {action === "add" ? "TAMBAHKAN" : "UPDATE"} PRODUK
                  </button>
                </Center>
              </div>
            </Box>
          </Center>
        </Box>
      </AppTemplate>
    </LayoutAdmin>
  );
};

export default CreateProduct;
