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
    } catch {
      toast.error("Product not found");
      setProduct(null);
    }
  };

  // =========================
  // RELATED PRODUCTS
  // =========================
  const fetchRelatedProducts = async (category) => {
    try {
      const res = await API.get(`/products?category=${category}`);

      setRelatedProducts(
        res.data.filter((p) => (p._id || p.id) !== id)
      );
    } catch {
      setRelatedProducts([]);
    }
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
      (item) => (item._id || item.id) === productId
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
      (item) => (item._id || item.id) === (product._id || product.id)
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
    } catch {
      toast.error("Failed to submit review");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (!product)
    return <div className="p-8 text-center">Loading...</div>;

  const getImage = (img) => {
    if (!img) return "/placeholder.jpg";
    return img.startsWith("http") ? img : `${IMAGE_BASE}/${img}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* PRODUCT SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* IMAGES */}
        <div>
          {mainImage && (
            <img
              src={getImage(mainImage)}
              alt="Main"
              className="w-full h-[400px] object-cover rounded-lg border"
            />
          )}

          <div className="flex gap-2 mt-4 overflow-x-auto">
            {product.image && (
              <img
                src={getImage(product.image)}
                alt="Thumbnail"
                onClick={() => setMainImage(product.image)}
                className="w-20 h-20 object-cover rounded cursor-pointer border"
              />
            )}

            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={getImage(img)}
                alt="Thumbnail"
                onClick={() => setMainImage(img)}
                className="w-20 h-20 object-cover rounded cursor-pointer border"
              />
            ))}
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col gap-4">

          <div className="flex items-start justify-between">
            <h1 className="text-2xl font-bold">{product.name}</h1>

            <button onClick={handleWishlistToggle}>
              {isWishlisted ? (
                <FaHeart className="text-pink-500 text-xl" />
              ) : (
                <FaRegHeart className="text-pink-500 text-xl" />
              )}
            </button>
          </div>

          <p>{product.description}</p>

          <div className="text-green-600 font-semibold text-lg">
            ₹{product.price}
          </div>

          {/* SIZE */}
          <div>
            <label>Select Size</label>

            <div className="flex gap-2 mt-2">
              {["5", "6", "7", "8", "9"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border rounded ${
                    selectedSize === size
                      ? "bg-blue-600 text-white"
                      : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white px-6 py-2 rounded"
            >
              Add to Cart
            </button>

            <button
              onClick={handleWishlistToggle}
              className={`px-6 py-2 rounded border-2 ${
                isWishlisted
                  ? "bg-pink-500 text-white"
                  : "text-pink-500 border-pink-500"
              }`}
            >
              Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">
          Customer Reviews
        </h2>

        {product.reviews?.map((review, idx) => (
          <div key={idx} className="border-b py-3">
            <p className="font-semibold">{review.user}</p>
            <p>{review.comment}</p>
            <p className="text-yellow-500">{review.rating} ★</p>
          </div>
        ))}
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">
          Related Products
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((prod) => (
            <ProductCard
              key={prod._id || prod.id}
              product={prod}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProductDetails;