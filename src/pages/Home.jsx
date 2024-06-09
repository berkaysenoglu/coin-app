import React from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";
import CoinTable from "../components/Table.jsx";
import { message } from "antd"; // message import edilmeyi unutmayın

const Home = () => {
  const { user } = useAuth();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const fetchData = async (page, pageSize) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/coins?page=${page}&limit=${pageSize}`
      );

      setCoins(response.data);
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
    fetchData(pagination.current, pagination.pageSize);
  }, []);
  console.log(coins);

  const handleTableChange = (pagination) => {
    fetchData(pagination.current, pagination.pageSize);
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
