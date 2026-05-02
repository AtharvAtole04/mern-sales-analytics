import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/analytics"
      );

      setStats(res.data);

    } catch (error) {
      console.log(error);
    }
  };

const chartData = {
  labels: ["Products", "Quantity"],
  datasets: [
    {
      label: "Business Analytics",
      data: [
        stats.totalProducts || 0,
        stats.totalQuantity || 0
      ],
      backgroundColor: [
        "rgba(54, 162, 235, 0.7)",
        "rgba(75, 192, 192, 0.7)"
      ],
      borderWidth: 1
    }
  ]
};

  return (
    <div style={styles.page}>
      
      <h1 style={styles.title}>
        Sales Analytics Dashboard
      </h1>

      <ProductForm refreshData={fetchStats} />

      <div style={styles.cardContainer}>

        <div style={styles.card}>
          <h3>Total Products</h3>
          <p>{stats.totalProducts || 0}</p>
        </div>

        <div style={styles.card}>
          <h3>Total Quantity</h3>
          <p>{stats.totalQuantity || 0}</p>
        </div>

        <div style={styles.card}>
          <h3>Total Revenue</h3>
          <p>₹ {stats.totalRevenue || 0}</p>
        </div>

      </div>

      <div style={styles.chartBox}>
        <Bar data={chartData} />
      </div>

      <ProductTable />
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#f5f7fb",
    minHeight: "100vh",
    padding: "30px"
  },

  title: {
    marginBottom: "30px"
  },

  cardContainer: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap"
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    minWidth: "220px"
  },

  chartBox: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  }

};

export default Dashboard;