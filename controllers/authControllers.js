import userModel from "../models/userModel.js";
import orderModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import mongoose from "mongoose";

export const registerController = async (req, res) => {
  try {
    const { nama, email, password, phone, address, answer } = req.body;
    //validations
    if (!nama) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      nama,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
      isVerify: true,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(200).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not register",
      });
    }

    if (!user.isVerify) {
      return res.status(200).send({
        success: false,
        message: "Account not verify",
      });
    }
    // const match = await comparePassword(password, user.password);
    // if (!match) {
    //   return res.status(200).send({
    //     success: false,
    //     message: "Invalid Password",
    //   });
    // }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        nama: user.nama,
        email: user.email,
        phone: user.phone,
        adddress: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgot password

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is Required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is Required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is Required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//update profile
export const updateProfileController = async (req, res) => {
  try {
    const { nama, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({
        error: "Kata sandi diperlukan dan & panjang 6 karakter",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        nama: nama || user.nama,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Update Profile Berhasil",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Update Profile Gagal!",
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "nama");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error saat menerima pesanan",
      error,
    });
  }
};

//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const order = await orderModel
      .find({})
      .populate("products")
      .populate("buyer", "nama")
      .sort({ createdAt: "-1" });
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error saat menerima pesanan",
      error,
    });
  }
};

export const getListCustomer = async (req, res) => {
  try {
    const user = await userModel.find({ role: 0 }).select("nama email phone address isVerify");
    res.status(200).send({
      success: true,
      message: "Success get all customer",
      data: user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error get all customer",
      error,
    });
  }
}

export const getDetailCustomer = async (req, res) => {
  try {
    const { id } = req.params
    const user = await userModel.findById(new mongoose.Types.ObjectId(id)).select("nama email phone address isVerify");
    res.status(200).send({
      success: true,
      message: "Success get detail customer",
      data: user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error get detail customer",
      error,
    });
  }
}

export const changeVerifyCustomer = async (req, res) => {
  try {
    const { id, verify } = req.body
    const user = await userModel.findById(new mongoose.Types.ObjectId(id));
    user.isVerify = verify;
    await user.save()
    res.status(200).send({
      success: true,
      message: "Success change verify customer",
      data: user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error change verify customer",
      error,
    });
  }
}