import { Box, Center, Flex, HStack, Text } from "@chakra-ui/layout";
import React from "react";
import AppTemplate from "../../components/AppTemplate";
import AdminMenu from "../../components/layout/AdminMenu";
import { LayoutAdmin } from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import { ImUserTie } from 'react-icons/im'
import { MdEmail } from 'react-icons/md'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { AiFillHome } from 'react-icons/ai'

const UserDashboard = () => {
  const [auth] = useAuth();

  return (
    <LayoutAdmin title="Dashboard - Zaurach.co">
      <AppTemplate>
        <Box p='3'>
          <Text color="gray.800" fontSize="40px" fontWeight="400" textAlign="center" m='0'>DASHBOARD</Text>
          <Center h="80vh">
            <Box
              w='70%'
              h="70%"
              bg='white'
              boxShadow={'2xl'}
              rounded={'lg'}
              p="6"
            >
              <Flex h="100%" justifyContent="center" alignItems="center" flexDirection="column">
                <Box>
                  <HStack alignItems="center" spacing={3} >
                    <ImUserTie size={28} />
                    <Text fontWeight="600" fontSize="32px" m="0">
                      {auth?.user?.nama}
                    </Text>
                  </HStack>
                  <HStack alignItems="center" spacing={3} >
                    <MdEmail size={28} />
                    <Text fontWeight="600" fontSize="32px" m="0">
                      {auth?.user?.email}
                    </Text>
                  </HStack>
                  <HStack alignItems="center" spacing={3} >
                    <BsFillTelephoneFill size={28} />
                    <Text fontWeight="600" fontSize="32px" m="0">
                      {auth?.user?.phone}
                    </Text>
                  </HStack>
                  <HStack alignItems="center" spacing={3} >
                    <AiFillHome size={28} />
                    <Text fontWeight="600" fontSize="32px" m="0">
                      {auth?.user?.adddress}
                    </Text>
                  </HStack>

                </Box>
              </Flex>
            </Box>
          </Center>
        </Box>
      </AppTemplate>
    </LayoutAdmin>
  );
};

export default UserDashboard;
