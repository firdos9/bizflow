import { useState } from "react";
import { addProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    stock: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await addProduct(formData);
      alert("Product Saved!");
      navigate("/inventory"); // Send user back to see the new list
    } catch (err) {
      alert("Failed to save product");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Add New Product</h2>
      <input
        placeholder="Name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        placeholder="SKU"
        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      />
      <input
        type="number"
        placeholder="Stock"
        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
      />
      <button onClick={handleSubmit}>Save Product</button>
    </div>
  );
};
export default AddProductPage;
