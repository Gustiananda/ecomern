import { Button, IconButton } from "@chakra-ui/button";
import { Switch } from "@chakra-ui/switch";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tooltip } from "@chakra-ui/tooltip";
import React, { useEffect, useMemo, useState } from "react";
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
} from '@chakra-ui/icons';
import { useTable, usePagination } from 'react-table';
import { Box, Flex, Link, Text } from "@chakra-ui/layout";
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/number-input";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Select } from "@chakra-ui/select";
import axios from "axios";
import toast from "react-hot-toast";


const AdminCustomer = () => {
  const [auth] = useAuth();
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')

  const onChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const filterCustomer = () => {
    if (search) {
      let newData = data.filter((dt) => dt.nama.toLowerCase().includes(search.toLowerCase()))
      return newData
    }
    return data
  }

  const getListCustomer = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/list-customer");
      if (data?.success) {
        let temp = []
        data.data.forEach((user, i) => {
          temp.push({
            no: i + 1,
            id: user._id,
            nama: user.nama,
            email: user.email,
            telepon: user.phone,
            alamat: user.address,
            validasi: user.isVerify,
            aksi: user._id,
          })
        })
        setData(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const columns = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'no',
      },
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Nama',
        accessor: 'nama',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Telepon',
        accessor: 'telepon',
      },
      {
        Header: 'Alamat',
        accessor: 'alamat',
      },
      {
        Header: 'Validasi',
        accessor: 'validasi',
      },
      {
        Header: 'Aksi',
        accessor: 'aksi',
      },
    ],
    []
  );

  useEffect(() => {
    getListCustomer()
  }, [])

  return (
    <LayoutAdmin>
      <AppTemplate>
        <Box p='3'>
          <Text color="gray.800" fontSize="40px" fontWeight="400" textAlign="center" m='0'>CUSTOMER</Text>
          <Box>
            <Flex w='full' justifyContent='flex-end' my="4">
              <Box>
                <FormLabel>Cari nama customer</FormLabel>
                <InputGroup w='500px' size='md'>
                  <Input onChange={onChangeSearch} value={search} placeholder='Cari nama customer...' />
                  <InputRightElement>
                    <IconButton
                      aria-label='cari'
                      icon={<Search2Icon />}
                    />
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Flex>
            <Box my='3'>
              <CustomTable
                getListCustomer={getListCustomer}
                // handleChangeStatus={handleChangeStatus}
                columns={columns}
                data={filterCustomer()}
              />
            </Box>
          </Box>
        </Box>

      </AppTemplate>
    </LayoutAdmin>
  );
};

export default AdminCustomer;


function CustomTable({
  columns,
  data,
  // handleChangeStatus,
  getListCustomer,
}) {
  // const { showToast } = useGlobalContext();
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      // initialState: { pageIndex: 2 }
    },
    usePagination
  );
  const [formChangeVerify, setformChangeVerify] = useState({
    id: '',
    verify: false,
  })
  const { isOpen, onOpen, onClose } = useDisclosure();

  const detailPage = (id) => {
    // console.log('id', id);
    // Router.push(`/penjual/produk/${id}`);
  };

  const openChangeStatus = async (user, isVerify) => {
    // e.preventDefault()
    try {
      const { data } = await axios.post("/api/v1/auth/change-verify", {
        id: user.id,
        verify: !user.validasi
      });
      if (data?.success) {
        toast.success(`Success Change Verify!`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
    // onClose()
    getListCustomer();

    // setformChangeVerify({
    //   id: user._id,
    //   verify: user.validasi
    // })
    // onOpen();
  };

  const postChangeStatus = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("/api/v1/order/change-verify", {
        id: formChangeVerify.id,
        verify: formChangeVerify.status
      });
      if (data?.success) {
        toast.success(`Success Change Verify!`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
    onClose()
    getListCustomer();
  }

  // Render the UI for your table
  return (
    <>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.Header === 'Validasi') {
                    return (
                      <Td {...cell.getCellProps()}>
                        <Switch
                          defaultChecked={cell.value}
                          onChange={(e) => openChangeStatus(row.original, cell.value)}
                          size='md'
                        />
                      </Td>
                    );
                  } else if (cell.column.Header === 'Aksi') {
                    return (
                      <Td
                        style={{ cursor: 'pointer' }}
                        onClick={() => detailPage(row.original.id)}
                        {...cell.getCellProps()}
                      >
                        <Flex alignItems='center' gap='2'>
                          <Link href={`/admin/customer/${row.original.id}`}>
                            <Button size='sm' colorScheme='green'>
                              Detail
                            </Button>
                          </Link>
                          {/* <Link
                            href={`/penjual/produk/edit?id=${row.original.id}`}
                          >
                            <Button size='xs' colorScheme='blue'>
                              Ubah
                            </Button>
                          </Link>
                          <Button
                            size='xs'
                            colorScheme='red'
                            onClick={() => handleDeleteProduk(row.original.id)}
                          >
                            Delete
                          </Button> */}
                        </Flex>
                      </Td>
                    );
                  } else {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                    );
                  }
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Flex justifyContent='space-between' m={4} alignItems='center'>
        <Flex>
          <Tooltip label='First Page'>
            <IconButton
              onClick={() => gotoPage(0)}
              isDisabled={!canPreviousPage}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
              aria-label='button'
            />
          </Tooltip>
          <Tooltip label='Previous Page'>
            <IconButton
              aria-label='button'
              onClick={previousPage}
              isDisabled={!canPreviousPage}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>

        <Flex alignItems='center'>
          <Text flexShrink='0' mr={8}>
            Page{' '}
            <Text fontWeight='bold' as='span'>
              {pageIndex + 1}
            </Text>{' '}
            of{' '}
            <Text fontWeight='bold' as='span'>
              {pageOptions.length}
            </Text>
          </Text>
          <Text flexShrink='0'>Go to page:</Text>{' '}
          <NumberInput
            ml={2}
            mr={8}
            w={28}
            min={1}
            max={pageOptions.length}
            onChange={(value) => {
              const page = value ? value - 1 : 0;
              gotoPage(page);
            }}
            defaultValue={pageIndex + 1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select
            w={32}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex>
          <Tooltip label='Next Page'>
            <IconButton
              onClick={nextPage}
              isDisabled={!canNextPage}
              icon={<ChevronRightIcon h={6} w={6} />}
              aria-label='button'
            />
          </Tooltip>
          <Tooltip label='Last Page'>
            <IconButton
              aria-label='button'
              onClick={() => gotoPage(pageCount - 1)}
              isDisabled={!canNextPage}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
            />
          </Tooltip>
        </Flex>
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
                    setformChangeVerify({
                      ...formChangeVerify,
                      verify: e.target.value
                    });
                  }}
                >
                  <option value={false}>Aktif</option>
                  <option value={true}>Non Aktif</option>
                </Select>
              </FormControl>
            </ModalBody>
            <ModalFooter gap='2'>
              <Button onClick={postChangeStatus} colorScheme='green'>
                Ya, Lanjut
            </Button>
              <Button colorScheme='red' onClick={onClose}>
                Batal
            </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
}
