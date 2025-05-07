import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(() => toast.error("Failed to load products"));
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch {
      toast.error("Error deleting product");
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { name, description, price, image, category, stock } = newProduct;

    if (!name || !description || !price || !image || !category || !stock) {
      return toast.error("All fields are required", { autoClose: 1500 });
    }

    if (isEditing) {
      try {
        await axios.put(`http://localhost:5000/api/products/${editProductId}`, {
          name,
          description,
          price: parseFloat(price),
          image,
          category,
          stock: parseInt(stock),
        });
        toast.success("Product updated", { autoClose: 1500 });
        setIsEditing(false);
        setEditProductId(null);
      } catch {
        toast.error("Error updating product");
      }
    } else {
      try {
        await axios.post('http://localhost:5000/api/products', {
          name,
          description,
          price: parseFloat(price),
          image,
          category,
          stock: parseInt(stock),
        });
        toast.success("Product added", { autoClose: 1500 });
      } catch {
        toast.error("Error adding product", { autoClose: 1500 });
      }
    }

    setNewProduct({
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
      stock: '',
    });
    fetchProducts();
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditProductId(product._id);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4 bg-gradient-to-r from-green-100 to-blue-200">
      <h2 className="text-2xl font-bold mb-4">Admin Panel - Manage Products</h2>

      {/* Add / Edit Product Form */}
      <form onSubmit={handleAddProduct} className="mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="p-2 border rounded col-span-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product Table */}
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">Stock</th>
            <th className="border px-2 py-1">Category</th>
            <th className="border px-2 py-1">Image</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td className="border px-2 py-1">{p.name}</td>
              <td className="border px-2 py-1">₹{p.price}</td>
              <td className="border px-2 py-1">{p.stock}</td>
              <td className="border px-2 py-1">{p.category}</td>
              <td className="border px-2 py-1">
                <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
              </td>
              <td className="border px-2 py-1">
                <button
                  className="text-blue-600 mr-2"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => deleteProduct(p._id)}
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
};

export default AdminPanel;
