import { useState, useContext, createContext, useEffect } from "react";

//Step 1: CReating context || PRovider(Value to pass directly) && consumer(Consumes and uses shared data)
const CartContext = createContext();

//children is all sub components
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    let existingCart = localStorage.getItem("cart");
    if (existingCart) setCart(JSON.parse(existingCart));
  }, []);

  return (
    //Return the context provider with the cart value provided to its descendants//childres
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

//custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
