import { useState } from "react";
import axios from "axios";

function ProductForm({ refreshData }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    totalSales: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/products",
        formData
      );

      setFormData({
        name: "",
        category: "",
        price: "",
        quantity: "",
        totalSales: ""
      });

      refreshData();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="totalSales"
          placeholder="Total Sales"
          value={formData.totalSales}
          onChange={handleChange}
          style={styles.input}
        />

        <input
  name="saleMonth"
  placeholder="Sale Month"
  value={formData.saleMonth}
  onChange={handleChange}
  style={styles.input}
/>

        <button type="submit" style={styles.button}>
          Add Product
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginBottom: "30px"
  },

  form: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "15px"
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd"
  },

  button: {
  padding: "14px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  gridColumn: "span 2",
  backgroundColor: "#2563eb",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold"
}
};

export default ProductForm;