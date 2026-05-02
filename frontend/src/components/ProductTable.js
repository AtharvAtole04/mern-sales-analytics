import { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      fetchProducts();

    } catch (error) {
      console.log(error);
    }
  };

  let filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(
      searchTerm.toLowerCase()
    )
  );

  if (sortType === "high") {
    filteredProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sortType === "low") {
    filteredProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  return (
    <div style={styles.container}>

      <h2 style={styles.heading}>
        Product Analytics Data
      </h2>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        style={styles.searchInput}
      />

      <select
        value={sortType}
        onChange={(e) =>
          setSortType(e.target.value)
        }
        style={styles.searchInput}
      >
        <option value="">
          Sort By Price
        </option>

        <option value="high">
          High to Low
        </option>

        <option value="low">
          Low to High
        </option>
      </select>

      <CSVLink
        data={filteredProducts}
        filename="sales-data.csv"
        style={styles.exportButton}
      >
        Export CSV
      </CSVLink>

      <table style={styles.table}>

        <thead>
          <tr style={styles.headerRow}>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((item) => (
            <tr key={item._id} style={styles.row}>

              <td>{item.name}</td>

              <td>{item.category}</td>

              <td>₹ {item.price}</td>

              <td>{item.quantity}</td>

              <td>
                <button
                  style={styles.deleteButton}
                  onClick={() =>
                    deleteProduct(item._id)
                  }
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

const styles = {
  container: {
    marginTop: "30px",
    background: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },

  heading: {
    marginBottom: "20px"
  },

  searchInput: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd"
  },

  exportButton: {
    display: "inline-block",
    backgroundColor: "#16a34a",
    color: "white",
    padding: "10px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    marginBottom: "20px"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  headerRow: {
    backgroundColor: "#f1f5f9"
  },

  row: {
    borderBottom: "1px solid #e5e7eb"
  },

  deleteButton: {
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default ProductTable;