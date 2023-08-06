import { Button, IconButton } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import {
  ArrowLeftIcon, ArrowRightIcon,
  ChevronLeftIcon, ChevronRightIcon,
  Search2Icon
} from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/number-input";
import { Select } from "@chakra-ui/select";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tooltip } from "@chakra-ui/tooltip";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { usePagination, useTable } from 'react-table';
import AppTemplate from "../../components/AppTemplate";
import { LayoutAdmin } from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import { toFormatPrice } from "../../utils/currency";
import fileDownload from 'js-file-download';
import toast from "react-hot-toast";

const AdminReport = () => {
  const [auth] = useAuth();
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/get-by-admin");
      let temp = []
      let iterate = 0
      data.data.forEach((order) => {
        order.items.forEach((item, i) => {
          iterate++;
          temp.push({
            no: iterate,
            hari: moment(order.createdAt).format('dddd'),
            tanggal: moment(order.createdAt).format('DD MMM YYYY'),
            nama: order.buyer.nama,
            barang: item.products?.nama ?? "-",
            qty: item.quantity,
            harga: toFormatPrice(item.realPrice, 'IDR', true),
            alamat: order.address,
            status: order.status
          })
        })
      })
      setData(temp);
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
        Header: 'Hari',
        accessor: 'hari',
      },
      {
        Header: 'Tanggal',
        accessor: 'tanggal',
      },
      {
        Header: 'Nama',
        accessor: 'nama',
      },
      {
        Header: 'Barang',
        accessor: 'barang',
      },
      {
        Header: 'Jumlah',
        accessor: 'qty',
      },
      {
        Header: 'Harga',
        accessor: 'harga',
      },
      {
        Header: 'Alamat',
        accessor: 'alamat',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
    []
  );

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const printReport = async () => {
    try {
      setLoading(true)
      const res = await axios.get("/api/v1/order/print-report", {
        responseType: 'blob',
      });
      console.log('res.data', res.data)
      if (res.status !== 500) {
        fileDownload(
          res.data,
          `${new Date().getTime().toString()}-report.pdf`
        );
      } else {
        toast.error("something went wrong");
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
      toast.error("something went wrong");
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <LayoutAdmin>
      <AppTemplate>
        <Box p='2'>
          <Text textAlign="center" fontWeight='700' color='gray.700' fontSize='2xl'>
            Report
          </Text>
          <Box>
            <Box my='3'>
              <Button isLoading={loading} colorScheme="blue" my="3" onClick={printReport}>Print Report</Button>
              <CustomTable
                columns={columns}
                data={data}
              />
            </Box>
          </Box>
        </Box>

      </AppTemplate>
    </LayoutAdmin>
  );
};

export default AdminReport;


function CustomTable({
  columns,
  data,
  // handleChangeStatus,
  // getListProduk,
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
                  if (cell.column.Header === 'Status') {
                    return (
                      <Td
                        {...cell.getCellProps()}
                      >
                        <Text textTransform="capitalize" fontWeight="700" color={row.original.status === "not process" ? "red" : row.original.status === "process" ? "orange" : "green"}>{row.original.status}</Text>
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
    </>
  );
}
