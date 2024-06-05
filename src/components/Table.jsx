import React from "react";
import { Space, Table, message } from "antd";
import axios from "axios";

const CoinTable = ({ coins, setCoins }) => {
  const handleDelete = async (id) => {
    try {
      console.log("Attempting to delete coin with ID:", id);

      const response = await axios.delete(`http://localhost:5000/coins/${id}`); // ID'yi URL parametre olarak gönderiyoruz
      console.log("Response:", response.data);
      message.success("Coin deleted successfully");
      setCoins(coins.filter((coin) => coin._id !== id));
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

      sorter: (a, b) => a.tag.localeCompare(b.tag),
    },
    {
      title: "Icon",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img src={record.image} width="50" height="50" />
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
          <a>Edit {record.name}</a>
          <a onClick={() => handleDelete(record._id)}>Delete</a>
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
    </div>
  );
};
export default CoinTable;
