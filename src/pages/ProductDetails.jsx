import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import ProductCard from "../Components/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        fetchRelatedProducts(res.data.category); // or any related logic
      })
      .catch(() => {
        toast.error("Product not found", { autoClose: 1500 });
        setProduct(null);
      });
  }, [id]);

  const fetchRelatedProducts = async (category) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products?category=${category}`);
      setRelatedProducts(res.data.filter((p) => p._id !== id));
    } catch {
      setRelatedProducts([]);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size", { autoClose: 1500 });
      return;
    }

    addToCart({ ...product, selectedSize });
    toast.success("Added to cart!", { autoClose: 1500 });
  };
  

  if (!product) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6  ">
      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
       {/* Left: Images */}
<div className="grid grid-cols-2 gap-4 border-2 border-red-500">
  {product.images?.map((img, idx) => (
   <img
   key={idx}
   src={`http://localhost:5000${img}`} // prepend server URL
   alt={`product-${idx}`}
   className="rounded-md w-full object-cover"
 />
  
  ))}

</div>
        {/* Right: Info */}
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-500 mt-1">{product.brand}</p>

          <div className="flex items-center mt-2 text-sm text-green-600">
            <span className="font-semibold">{product.rating} ★</span>
            <span className="ml-2 text-gray-500">({product.reviewsCount} Ratings)</span>
          </div>

          {/* Price */}
          <div className="mt-4">
            <span className="text-2xl font-bold text-black">₹{product.price}</span>
            {product.originalPrice && (
              <>
                <span className="ml-2 line-through text-gray-400">₹{product.originalPrice}</span>
                <span className="ml-2 text-pink-600 font-semibold">
                  ({product.discountPercent}% OFF)
                </span>
              </>
            )}
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <p className="font-semibold mb-2">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-4 py-1 rounded ${
                    selectedSize === size ? "bg-pink-600 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-pink-600 text-white px-6 py-2 rounded font-semibold hover:bg-pink-700"
            >
              Add to Cart
            </button>
            <button className="border border-gray-400 px-6 py-2 rounded font-semibold hover:bg-gray-100">
              Wishlist
            </button>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Product Details</h3>
            <p className="text-gray-700 text-sm">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        {product.reviews?.length ? (
          product.reviews.map((review, idx) => (
            <div key={idx} className="border-b py-4">
              <p className="font-semibold">{review.user}</p>
              <p className="text-sm text-gray-600">{review.comment}</p>
              <p className="text-yellow-500">{review.rating} ★</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((prod) => (
            <ProductCard key={prod._id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
