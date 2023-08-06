import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Forgot Password - Zaurach.Co"}>
      <div className="login">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h4 className="title">RESET PASSWORD</h4>
            <div class="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                class="form-control"
                id="exampleInputEmail"
                placeholder="Enter Your Email"
                required
              />
            </div>

            <div class="mb-3">
              <input
                type="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                class="form-control"
                id="exampleInputAnswer"
                placeholder="What is your hobby?"
                required
              />
            </div>
            <div class="mb-3">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your New Password"
                required
              />
            </div>

            <button type="submit" class="btn btn-primary">
              RESET
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
