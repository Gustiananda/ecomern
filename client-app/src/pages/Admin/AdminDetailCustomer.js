import { Button, IconButton } from "@chakra-ui/button";
import { Switch } from "@chakra-ui/switch";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tooltip } from "@chakra-ui/tooltip";
import React, { useEffect, useState } from "react";
import AppTemplate from "../../components/AppTemplate";
import AdminMenu from "../../components/layout/AdminMenu";
import { LayoutAdmin } from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  Search2Icon,
  Icon,
} from '@chakra-ui/icons';
import { useTable, usePagination } from 'react-table';
import { Box, Center, Flex, Heading, HStack, Link, List, ListIcon, ListItem, Text, VStack } from "@chakra-ui/layout";
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/number-input";
import { Select } from "@chakra-ui/select";
import { FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { AiOutlineMail, AiOutlineHome } from 'react-icons/ai'
import { BsTelephone } from 'react-icons/bs'
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";


const AdminDetailCustomer = () => {
  const [auth] = useAuth();
  const { id } = useParams();
  const [data, setData] = useState({
    nama: '',
    email: '',
    phone: '',
    address: '',
  })

  const getListCustomer = async (id) => {
    try {
      const { data } = await axios.get(`/api/v1/auth/detail-customer/${id}`);
      if (data?.success) {
        setData({
          nama: data.data.nama,
          email: data.data.email,
          phone: data.data.phone,
          address: data.data.address,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    if (id) {
      getListCustomer(id)
    }
  }, [id]);

  return (
    <LayoutAdmin>
      <AppTemplate>
        <Box p='2' minH="100vh">
          <Text color="gray.800" fontSize="40px" fontWeight="400" textAlign="center" m='0'>DETAIL CUSTOMER</Text>
          <Box h="60vh">
            <Center py={6} h="60vh">
              <Box
                maxW={'600px'}
                w={'full'}
                bg='white'
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>

                <Heading fontSize={'2xl'} fontFamily={'body'}>
                  {data.nama}
                </Heading>
                <Flex h="100%" justifyContent="center" alignItems="center" flexDirection="column">
                  <Box>
                    <HStack alignItems="center" spacing={3} >
                      <AiOutlineMail size={20} />
                      <Text color="gray.700" fontWeight="600" fontSize="16px" m="0">
                        {data.email}
                      </Text>
                    </HStack>
                    <HStack alignItems="center" spacing={3} >
                      <BsTelephone size={20} />
                      <Text color="gray.700" fontWeight="600" fontSize="16px" m="0">
                        {data.phone}
                      </Text>
                    </HStack>
                    <HStack alignItems="center" spacing={3} >
                      <AiOutlineHome size={20} />
                      <Text color="gray.700" fontWeight="600" fontSize="16px" m="0">
                        {data.address}
                      </Text>
                    </HStack>
                  </Box>
                </Flex>
              </Box>
            </Center>
          </Box>
        </Box>
      </AppTemplate>
    </LayoutAdmin>
  );
};

export default AdminDetailCustomer;



