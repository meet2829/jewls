// utils/cartUtils.js

// Get cart from localStorage
export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

// Add a product to cart
export const addToCart = (product) => {
  const cart = getCart();
  const existingItem = cart.find((item) => item._id === product._id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

// Update quantity of a product
export const updateQuantity = (productId, amount) => {
  const cart = getCart().map(item => {
    if (item._id === productId) {
      return { ...item, quantity: Math.max(1, item.quantity + amount) };
    }
    return item;
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

// Remove a product from cart
export const removeFromCart = (productId) => {
  const cart = getCart().filter(item => item._id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

// Clear entire cart
export const clearCart = () => {
  localStorage.removeItem('cart');
};
