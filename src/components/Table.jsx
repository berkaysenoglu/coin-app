import React from "react";
import { Space, Table } from "antd";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text, record) => <img src={record.image} width="50" height="50" />,
  },
  {
    title: "Tag",
    dataIndex: "tag",
    key: "tag",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (_, record) => <p>$ {record.price}</p>,
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Edit {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const CoinTable = ({ coins }) => {
  return (
    <div className="table-container">
      <Table columns={columns} dataSource={coins} />;
    </div>
  );
};
export default CoinTable;
