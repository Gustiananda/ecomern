import { Button } from "@chakra-ui/button";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Divider, Box, Center, Flex, Text, VStack, Link } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React, { useState } from "react";
import AppTemplate from "../../components/AppTemplate";
import { LayoutAdmin } from "../../components/layout/Layout";
import { useCart } from "../../context/cart";
import { useSelectedOrder } from "../../context/selectedOrder";
import { Image } from "@chakra-ui/image";
import { toFormatPrice } from "../../utils/currency";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  createStandaloneToast,
} from '@chakra-ui/react';
const { Option } = Select;

const UserPayment = () => {
  // const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const toastChakra = createStandaloneToast();
  const [selectedOrder, setSelectedOrder] = useSelectedOrder();
  const [typePaymant, setTypePaymant] = useState(undefined)
  const navigate = useNavigate();
  const [form, setForm] = useState({
    address: auth?.user?.adddress,
    phone: auth?.user?.phone,
    nama: auth?.user?.nama,
  })

  const onChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  //total harga
  const totalPrice = () => {
    try {
      let total = 0;
      selectedOrder?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "IDR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onHapus = (prdct) => {
    let newData = selectedOrder.filter((product) => product._id !== prdct._id)
    setSelectedOrder(newData)
  }

  const changePaymentType = (e) => (
    setTypePaymant(e)
  )

  const isDisabledBtn = () => {
    if (typePaymant === "cod") {
      if (
        !(
          form.nama &&
          form.phone &&
          form.address &&
          selectedOrder.length > 0
        )
      ) {
        return true
      } else {
        return false
      }
    } else if (typePaymant === "transfer") {
      if (selectedOrder.length === 0) return true
      return false
    }
    return true
  }

  const processOrder = () => {
    if (typePaymant === 'transfer') {
      navigate('/user/bukti-paymant')
    } else {
      // process api create order
    }
  }

  const postCreateOrder = async (e) => {
    e.preventDefault();
    if (typePaymant === 'transfer') {
      navigate('/user/bukti-paymant')
    } else {
      try {
        let idProduct = selectedOrder.map((prdct) => prdct._id)
        idProduct = JSON.stringify(idProduct)
        const orderData = new FormData();
        orderData.append("nama", form.nama);
        orderData.append("address", form.address);
        orderData.append("phone", form.phone);
        orderData.append("products", idProduct);
        orderData.append("paymentType", typePaymant);
        const { data } = axios.post("/api/v1/order/create-orders", orderData);
        if (data?.success) {
          toast.error(data?.message);
        } else {
          toastChakra.toast({
            status: 'success',
            duration: 5000,
            title: 'Berhasil',
            description: "Berhasil membuat pesanan",
            position: 'bottom-right',
          });
          navigate("/user/orders");
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    }
  };

  return (
    <LayoutAdmin>
      <AppTemplate>
        <Box minH="100vh" p='3' w="full">
          <Text color="gray.800" fontSize="40px" fontWeight="400" textAlign="center" m='0'>PAYMENT</Text>
          <Flex w="full" gap="20px">
            <Box boxShadow="sm" w="50%">
              {selectedOrder.length === 0 &&
                <Box>
                  <Alert
                    status='warning'
                    variant='subtle'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                    height='200px'
                  >
                    <AlertIcon boxSize='40px' mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize='lg'>
                      Pesanan kamu masih kosong
                  </AlertTitle>
                    <AlertDescription maxWidth='sm'>
                      Silakan memilih barang dikeranjang yang akan dipesan terlebih dahulu{" "}
                      <Link color="green" href="/user/cart">Lihat Keranjang</Link>
                    </AlertDescription>
                  </Alert>
                </Box>
              }
              {selectedOrder.map((crt, i) => (
                <Flex my="4" key={i} gap="15px" w="full">
                  <Image width="200px" height="300px" alt={crt.nama} src={`/api/v1/product/product-photo/${crt._id}`} />
                  <Flex flexDirection="column" justifyContent="space-between">
                    <Box>
                      <Text>
                        NAMA PRODUK: {crt.nama}
                      </Text>
                      <Text>
                        DESKRIPSI PRODUK:{crt.description.substring(0, 30)}
                      </Text>
                      <Text>
                        HARGA: {toFormatPrice(crt.price, 'IDR', true)}
                      </Text>
                    </Box>
                    <Button onClick={() => onHapus(crt)} w="70px" colorScheme="red">
                      Hapus
                  </Button>
                  </Flex>
                </Flex>
              ))}
            </Box>
            <Flex boxShadow="sm" alignItems='center' flexDirection="column" w="50%">
              <Text color="gray.800" fontSize="25px" fontWeight="400" textAlign="center" m='0'>PAYMENT SUMMARY</Text>
              <Text textAlign="center" >Total | CheckOut | Payment</Text>
              <Divider m="0" w="70%" />
              <Flex justifyContent="center" w='100%'>
                <FormControl w="full" my="2">
                  <FormLabel>Pilih Pembayaran</FormLabel>
                  <Select
                    // style={{ width: "60%" }}
                    bordered={false}
                    placeholder="Pilih Pembayaran"
                    size="large"
                    value={typePaymant}
                    className="form-select mb-3"
                    onChange={changePaymentType}
                  >
                    <Option value="cod">COD</Option>
                    <Option value="transfer">Transfer</Option>
                  </Select>
                </FormControl>
              </Flex>
              <h4>Total : {totalPrice()}</h4>
              {typePaymant === "cod" && <VStack w="full" my="4" spacing={3}>
                <FormControl>
                  <FormLabel>Nama</FormLabel>
                  <Input value={form.nama} name="nama" onChange={onChangeForm} />
                </FormControl>
                <FormControl>
                  <FormLabel>Alamat</FormLabel>
                  <Input value={form.address} name="address" onChange={onChangeForm} />
                </FormControl>
                <FormControl>
                  <FormLabel>Nomor Telfon</FormLabel>
                  <Input value={form.phone} name="phone" onChange={onChangeForm} />
                </FormControl>
              </VStack>
              }
              <Button onClick={postCreateOrder} w="70px" w="full" isDisabled={isDisabledBtn()} colorScheme="green">
                Lanjut
              </Button>
            </Flex>
          </Flex>
        </Box>
      </AppTemplate>
    </LayoutAdmin>
  );
};

export default UserPayment;
