import { createContext, useContext, useCallback, useMemo } from "react";
import { useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Stable reference for addToCart using useCallback
  const addToCart = useCallback((item) => {
    setCart((prev) => {
      const existingItemIndex = prev.findIndex(
        (cartItem) => cartItem.Name === item.Name
      );
      
      if (existingItemIndex > -1) {
        const updatedCart = [...prev]; // 
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: (updatedCart[existingItemIndex].quantity || 1) + 1
        };
        return updatedCart;
      }
      
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

const removeFromCart = useCallback((item) => {
  setCart((prev) => {
    const existingItemIndex = prev.findIndex(
      (cartItem) => cartItem.Name === item.Name
    );

    if (existingItemIndex > -1) {
      const updatedCart = [...prev]; // shallow copy of array

      if (updatedCart[existingItemIndex].quantity > 1) {
        // ✅ create a new object instead of mutating
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity - 1,
        };
        return updatedCart;
      }

      // remove if quantity is 1
      return updatedCart.filter((_, index) => index !== existingItemIndex);
    }

    return prev;
  });
}, []);


  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart
  }), [cart, addToCart, removeFromCart]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};