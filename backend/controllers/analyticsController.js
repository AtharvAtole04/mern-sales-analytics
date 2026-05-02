import Product from "../models/Product.js";

// Total Business Summary
export const getDashboardStats = async (req, res) => {
  try {
    const products = await Product.find();

    const totalProducts = products.length;

    const totalQuantity = products.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const totalRevenue = products.reduce(
  (sum, item) => sum + (item.price + item.quantity),
  0
);

    res.status(200).json({
      totalProducts,
      totalQuantity,
      totalRevenue
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Monthly Sales Data
export const getMonthlySales = async (req, res) => {
  try {
    const products = await Product.find();

    const monthData = {};

    products.forEach((item) => {
      if (!monthData[item.saleMonth]) {
        monthData[item.saleMonth] = 0;
      }

      monthData[item.saleMonth] +=
        item.price * item.quantity;
    });

    res.status(200).json(monthData);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};