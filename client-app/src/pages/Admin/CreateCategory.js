import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout, { LayoutAdmin } from "../../components/layout/Layout";
import CategoryForm from "../../components/form/CategoryForm";
import { Modal } from "antd";
import AppTemplate from "../../components/AppTemplate";
import { Box, Center, Text } from "@chakra-ui/layout";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [nama, setNama] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedNama, setUpdatedNama] = useState("");
  // handleSubmit;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        nama,
      });
      if (data?.success) {
        toast.success(`${nama}Berhasil Ditambahkan!`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form");
    }
  };

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        {
          nama: updatedNama,
        }
      );
      if (data.success) {
        toast.success(`${updatedNama} Berhasil di Update! `);
        setSelected(null);
        setUpdatedNama("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`Kategori Berhasil dihapus! `);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <LayoutAdmin title={`Dashboard - Category`}>
      <AppTemplate>
        <Box w="full">
          <Text color="gray.800" fontSize="40px" fontWeight="400" textAlign="center" m='0'>CATEGORY</Text>
          <Center my="4">
            <Box w="80%">
              <div className="p-3 w-50">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={nama}
                  setValue={setNama}
                />
              </div>
              <Box w="full">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Nama</th>
                      <th scope="col">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((c) => (
                      <>
                        <tr>
                          <td key={c._id}>{c.nama}</td>
                          <td>
                            <button
                              className="btn btn-primary ms-2"
                              onClick={() => {
                                setVisible(true);
                                setUpdatedNama(c.nama);
                                setSelected(c);
                              }}
                            >
                              Edit
                          </button>
                            <button
                              className="btn btn-danger ms-2"
                              onClick={() => {
                                handleDelete(c._id);
                              }}
                            >
                              Delete
                          </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Box>
          </Center>
        </Box>
        <Modal
          onCancel={() => setVisible(false)}
          footer={null}
          visible={visible}
        >
          <CategoryForm
            value={updatedNama}
            setValue={setUpdatedNama}
            handleSubmit={handleUpdate}
          />
        </Modal>
      </AppTemplate>
    </LayoutAdmin>
  );
};

export default CreateCategory;
