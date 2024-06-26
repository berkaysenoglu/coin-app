import React, { useState } from "react";
import { Button, Input, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import logo from "../assets/logos/coinflow-logo.png";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { register } = useAuth();

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      if (response.status === 201) {
        register(response.data.newUser);
        navigate("/");
      } else {
        message.error(`Hata: ${response.data.message}`);
      }
    } catch {
      setMessage(
        "An error occurred while registering. Please try again later."
      );
    } finally {
      setLoading(false);
    }
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
            onFinish={handleRegister}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input className="input-email" placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input className="input-email" placeholder="Email" />
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
            <Link className="sign-in-label" to="/login">
              Already have an account? Log in!
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
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
