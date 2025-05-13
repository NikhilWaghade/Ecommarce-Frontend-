import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    brand: '',
    discountPercent: '',
    originalPrice: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin) {
      navigate('/admin/admin-login');
    } else {
      fetchProducts();
    }
  }, [admin, navigate]);

  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch(() => toast.error("Failed to load products", { autoClose: 1500 }));
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      toast.success("Product deleted", { autoClose: 1500 });
      fetchProducts();
    } catch {
      toast.error("Error deleting product", { autoClose: 1500 });
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAdditionalImagesChange = (e) => {
    setAdditionalImages(Array.from(e.target.files));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { name, description, price, category, stock, brand, discountPercent, originalPrice } = newProduct;

    if (!name || !description || !price || !category || !stock) {
      return toast.error("All fields are required", { autoClose: 1500 });
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('stock', stock);
    formData.append('brand', brand);
    formData.append('discountPercent', discountPercent);
    formData.append('originalPrice', originalPrice);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    additionalImages.forEach((file) => {
      formData.append('images', file);
    });

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/products/${editProductId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success("Product updated", { autoClose: 1500 });
        setIsEditing(false);
        setEditProductId(null);
      } else {
        await axios.post('http://localhost:5000/api/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success("Product added", { autoClose: 1500 });
      }
      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        brand: '',
        discountPercent: '',
        originalPrice: '',
      });
      setImageFile(null);
      setAdditionalImages([]);
      fetchProducts();
    } catch {
      toast.error("Error saving product", { autoClose: 1500 });
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditProductId(product._id);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      brand: product.brand,
      discountPercent: product.discountPercent,
      originalPrice: product.originalPrice,
    });
    setImageFile(null);
    setAdditionalImages([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/admin-login', { replace: true });
  };

  return (
    <div className="p-4 bg-gradient-to-r from-green-100 to-blue-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin Panel - Manage Products</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Add / Edit Product Form */}
      <form onSubmit={handleAddProduct} className="mb-6 space-y-4" encType="multipart/form-data">
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
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={newProduct.brand}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="discountPercent"
            placeholder="Discount Percent"
            value={newProduct.discountPercent}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="originalPrice"
            placeholder="Original Price"
            value={newProduct.originalPrice}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="p-2 border rounded"
          />
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleAdditionalImagesChange}
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
                <img src={`http://localhost:5000/${p.image}`} alt={p.name} className="w-12 h-12 object-cover rounded" />
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
