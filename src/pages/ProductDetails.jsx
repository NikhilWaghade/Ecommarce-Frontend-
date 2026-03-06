import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ProductCard from "../Components/ProductCard";
import API from "../api/api";

const IMAGE_BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace("/api", "")
  : "http://localhost:5000";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  const [reviewUser, setReviewUser] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // =========================
  // FETCH PRODUCT
  // =========================
  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);

      setProduct(res.data);
      setMainImage(res.data.image);

      fetchRelatedProducts(res.data.category);
    } catch (error) {
      console.error(error);
      toast.error("Product not found");
      setProduct(null);
    }
  };

  // =========================
  // FETCH RELATED PRODUCTS
  // =========================
  const fetchRelatedProducts = async (category) => {
    try {
      const res = await API.get(`/products?category=${category}`);

      const filtered = res.data.filter((p) => (p._id || p.id) !== id);

      setRelatedProducts(filtered);
    } catch (error) {
      console.error(error);
      setRelatedProducts([]);
    }
  };

  // =========================
  // IMAGE HELPER
  // =========================
  const getImage = (img) => {
    if (!img) return "/placeholder.jpg";

    // Agar already full URL hai to use karo
    if (img.startsWith("http")) {
      return img;
    }

    // Agar sirf uploads path hai to backend URL add karo
    return `${IMAGE_BASE}/${img}`;
  };

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    addToCart({ ...product, selectedSize });

    toast.success("Added to cart!");
  };

  // =========================
  // WISHLIST
  // =========================
  const handleWishlistToggle = () => {
    if (!product) return;

    const productId = product._id || product.id;

    const exists = wishlistItems.some(
      (item) => (item._id || item.id) === productId,
    );

    if (exists) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(product);
    }
  };

  const isWishlisted =
    product &&
    wishlistItems.some(
      (item) => (item._id || item.id) === (product._id || product.id),
    );

  // =========================
  // SUBMIT REVIEW
  // =========================
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!reviewUser.trim() || !reviewRating || !reviewComment.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    setIsSubmittingReview(true);

    try {
      const res = await API.post(`/products/${id}/reviews`, {
        user: reviewUser,
        rating: reviewRating,
        comment: reviewComment,
      });

      toast.success("Review submitted!");

      setReviewUser("");
      setReviewComment("");
      setReviewRating(0);

      setProduct(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (!product) {
    return <div className="p-10 text-center text-lg">Loading product...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* PRODUCT SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* IMAGES */}
        <div>
          {mainImage && (
            <img
              src={getImage(mainImage)}
              alt="product"
              className="w-full h-[420px] object-cover rounded-xl border"
            />
          )}

          <div className="flex gap-3 mt-4 overflow-x-auto">
            {product.image && (
              <img
                src={getImage(product.image)}
                alt="thumb"
                onClick={() => setMainImage(product.image)}
                className="w-20 h-20 object-cover rounded cursor-pointer border"
              />
            )}

            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={getImage(img)}
                alt="thumb"
                onClick={() => setMainImage(img)}
                className="w-20 h-20 object-cover rounded cursor-pointer border"
              />
            ))}
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">{product.name}</h1>

            <button onClick={handleWishlistToggle}>
              {isWishlisted ? (
                <FaHeart className="text-pink-500 text-2xl" />
              ) : (
                <FaRegHeart className="text-pink-500 text-2xl" />
              )}
            </button>
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="text-2xl font-bold text-green-600">
            ₹{product.price}
          </div>

          {/* SIZE */}
          <div>
            <p className="font-semibold mb-2">Select Size</p>

            <div className="flex gap-3">
              {["5", "6", "7", "8", "9"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedSize === size
                      ? "bg-blue-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800"
            >
              Add To Cart
            </button>

            <button
              onClick={handleWishlistToggle}
              className={`flex-1 py-3 rounded-lg border-2 ${
                isWishlisted
                  ? "bg-pink-500 text-white border-pink-500"
                  : "border-pink-500 text-pink-500"
              }`}
            >
              Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

        {product.reviews?.length ? (
          product.reviews.map((review, index) => (
            <div key={index} className="border-b py-4">
              <p className="font-semibold">{review.user}</p>
              <p className="text-gray-600">{review.comment}</p>
              <p className="text-yellow-500">{review.rating} ★</p>
            </div>
          ))
        ) : (
          <p>No reviews yet</p>
        )}

        {/* REVIEW FORM */}
        <form onSubmit={handleReviewSubmit} className="mt-6 space-y-3">
          <input
            type="text"
            placeholder="Your Name"
            value={reviewUser}
            onChange={(e) => setReviewUser(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <select
            value={reviewRating}
            onChange={(e) => setReviewRating(Number(e.target.value))}
            className="border p-2 rounded"
          >
            <option value="0">Rating</option>
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} ★
              </option>
            ))}
          </select>

          <textarea
            rows="3"
            placeholder="Write review"
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <button
            disabled={isSubmittingReview}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            {isSubmittingReview ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-14">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((prod) => (
            <ProductCard key={prod._id || prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
