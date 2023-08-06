import axios from "axios";
import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import moment from "moment";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { Image } from "@chakra-ui/image";
import AppTemplate from "../../components/AppTemplate";
import AdminMenu from "../../components/layout/AdminMenu";
import { LayoutAdmin } from "../../components/layout/Layout";
import { Box, Center, Flex, HStack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Select } from "@chakra-ui/select";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formChangeStatus, setFormChangeStatus] = useState({
    id: '',
    status: ''
  })

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/get-by-admin");
      setOrders(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onOpenChangeStatus = (order) => {
    setFormChangeStatus({
      id: order._id,
      status: order.status
    })
    onOpen()
  }

  const onChangeStatus = async (e) => {
    // api
    e.preventDefault()
    try {
      const { data } = await axios.post("/api/v1/order/change-status", {
        id: formChangeStatus.id,
        status: formChangeStatus.status
      });
      if (data?.success) {
        toast.success(`Success Change Status!`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
    onClose()
    getOrders();
  }

  useEffect(() => {
    getOrders();
    // if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <LayoutAdmin title={"You Orders"}>
      <AppTemplate>
        <Box minH="100vh" p='3' w="full">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((order, i) => {
            return (
              <div key={i} className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <td scope="col">No</td>
                      <td scope="col">Produk</td>
                      <td scope="col">Harga Total</td>
                      <td scope="col">Pembayaran</td>
                      <td scope="col">Status</td>
                      <td scope="col">Aksi</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{1 + i}</th>
                      <th>
                        {order.items.map((item, j) => (
                          <div key={j}>
                            <p>{item.products?.nama ?? "-"}</p>
                            <p>
                              {item.products?._id &&
                                <Image
                                  src={`/api/v1/product/product-photo/${item.products._id}`}
                                  alt={item.products?.nama ?? "-"}
                                  width="100"
                                  height="200"
                                />
                              }
                            </p>
                            <p>harga {item.realPrice}</p>
                            <p>jumlah {item.quantity}</p>
                          </div>
                        ))}
                      </th>
                      <th>{order.totalPriceOrder}</th>
                      <th>
                        <p>
                          {order.payment === null ? "COD" : <Image
                            src={`/api/v1/order/get-payment-photo/${order._id}`}
                            alt="Bukti Pembayaran"
                            width="100"
                            height="200"
                          />}
                        </p>
                      </th>
                      <th><Text textTransform="capitalize" fontWeight="700" color={order.status === "not process" ? "red" : order.status === "process" ? "orange" : "green"}>{order.status}</Text></th>
                      <th><Button colorScheme="blue" onClick={() => onOpenChangeStatus(order)}>Change status</Button></th>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </Box>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Change Status Order
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  bordered={false}
                  placeholder="Pilih Status"
                  size="lg"
                  className="form-select mb-3"
                  onChange={(e) => {
                    setFormChangeStatus({
                      ...formChangeStatus,
                      status: e.target.value
                    });
                  }}
                >
                  <option value="not process">Not Process</option>
                  <option value="process">Process</option>
                  <option value="selesai">selesai</option>
                </Select>
              </FormControl>
            </ModalBody>
            <ModalFooter gap='2'>
              <Button onClick={onChangeStatus} colorScheme='green'>
                Ya, Lanjut
            </Button>
              <Button colorScheme='red' onClick={onClose}>
                Batal
            </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

      </AppTemplate>
    </LayoutAdmin>
  );
};

export default AdminOrders;
