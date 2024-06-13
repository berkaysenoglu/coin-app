import React, { useState } from "react";
import { Button, Input, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/logos/coinflow-logo.png";
export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { login } = useAuth();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: values.email,
        password: values.password,
      });
      if (response.status === 200) {
        navigate("/");
        login(response.data.user);
      } else {
        message.error(`Hata: ${response.data.message}`);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };
  const signinHandle = () => {
    navigate("/register");
  };
  return (
    <div className="page-container">
      <div className="login-wrapper">
        <div className="form-wrapper">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleLogin}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Link className="sign-in-label" to="/register">
              Dont have an account? Sign in!
            </Link>
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            ></Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                className="submit-button"
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="info-wrapper">
          <h1>Why CoinFlow</h1>
          <p>
            CoinFlow provides the latest and most accurate cryptocurrency market
            data in real-time. Our user-friendly interface allows both
            experienced traders and beginners to easily monitor their crypto
            portfolios. We prioritize your security with advanced encryption and
            safety measures. Additionally, we offer detailed analytics and
            charts to help you make informed decisions. Our 24/7 customer
            support team is always available to assist you.
          </p>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
