import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Center,
  CloseButton,
  createStandaloneToast,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  VStack,
  Link,
  Image as ChakraImage,
} from '@chakra-ui/react';
import { ROUTING_PAGES } from '../../constant/route';
// import { localCookieClearToken } from 'lib/Cookies/token';
import React, { ReactNode, ReactText, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { FiChevronDown, FiMenu } from 'react-icons/fi';
// import { useDispatch, useSelector } from 'react-redux';
import { AiFillBug, AiFillCloseCircle } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { FaTelegramPlane } from 'react-icons/fa';
import { useAuth } from '../../context/auth';
// import { Link } from 'react-router-dom';

const AppTemplate = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showFormReport, setShowFormReport] = useState(false);
  const [message, setMessage] = useState('');

  const onTogle = () => {
    setShowFormReport(true);
  };

  const onCloseTogle = () => {
    setShowFormReport(false);
    setMessage('');
  };

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onSubmit = () => {
    // if (typeof window !== 'undefined') {
    //   window.open(
    //     `https://api.whatsapp.com/send?phone=6282339865276&text=${message}`,
    //     '_blank'
    //   );
    // }
    onTogle();
  };

  return (
    <Box minH='100vh'>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box overflowX='scroll' ml={{ base: 0, md: 60 }} p='2'>
        {props.children}
      </Box>
    </Box>
  );
};

const SidebarContent = ({ onClose, ...rest }) => {
  const [auth] = useAuth();
  const userType = auth.user.role === 1 ? 'admin' : 'user';

  return (
    <Box
      id='sidebarApp'
      overflowY='scroll'
      transition='3s ease'
      bg='gray.200'
      // display='initial'
      style={{ display: 'initial !important' }}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      px='2'
      py='4'
      h='full'
      {...rest}
    >
      <Flex
        h='10'
        display={{ base: 'flex', md: 'none' }}
        alignItems='center'
        mx='8'
        justifyContent='space-between'
      >
        <CloseButton onClick={onClose} />
      </Flex>

      {ROUTING_PAGES[userType].map((route, index) => (
        <Box my='3' key={index}>
          {index + 1 === ROUTING_PAGES[userType].length ? (
            <Flex justifyContent='flex-start' w='full' mt='0' key={index}>
              <Box w='full' ml={route.type === 'child' ? '20px' : '0'}>
                <NavItem
                  action={route.action}
                  icon={route.icon}
                  href={route.href}
                >
                  {route.label}
                </NavItem>
              </Box>
            </Flex>
          ) : (
            <Flex justifyContent='flex-start' w='full' key={index}>
              <Box w='full' ml={route.type === 'child' ? '20px' : '0'}>
                <NavItem
                  action={route.action}
                  icon={route.icon}
                  href={route.href}
                >
                  {route.label}
                </NavItem>
              </Box>
            </Flex>
          )}
        </Box>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, href, children, action, ...rest }) => {
  const [activeRoute, setActiveRoute] = useState('');
  // const router = useRouter();

  // useEffect(() => {
  //   if (router) {
  //     const pathname = router.pathname.split('/')[2];
  //     setActiveRoute(pathname);
  //   }
  // }, [router]);
  // console.log('href', href);
  return (
    <Link
      href={action === false ? '#' : href}
      _hover={{ textDecoration: 'none' }}
      textDecoration='none'
      // style={{ textDecoration: 'none' }}
      // _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align='center'
        p='2'
        w='full'
        mx='2'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        // bgColor={
        //   activeRoute === href.split('/')[2] ? 'green.400' : 'transparent'
        // }
        // color={activeRoute === href.split('/')[2] ? 'white' : 'initial'}
        _hover={{
          bg: 'blue',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='22'
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  // const dispatch = useDispatch();
  // const toast = createStandaloneToast();

  const handleLogout = async () => {
    // if (user?.userType === 'penjual') {
    //   const res = await ApiPenjualLogout();
    //   if (res.status === 200) {
    //     dispatch(actionResetUser());
    //     localCookieClearToken();
    //     setLocal(LOCAL_USER_TYPE, '');
    //     Router.replace('/access-type');
    //   } else {
    //     toast.toast({
    //       status: 'error',
    //       duration: 5000,
    //       title: 'Error',
    //       description: res.data.message,
    //       position: 'bottom-right',
    //     });
    //   }
    // } else if (user?.userType === 'adminProdi') {
    //   const res = await ApiAdminProdiLogout();
    //   if (res.status === 200) {
    //     dispatch(actionResetUser());
    //     localCookieClearToken();
    //     setLocal(LOCAL_USER_TYPE, '');
    //     Router.replace('/access-type');
    //   } else {
    //     toast.toast({
    //       status: 'error',
    //       duration: 5000,
    //       title: 'Error',
    //       description: res.data.message,
    //       position: 'bottom-right',
    //     });
    //   }
    // } else if (user?.userType === 'adminUmum') {
    //   const res = await ApiAdminUmumLogout();
    //   if (res.status === 200) {
    //     dispatch(actionResetUser());
    //     localCookieClearToken();
    //     setLocal(LOCAL_USER_TYPE, '');
    //     Router.replace('/access-type');
    //   } else {
    //     toast.toast({
    //       status: 'error',
    //       duration: 5000,
    //       title: 'Error',
    //       description: res.data.message,
    //       position: 'bottom-right',
    //     });
    //   }
    // }
  };

  // useEffect(() => {
  //   const userType = getLocal(LOCAL_USER_TYPE);
  //   // const userConver = convertUser()
  //   setUser(userType);
  // }, []);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      // height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<FiMenu />}
      />
      <Box />
      {/* <Text
        display={{ base: 'none', md: 'flex' }}
        fontSize='xl'
        textAlign='left'
        fontFamily='monospace'
        fontWeight='bold'
      >
        Admin
      </Text>

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize='2xl'
        fontFamily='monospace'
        fontWeight='bold'
      >
        Logo
      </Text> */}

      <HStack display='none' spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition='all 0.3s'
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <ChakraImage
                  src={'./images/user.png'}
                  objectFit='contain'
                  objectPosition='center'
                  priority
                  alt='user image'
                  style={{ borderRadius: '100%' }}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems='flex-start'
                  spacing='1px'
                  ml='2'
                >
                  <Text fontSize='sm'>Admin Fullname</Text>
                  <Text
                    fontSize='xs'
                    color='gray.600'
                    textTransform='capitalize'
                  >
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default AppTemplate;
