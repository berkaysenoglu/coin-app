import React, { useState } from "react";
import { Button, Input, Form } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
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

  return (
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
        <p>Why CoinFlow</p>
        <p></p>
      </div>
    </div>
  );
};

export default Login;
