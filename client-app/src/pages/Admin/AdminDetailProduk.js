import { Image } from "@chakra-ui/image";
import { Box, Container, List, ListItem, SimpleGrid, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import AppTemplate from "../../components/AppTemplate";
import { LayoutAdmin } from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import { toFormatPrice } from "../../utils/currency";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router";


const AdminDetailProduk = () => {
  const [auth] = useAuth();
  const { id } = useParams();
  const [data, setData] = useState({
    id: '',
    nama: '',
    deskripsi: '',
    harga: '',
    kategori: '',
    jumlah: '',
  })

  const getDetailProduct = async (id) => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-detail/${id}`);
      if (data?.success) {
        setData({
          id: data.products._id,
          nama: data.products.nama,
          deskripsi: data.products.description,
          harga: toFormatPrice(data.products.price, 'IDR', true),
          kategori: data.products.category.nama,
          jumlah: data.products.quantity,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    if (id) {
      getDetailProduct(id)
    }
  }, [id]);

  return (
    <LayoutAdmin>
      <AppTemplate>
        <Box p='2' minH="100vh">
          <Container maxW={'7xl'}>
            <Text
              textAlign="center"
              fontSize='26px'
              color='yellow.500'
              fontWeight={'500'}
              textTransform={'uppercase'}
              mb={'4'}>
              Product Details
            </Text>
            <SimpleGrid
              columns={{ sm: 1, md: 2 }}
              spacing={{ base: 8, md: 10 }}
              py={{ base: 18, md: 24 }}
            >
              <Image
                rounded={'md'}
                alt={'product image'}
                src={`/api/v1/product/product-photo/${data.id}`}
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={{ base: '100%', sm: '400px', lg: '500px' }}
              />
              <Box>
                <List spacing={2}>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Nama Produk:
                    </Text>{' '} {data.nama}
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Deskripsi Produk:
                    </Text>{' '}
                    {data.deskripsi}
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Harga:
                    </Text>{' '}
                    {data.harga}
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      QTY:
                    </Text>{' '}
                    {data.jumlah}
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Kategori:
                    </Text>{' '}
                    {data.kategori}
                  </ListItem>
                </List>
              </Box>
            </SimpleGrid>
          </Container>
        </Box>
      </AppTemplate>
    </LayoutAdmin>
  );
};

export default AdminDetailProduk;



