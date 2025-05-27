import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import {  LineChart,  Line,  XAxis,  YAxis,  CartesianGrid,  Tooltip, ResponsiveContainer,  BarChart,  Bar,} from 'recharts';
import { Plus, List, LayoutDashboard, LogOut, Menu } from 'lucide-react';

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
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  // Ref to right container to match sidebar height
  const rightContainerRef = useRef(null);
  const [sidebarHeight, setSidebarHeight] = useState('auto');

  useLayoutEffect(() => {
    function updateHeight() {
      if (rightContainerRef.current) {
        setSidebarHeight(rightContainerRef.current.clientHeight + 'px');
      }
    }
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [activeSection, products]);

  useEffect(() => {
    if (!admin) {
      navigate('/admin/admin-login');
    } else {
      fetchProducts();
    }
  }, [admin, navigate]);

  const fetchProducts = () => {
    axios
      .get('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch(() => toast.error('Failed to load products', { autoClose: 1500 }));
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      toast.success('Product deleted', { autoClose: 1500 });
      fetchProducts();
    } catch {
      toast.error('Error deleting product', { autoClose: 1500 });
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
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
      return toast.error('All fields are required', { autoClose: 1500 });
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
    if (imageFile) formData.append('image', imageFile);
    additionalImages.forEach((file) => formData.append('images', file));

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/products/${editProductId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Product updated', { autoClose: 1500 });
        setIsEditing(false);
        setEditProductId(null);
      } else {
        await axios.post('http://localhost:5000/api/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Product added', { autoClose: 1500 });
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
      toast.error('Error saving product', { autoClose: 1500 });
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
    setActiveSection('addProduct');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const chartData = [
    { month: 'Jan', users: 100, sales: 240 },
    { month: 'Feb', users: 150, sales: 300 },
    { month: 'Mar', users: 200, sales: 400 },
    { month: 'Apr', users: 250, sales: 380 },
    { month: 'May', users: 300, sales: 500 },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Mobile/Tablet top navbar */}
 <div className="md:hidden flex flex-col bg-gray-500 text-white">

      {/* Top Bar with Title and Menu Button */}
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button
          aria-label="Toggle Menu"
          onClick={() => setSidebarOpen((prev) => !prev)}
          className=""
        >
          <Menu size={24} />
        </button>
      </div>
      

      {/* Dropdown Items */}
      <div
  className={`transition-all duration-300 overflow-hidden ${
    sidebarOpen ? "max-h-60" : "max-h-0"
  }`}
>
  <div className="flex flex-col space-y-3 px-4 py-3 bg-gray-600 rounded-b-md shadow-md">
    <button
      onClick={() => {
        setActiveSection("dashboard");
        setSidebarOpen(false);
      }}
      className="flex items-center gap-2 text-left text-white hover:text-blue-400 transition-colors"
    >
      <LayoutDashboard size={18} /> Dashboard
    </button>

    <button
      onClick={() => {
        setActiveSection("addProduct");
        setSidebarOpen(false);
      }}
      className="flex items-center gap-2 text-left text-white hover:text-blue-400 transition-colors"
    >
      <Plus size={18} /> Add Product
    </button>

    <button
      onClick={() => {
        setActiveSection("productList");
        setSidebarOpen(false);
      }}
      className="flex items-center gap-2 text-left text-white hover:text-blue-400 transition-colors"
    >
      <List size={18} /> Product List
    </button>

    <button
      onClick={() => {
        handleLogout();
        setSidebarOpen(false);
      }}
      className="flex items-center gap-2 text-left text-red-300 hover:text-red-500 transition-colors"
    >
      <LogOut size={18} /> Logout
    </button>
  </div>
</div>

    </div>


      {/* Sidebar */}
     <nav
  className={`
    hidden md:block md:relative md:flex-shrink-0
    w-60 bg-gray-500 text-white p-4 h-auto
  `}
>
  <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
  
  <nav className="space-y-4">
    <button
      onClick={() => {
        setActiveSection('dashboard');
      }}
      className={`flex items-center gap-2 w-full p-2 rounded ${
        activeSection === 'dashboard' ? 'bg-gray-700 text-blue-400' : ''
      }`}
    >
      <LayoutDashboard size={18} /> Dashboard
    </button>

    <button
      onClick={() => {
        setActiveSection('addProduct');
      }}
      className={`flex items-center gap-2 w-full p-2 rounded ${
        activeSection === 'addProduct' ? 'bg-gray-700 text-blue-400' : ''
      }`}
    >
      <Plus size={18} /> Add Product
    </button>

    <button
      onClick={() => {
        setActiveSection('productList');
      }}
      className={`flex items-center gap-2 w-full p-2 rounded ${
        activeSection === 'productList' ? 'bg-gray-700 text-blue-400' : ''
      }`}
    >
      <List size={18} /> Product List
    </button>

    <button
      onClick={() => {
        handleLogout();
      }}
      className="flex items-center gap-2 w-full p-2 bg-red-600 hover:bg-red-700 text-white rounded mt-8"
    >
      <LogOut size={18} /> Logout
    </button>
  </nav>
    </nav>


      {/* Main Content */}
      <main
        ref={rightContainerRef}
        className="flex-1 p-6 ml-0 md:ml-64 overflow-auto"
        style={{ minHeight: '100vh' }}
      >
        {/* Dashboard Graphs */}
        {activeSection === 'dashboard' && (
          <div className="space-y-10">
            <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* User Growth Line Chart */}
              <div className="bg-white rounded shadow p-4">
                <h3 className="text-xl font-semibold mb-4">User Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#4A90E2" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Product Sales Bar Chart */}
              <div className="bg-white rounded shadow p-4">
                <h3 className="text-xl font-semibold mb-4">Product Sales</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Add / Edit Product Form */}
      {activeSection === 'addProduct' && (
  <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 mt-4">
    <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
      {isEditing ? 'Edit Product' : 'Add Product'}
    </h2>

    <form onSubmit={handleAddProduct} className="space-y-6">
      {/* Product Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Category</label>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleInputChange}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Price ($)</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Original Price ($)</label>
          <input
            type="number"
            name="originalPrice"
            placeholder="Original Price"
            value={newProduct.originalPrice}
            onChange={handleInputChange}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Brand</label>
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={newProduct.brand}
            onChange={handleInputChange}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Discount (%)</label>
          <input
            type="number"
            name="discountPercent"
            placeholder="Discount %"
            value={newProduct.discountPercent}
            onChange={handleInputChange}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            min="0"
            max="100"
            step="0.01"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleInputChange}
          className="w-full border rounded p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          rows={4}
          required
        />
      </div>

      {/* Image Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-1">Main Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {imageFile && (
            <p className="mt-1 text-sm text-green-600">
              Selected: {imageFile.name}
            </p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Additional Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleAdditionalImagesChange}
            className="w-full"
          />
          {additionalImages.length > 0 && (
            <p className="mt-1 text-sm text-green-600">
              {additionalImages.length} file(s) selected
            </p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setEditProductId(null);
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
            }}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  </div>
)}


{/* Product List */}
{activeSection === 'productList' && (
  <div className="max-w-7xl mx-auto px-4 py-6">
    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">📦 Product List</h2>
    
    <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="text-xs uppercase bg-gray-100 text-gray-600 sticky top-0 z-10">
          <tr>
            <th className="px-4 sm:px-6 py-3">Image</th>
            <th className="px-4 sm:px-6 py-3">Name</th>
            <th className="px-4 sm:px-6 py-3">Category</th>
            <th className="px-4 sm:px-6 py-3">Price</th>
            <th className="px-4 sm:px-6 py-3">Stock</th>
            <th className="px-4 sm:px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr
                key={product._id}
                className={`transition duration-200 hover:bg-gray-50 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="px-4 sm:px-6 py-3">
                  <img
                    src={
                      product.image
                        ? `http://localhost:5000/${product.image}`
                        : 'https://via.placeholder.com/56x56?text=No+Image'
                    }
                    alt={product.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-md border"
                  />
                </td>
                <td className="px-4 sm:px-6 py-3 font-semibold">{product.name}</td>
                <td className="px-4 sm:px-6 py-3">{product.category}</td>
                <td className="px-4 sm:px-6 py-3">${product.price}</td>
                <td className="px-4 sm:px-6 py-3">{product.stock}</td>
                <td className="px-4 sm:px-6 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="px-2 sm:px-3 py-1 text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 rounded-md transition text-xs sm:text-sm"
                    >
                      ✏️ Update
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="px-2 sm:px-3 py-1 text-red-600 hover:text-white hover:bg-red-600 border border-red-600 rounded-md transition text-xs sm:text-sm"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
)}

      </main>
    </div>
  );
};

export default AdminPanel;
