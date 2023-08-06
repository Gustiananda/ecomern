import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React, { useState } from "react";
import AppTemplate from "../../components/AppTemplate";
import { LayoutAdmin } from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { Image } from "@chakra-ui/image";
import { useAuth } from "../../context/auth";
import { useSelectedOrder } from "../../context/selectedOrder";
import axios from "axios";
import { createStandaloneToast } from "@chakra-ui/react";
import toast from "react-hot-toast";

const UserBuktiPayment = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(undefined);
  const [auth] = useAuth();
  const [selectedOrder, setSelectedOrder] = useSelectedOrder();
  const toastChakra = createStandaloneToast();
  const [form, setForm] = useState({
    address: auth?.user?.adddress,
    phone: auth?.user?.phone,
    nama: auth?.user?.nama,
  });

  const onChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const gotoPesananSaya = () => {
    navigate("/user/orders");
  };

  const postCreateOrder = async (e) => {
    e.preventDefault();
    try {
      let idProduct = selectedOrder.map((prdct) => prdct._id);
      idProduct = JSON.stringify(idProduct);
      const orderData = new FormData();
      orderData.append("nama", form.nama);
      orderData.append("address", form.address);
      orderData.append("phone", form.phone);
      orderData.append("products", idProduct);
      orderData.append("photo", photo);
      orderData.append("paymentType", "transfer");
      const { data } = axios.post("/api/v1/order/create-orders", orderData);
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toastChakra.toast({
          status: "success",
          duration: 5000,
          title: "Berhasil",
          description: "Berhasil membuat pesanan",
          position: "bottom-right",
        });
        navigate("/user/orders");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const isDisabledBtn = () => {
    if (
      !(
        form.nama &&
        form.phone &&
        form.address &&
        selectedOrder.length > 0 &&
        photo
      )
    ) {
      return true;
    }
    return false;
  };

  const thumbs = () => {
    if (URL) {
      const url = URL.createObjectURL(photo);

      return (
        <Box>
          <Image
            src={url}
            // width='full'
            // height='full'
            objectFit="contain"
            objectPosition="center"
          />
          {/* <Button w='full' size='xs' onClick={() => handleRemoveImages(key)}>
              Hapus
            </Button> */}
        </Box>
      );
    }
  };

  return (
    <LayoutAdmin>
      <AppTemplate>
        <Box p="3" w="full">
          <Flex w="full">
            <Button onClick={gotoPesananSaya} colorScheme="blue">
              PESANAN SAYA
            </Button>
            {/* <Center> */}
            <Box maxW="1200px" w="full">
              <Text
                color="gray.800"
                fontSize="40px"
                fontWeight="400"
                textAlign="center"
                m="0"
              >
                BUKTI PAYMENT
              </Text>
              <Box w="full" my="3">
                <form>
                  <FormControl my="2">
                    <FormLabel>Nama</FormLabel>
                    <Input
                      name="nama"
                      value={form.nama}
                      onChange={onChangeForm}
                      placeholder="Masukan nama"
                      type="text"
                    />
                  </FormControl>
                  <FormControl my="2">
                    <FormLabel>Address</FormLabel>
                    <Textarea
                      name="address"
                      value={form.address}
                      onChange={onChangeForm}
                      placeholder="Masukan alamat"
                    />
                  </FormControl>
                  <FormControl my="2">
                    <FormLabel>Phone</FormLabel>
                    <Input
                      name="phone"
                      value={form.phone}
                      onChange={onChangeForm}
                      placeholder="Masukan nomor telfon"
                      type="number"
                    />
                  </FormControl>
                  <FormControl my="2">
                    <FormLabel>Upload Bukti</FormLabel>
                    <label
                      className="btn btn-primary col-md-12"
                      style={{ height: "40px" }}
                    >
                      {/* {photo ? photo.nama : "Upload Foto"} */}
                      Upload Bukti
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        hidden
                      />
                    </label>
                    {photo && <div className="my-3">{thumbs()}</div>}
                  </FormControl>
                  <Text my="4" color="red">
                    *Pastikan bukti-TF sesuai, jika tidak sesuai tidak akan
                    diproses, silakan ulangi order
                  </Text>
                  <Button
                    isDisabled={isDisabledBtn()}
                    onClick={postCreateOrder}
                    w="full"
                    my="2"
                    colorScheme="green"
                  >
                    ORDER
                  </Button>
                </form>
              </Box>
            </Box>
            {/* </Center> */}
          </Flex>
        </Box>
      </AppTemplate>
    </LayoutAdmin>
  );
};

export default UserBuktiPayment;
