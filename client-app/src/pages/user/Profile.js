import React, { useState, useEffect } from "react";
import Layout, { LayoutAdmin } from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import AppTemplate from "../../components/AppTemplate";
import { Box, Text } from "@chakra-ui/layout";
const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(() => {
    const { email, nama, phone, address, adddress } = auth?.user;
    setNama(nama);
    setPhone(phone);
    setEmail(email);
    setAddress(address ?? adddress);
  }, [auth?.user]);
  // form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        nama,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Update Profile Berhasil!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <LayoutAdmin title="Dashboard - Zaurach.co">
      <AppTemplate>
        <Box p='3'
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          h="90vh">
          <Text color="gray.800" fontSize="40px" fontWeight="400" textAlign="center" m='0'>CUSTOMER</Text>
          <div style={{ width: '60%' }} className="form-container">
            <form style={{ width: '100%' }} onSubmit={handleSubmit}>
              <div class="mb-3">
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  class="form-control"
                  id="exampleInputNama"
                  placeholder="Enter Your Name"
                />
              </div>

              <div class="mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  class="form-control"
                  id="exampleInputEmail"
                  placeholder="Enter Your Email"
                  disabled
                />
              </div>

              <div class="mb-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Your Password"
                />
              </div>

              <div class="mb-3">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  class="form-control"
                  id="exampleInputPhone"
                  placeholder="Enter Your Phone"
                />
              </div>

              <div class="mb-3">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  class="form-control"
                  id="exampleInputaddress"
                  placeholder="Enter Your Address"
                />
              </div>

              <button style={{ width: '100%' }} type="submit" class="btn btn-primary">
                UPDATE
                </button>
            </form>
          </div>

        </Box>
      </AppTemplate>
    </LayoutAdmin>
  );
};

export default Profile;
