import React, { useState, useEffect } from "react";
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
import { MdEdit, MdDeleteForever } from "react-icons/md";
import useDebounce from "../hooks/useDebounce"; // Debounce hook'unu içe aktarın

const CoinTable = ({ coins, setCoins, loading, pagination, onTableChange }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingCoin, setEditingCoin] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms debounce delay

  useEffect(() => {
    onTableChange(pagination, debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const showEditModal = (record) => {
    setEditingCoin(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCoin(null);
    setIsAddModalVisible(false);
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
        Array.isArray(prevCoins)
          ? prevCoins.map((coin) =>
              coin._id === updatedCoin._id ? updatedCoin : coin
            )
          : []
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

      const isLastItemOnPage = coins.length === 1 && pagination.current > 1;

      if (isLastItemOnPage) {
        const newPage = pagination.current - 1 > 0 ? pagination.current - 1 : 1;
        onTableChange(newPage, debouncedSearchTerm);
      } else {
        setCoins((prevCoins) =>
          Array.isArray(prevCoins)
            ? prevCoins.filter((coin) => coin._id !== id)
            : []
        );
      }
    } catch (error) {
      console.error("Error deleting coin:", error);
      message.error("Failed to delete coin");
    }
  };
  const handleAdd = async () => {
    try {
      const values = await addForm.validateFields();
      const response = await axios.post(`http://localhost:5000/coins`, values);
      const newCoin = response.data;
      message.success("Coin added successfully");
      setIsAddModalVisible(false);
      setCoins((prevCoins) =>
        Array.isArray(prevCoins) ? [...prevCoins, newCoin] : [newCoin]
      );
    } catch (error) {
      console.error("Error adding coin:", error);
      message.error("Failed to add coin");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
            <MdEdit size={"20px"} color="black" />
          </a>
          <a onClick={() => handleDelete(record._id)}>
            <MdDeleteForever size={"20px"} color="black" />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="table-container">
        <Input.Search
          placeholder="Search by name or tag"
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginBottom: 8 }}
        />
        <Button
          type="primary"
          onClick={showAddModal}
          style={{ marginBottom: 8, width: "120px" }}
        >
          Add New Coin
        </Button>
        <Table
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
          }}
          loading={loading}
          columns={columns}
          dataSource={coins}
          onChange={(pagination) =>
            onTableChange(pagination, debouncedSearchTerm)
          }
        />

        <Modal
          title="Edit Coin"
          open={isModalVisible}
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
              rules={[
                { required: true, message: "Please input the image URL!" },
              ]}
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

        <Modal
          title="Add New Coin"
          open={isAddModalVisible}
          onCancel={handleCancel}
          onOk={handleAdd}
        >
          <Form form={addForm} layout="vertical">
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
              rules={[
                { required: true, message: "Please input the image URL!" },
              ]}
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
    </div>
  );
};

export default CoinTable;
