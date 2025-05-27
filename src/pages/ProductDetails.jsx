import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import ProductCard from "../Components/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();

  const [reviewUser, setReviewUser] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const BASE_URL = "http://localhost:5000"; // adjust for deployment

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products/${id}`);
      setProduct(res.data);
      setMainImage(res.data.image);
      fetchRelatedProducts(res.data.category);
    } catch (error) {
      toast.error("Product not found", { autoClose: 1500 });
      setProduct(null);
    }
  };

  const fetchRelatedProducts = async (category) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products?category=${category}`);
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
    toast.success("Added to cart!", { autoClose: 1000 });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewUser.trim() || !reviewRating || !reviewComment.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    setIsSubmittingReview(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/products/${id}/reviews`, {
        user: reviewUser,
        rating: reviewRating,
        comment: reviewComment,
      });
      toast.success("Review submitted!", { autoClose: 1500 });
      setReviewUser("");
      setReviewComment("");
      setReviewRating(0);
      setProduct(res.data); // Refresh product with new review
    } catch (error) {
      toast.error("Failed to submit review");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (!product) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Product Image & Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Section */}
        <div>
          {mainImage && (
            <img
              src={mainImage.startsWith("http") ? mainImage : `${BASE_URL}/${mainImage}`}
              alt="Main"
              className="w-full h-[400px] object-cover rounded-lg border"
            />
          )}

          <div className="flex gap-2 mt-4 overflow-x-auto">
            {product.image && (
              <img
                src={product.image.startsWith("http") ? product.image : `${BASE_URL}/${product.image}`}
                alt="Thumbnail"
                onClick={() =>
                  setMainImage(product.image.startsWith("http") ? product.image : `${BASE_URL}/${product.image}`)
                }
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                  mainImage === (product.image.startsWith("http") ? product.image : `${BASE_URL}/${product.image}`)
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
              />
            )}

            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img.startsWith("http") ? img : `${BASE_URL}/${img}`}
                alt={`Thumbnail-${idx}`}
                onClick={() => setMainImage(img.startsWith("http") ? img : `${BASE_URL}/${img}`)}
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                  mainImage === (img.startsWith("http") ? img : `${BASE_URL}/${img}`) ? "ring-2 ring-blue-500" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-700">{product.description}</p>
          <div className="text-lg font-semibold text-green-600">₹{product.price}</div>

          <div className="mt-2">
            <label className="text-sm font-medium">Select Size:</label>
            <div className="flex gap-2 mt-1">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border rounded ${
                    selectedSize === size ? "bg-blue-600 text-white" : "bg-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Add to Cart
          </button>
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

        {/* Review Form */}
        <form onSubmit={handleReviewSubmit} className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>

          <input
            type="text"
            className="w-full border rounded p-2 text-sm mb-2"
            placeholder="Your name"
            value={reviewUser}
            onChange={(e) => setReviewUser(e.target.value)}
            required
          />

          <div className="flex gap-4 items-center mb-2">
            <label className="text-sm">Rating:</label>
            <select
              value={reviewRating}
              onChange={(e) => setReviewRating(Number(e.target.value))}
              className="border px-2 py-1 rounded"
            >
              <option value="0">Select</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} ★
                </option>
              ))}
            </select>
          </div>

          <textarea
            className="w-full border rounded p-2 text-sm"
            rows="3"
            placeholder="Write your review here..."
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
          ></textarea>

          <button
            type="submit"
            disabled={isSubmittingReview}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmittingReview ? "Submitting..." : "Submit Review"}
          </button>
        </form>
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
