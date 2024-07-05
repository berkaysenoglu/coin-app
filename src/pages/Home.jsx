import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import CoinTable from "../components/Table.jsx";
import { message } from "antd";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async (page, pageSize, searchTerm = "") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/coins?page=${page}&limit=${pageSize}&search=${searchTerm}`
      );

      setCoins(response.data.coins); // coins dizisine erişim
      setPagination({
        current: page,
        pageSize: pageSize,
        total: response.data.total,
      });
    } catch (error) {
      console.error("Error fetching coins:", error);
      message.error("Failed to fetch coins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize, searchTerm);
  }, [pagination.current, pagination.pageSize, searchTerm]);

  const handleTableChange = (pagination, searchTerm) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
    setSearchTerm(searchTerm);
  };

  return (
    <CoinTable
      coins={coins}
      setCoins={setCoins}
      loading={loading}
      pagination={pagination}
      onTableChange={handleTableChange}
    />
  );
};

export default Home;
