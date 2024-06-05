import React from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";
import CoinTable from "../components/Table.jsx";
const Home = () => {
  const { user } = useAuth();
  const [coins, setCoins] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/coins");
      if (response.status === 200) {
        setCoins(response.data);
      } else {
        message.error(`Hata: ${response.data.message}`);
      }
    } catch (error) {
      message.error(`Hata: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(coins);
  return <CoinTable coins={coins} setCoins={setCoins} />;
};

export default Home;
