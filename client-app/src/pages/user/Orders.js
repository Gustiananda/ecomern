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
import { toFormatPrice } from "../../utils/currency";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();


  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/get-by-buyer");
      setOrders(data.data);
    } catch (error) {
      console.log(error);
    }
  };

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
                            <p>harga  {toFormatPrice(item.realPrice, 'Rp.')}</p>
                            <p>jumlah {item.quantity}</p>
                          </div>
                        ))}
                      </th>
                      <th>{toFormatPrice(order.totalPriceOrder, 'Rp.')}</th>
                      <th>
                        <p>
                          {order.payment ? "COD" : <Image
                            src={`/api/v1/order/get-payment-photo/${order._id}`}
                            alt="Bukti Pembayaran"
                            width="100"
                            height="200"
                          />}
                        </p>
                      </th>
                      <th><Text textTransform="capitalize" fontWeight="700" color={order.status === "not process" ? "red" : order.status === "process" ? "orange" : "green"}>{order.status}</Text></th>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </Box>
      </AppTemplate>
    </LayoutAdmin>
  );
};

export default UserOrders;
