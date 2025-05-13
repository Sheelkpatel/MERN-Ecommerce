import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "Rs ";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const delivery_fee = 100;

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  
  const [wishlistData, setWishlistData] = useState([]);

  const [wishlistItems, setWishlistItems] = useState(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const storedWishlist = user ? localStorage.getItem(`wishlist_${user._id}`) : null;
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });
  
  // Initial auth check
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/product/publish/list`);
        if (res.data.success) {
          setProducts(res.data.products.reverse());
        } else {
          toast.error(res.data.message);
        }
      } catch (err) {
        toast.error(err.message);
      }
    };
    fetchProducts();
  }, []);

  // Fetch cart and wishlist when token changes
  useEffect(() => {
    if (token) {
      getUserCart(token);
      getUserWishlist(token);
    }
  }, [token]);

  // Update wishlistData when products or wishlistItems update
  useEffect(() => {
    if (products.length > 0 && wishlistItems.length > 0) {
      const tempWishlist = wishlistItems
        .map((id) => products.find((p) => p._id === id))
        .filter(Boolean);
      setWishlistData(tempWishlist);
    }
  }, [products, wishlistItems]);

  // Wishlist: fetch
// Inside ShopContext
const getUserWishlist = async () => {
  const storedToken = localStorage.getItem("token");
  if (!storedToken || !user?._id) return;

  try {
    const res = await axios.get(`${backendUrl}/api/wishlist/${user._id}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    if (res.data.success) {
      const wishlist = res.data.wishlist;
      if (Array.isArray(wishlist) && wishlist.length > 0) {
        setWishlistData(wishlist);
        setWishlistItems(wishlist.map((item) => item._id));
      } else {
        setWishlistData([]);
        setWishlistItems([]);
      }
    }
  } catch (err) {
    toast.error("Failed to fetch wishlist");
    console.error(err);
  }
};

    

  // Wishlist: add
  const addToWishlist = async (productId) => {
    if (!token) {
      toast.error("Please log in to add items to wishlist.");
      return;
    }
    try {
      const res = await axios.post(`${backendUrl}/api/wishlist/add`, { productId }, { headers: { token } });
      if (res.data.success) {
        setWishlistItems((prev) => [...prev, productId]);
        toast.success("Added to Wishlist!");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Error adding to wishlist");
      console.error(err);
    }
  };

  // Wishlist: remove
  const removeFromWishlist = async (productId) => {
    if (!token) {
      toast.error("Please log in to remove items from wishlist.");
      return;
    }
    try {
      const res = await axios.post(`${backendUrl}/api/wishlist/remove`, { productId }, { headers: { token } });
      if (res.data.success) {
        setWishlistItems((prev) => prev.filter((id) => id !== productId));
        setWishlistData((prev) => prev.filter((item) => item._id !== productId));
        toast.success("Removed from Wishlist!");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Error removing from wishlist");
      console.error(err);
    }
  };

  // Cart
  const addToCart = async (itemId, size) => {
    if (!size) return toast.error("Select Product Size");

    const cartClone = structuredClone(cartItems);
    cartClone[itemId] = { ...(cartClone[itemId] || {}), [size]: (cartClone[itemId]?.[size] || 0) + 1 };
    setCartItems(cartClone);
    toast.success("Added to Cart");

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } });
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const cartClone = structuredClone(cartItems);
    cartClone[itemId][size] = quantity;
    setCartItems(cartClone);

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } });
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (product) {
        for (const size in cartItems[itemId]) {
          total += product.price * cartItems[itemId][size];
        }
      }
    }
    return total;
  };

  const getCartCount = () => {
    return Object.values(cartItems)
      .flatMap((obj) => Object.values(obj))
      .reduce((a, b) => a + b, 0);
  };

  const getUserCart = async (token) => {
    try {
      const res = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });
      if (res.data.success) {
        setCartItems(res.data.cartData);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    if (user) {
      localStorage.setItem(`wishlist_${user._id}`, JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, user]);
  

  const value = {
    user,
    setUser,
    currency,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    products,
    cartItems,
    setCartItems,
    addToCart,
    getCartAmount,
    getCartCount,
    updateQuantity,
    token,
    setToken,
    navigate,
    backendUrl,
    wishlistItems,
    wishlistData,
    addToWishlist,
    removeFromWishlist,
    getUserWishlist,
    getUserCart,
    delivery_fee,
    setWishlistItems
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
