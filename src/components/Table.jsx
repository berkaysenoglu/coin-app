import React, { useState } from "react";
import { MdEdit, MdDeleteForever } from "react-icons/md";

import {
  Space,
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
} from "antd";
import axios from "axios";

const CoinTable = ({ coins, setCoins }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCoin, setEditingCoin] = useState(null);
  const [form] = Form.useForm();

  const showEditModal = (record) => {
    setEditingCoin(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCoin(null);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const response = await axios.patch(
        `http://localhost:5000/coins/${editingCoin._id}`,
        values
      );
      const updatedCoin = response.data;
      message.success("Coin updated successfully");
      setIsModalVisible(false);

      setEditingCoin(null);

      setCoins((prevCoins) =>
        prevCoins.map((coin) =>
          coin._id === updatedCoin._id ? updatedCoin : coin
        )
      );
    } catch (error) {
      console.error("Error updating coin:", error);
      message.error("Failed to update coin");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/coins/${id}`);
      message.success("Coin deleted successfully");
      setCoins(coins.filter((coin) => coin._id !== id));
      // Refresh the table or do something else to show updated data
    } catch (error) {
      console.error("Error deleting coin:", error);
      message.error("Failed to delete coin");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Icon",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img src={record.image} width="50" height="50" alt={record.name} />
      ),
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      sorter: (a, b) => a.tag.localeCompare(b.tag),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, record) => <p>$ {record.price}</p>,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showEditModal(record)}>
            {<MdEdit size={"20px"} color="black" />}
          </a>
          <a onClick={() => handleDelete(record._id)}>
            {<MdDeleteForever size={"20px"} color="black" />}
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div className="table-container">
      <Table
        showSorterTooltip={{
          target: "sorter-icon",
        }}
        columns={columns}
        dataSource={coins}
      />

      <Modal
        title="Edit Coin"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: "Please input the image URL!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tag"
            label="Tag"
            rules={[{ required: true, message: "Please input the tag!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Please input the price!" },
              { type: "number", message: "Price must be a number" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CoinTable;
