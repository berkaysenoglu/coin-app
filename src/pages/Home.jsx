import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return <div>Home</div>;
};

export default Home;
