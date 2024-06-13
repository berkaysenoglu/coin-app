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
          <div style={{ marginBottom: "100px", marginLeft: "-150px" }}>
            Login to CoinFlow
          </div>
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
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input className="input-email" placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                className="input-password"
                placeholder="Password"
              />
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
                offset: 1,
                span: 16,
              }}
            >
              <Button
                className="submit-button"
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
