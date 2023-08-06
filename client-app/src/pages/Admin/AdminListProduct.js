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
import { Select } from "@chakra-ui/select";
import { FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { toFormatPrice } from "../../utils/currency";
import { Image } from "@chakra-ui/image";
import ModalConfirm from "../../components/ModalConfirm";
import { useDisclosure } from "@chakra-ui/hooks";
import axios from "axios";
import toast from "react-hot-toast";


const AdminListProduct = () => {
  const [auth] = useAuth();
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')

  const onChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const filterProduct = () => {
    if (search) {
      let newData = data.filter((dt) => dt.nama.toLowerCase().includes(search.toLowerCase()))
      return newData
    }
    return data
  }

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
        Header: 'Deskripsi',
        accessor: 'deskripsi',
      },
      {
        Header: 'Harga',
        accessor: 'harga',
      },
      {
        Header: 'Kategori',
        accessor: 'kategori',
      },
      {
        Header: 'QTY',
        accessor: 'jumlah',
      },
      {
        Header: 'Foto',
        accessor: 'foto',
      },
      {
        Header: 'Aksi',
        accessor: 'aksi',
      },
    ],
    []
  );

  const getAllProducts = async () => {
    try {
      // setLoading(true);
      const { data } = await axios.get(`/api/v1/product/get-product`);
      // setLoading(false);
      let temp = []
      data.products.forEach((product, i) => {
        temp.push({
          no: i + 1,
          id: product._id,
          nama: product.nama,
          deskripsi: product.description.substring(0, 30),
          harga: toFormatPrice(product.price, 'IDR', true),
          kategori: product.category.nama,
          jumlah: product.quantity,
          photo: product._id,
          aksi: product._id,
        })
      })
      setData(temp);
    } catch (error) {
      // setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <LayoutAdmin>
      <AppTemplate>
        <Box p='2'>
          <Text color="gray.800" fontSize="40px" fontWeight="400" textAlign="center" m='0'>PRODUK</Text>
          <Box>
            <Flex my="4" w='full' justifyContent='space-between' alignItems="center">
              <Link href='/admin/produk/create'>
                <Button colorScheme="green">
                  Tambah Produk
                </Button>
              </Link>
              <Box>
                <FormLabel>Cari nama produk</FormLabel>
                <InputGroup w='500px' size='md'>
                  <Input onChange={onChangeSearch} value={search} placeholder='Cari nama produk...' />
                  <InputRightElement>
                    <IconButton
                      aria-label='cari'
                      // onClick={handleClick}
                      icon={<Search2Icon />}
                    />
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Flex>
            <Box my='3'>
              <CustomTable
                getAllProducts={getAllProducts}
                // handleChangeStatus={handleChangeStatus}
                columns={columns}
                data={filterProduct()}
              />
              ;
            </Box>
          </Box>
        </Box>

      </AppTemplate>
    </LayoutAdmin>
  );
};

export default AdminListProduct;


function CustomTable({
  columns,
  data,
  // handleChangeStatus,
  getAllProducts,
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
  const [selectedId, setSelectedId] = useState(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const detailPage = (id) => {
    // console.log('id', id);
    // Router.push(`/penjual/produk/${id}`);
  };

  const handleDeleteProduk = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/product/delete-product/${selectedId}`);
      if (data?.success) {
        toast.success("success delete product");
        getAllProducts()
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
    onCloseDelete()
  };

  const onOpenDelete = (id) => {
    setSelectedId(id);
    onOpen()
  }

  const onCloseDelete = (id) => {
    setSelectedId(undefined);
    onClose()
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
                          // onChange={(e) => handleChangeStatus(cell)}
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
                          <Link href={`/admin/produk/${row.original.id}`}>
                            <Button size='sm' colorScheme='green'>
                              Detail
                            </Button>
                          </Link>
                          <Link
                            href={`/admin/produk/create?id=${row.original.id}`}
                          >
                            <Button size='sm' colorScheme='blue'>
                              Ubah
                            </Button>
                          </Link>
                          <Button
                            size='sm'
                            colorScheme='red'
                            onClick={() => onOpenDelete(row.original.id)}
                          >
                            Delete
                          </Button>
                        </Flex>
                      </Td>
                    );
                  } else if (cell.column.Header === 'Foto') {
                    return (
                      <Td
                        onClick={() => detailPage(row.original.id)}
                        {...cell.getCellProps()}
                      >
                        <Image
                          src={`/api/v1/product/product-photo/${row.original.id}`}
                          alt={row.original.nama}
                          roundedTop="lg"
                          className="card-img-top"
                        />
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
      </Flex>
      <ModalConfirm
        onClose={onCloseDelete}
        isOpen={isOpen}
        title="Delete Produk"
        message="Apakah kamu yakin menghapus produk ?"
        onSubmit={handleDeleteProduk}
      />
    </>
  );
}
