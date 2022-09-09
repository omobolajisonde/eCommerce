import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.scss";
import Header from "./components/Layout/Header/Header";
import Products from "./routes/Products/Products";
import Cart from "./routes/Cart/Cart";

import commerce from "./lib/commerce";
import Checkout from "./routes/Checkout/Checkout";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [error, setError] = useState("");
  const location = useLocation();
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };
  const addToCartHandler = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };
  const updateCartHandler = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };
  const removeItemHandler = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };
  const emptyCartHandler = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };
  const checkoutHandler = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setError(error.data.error.message);
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  console.log(cart);
  return (
    <>
      {!(location.pathname === "/checkout") && (
        <Header cartItemsQuantity={cart.total_items} />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Products products={products} addToCartHandler={addToCartHandler} />
          }
        />
        <Route
          path="cart"
          element={
            <Cart
              cart={cart}
              updateCartHandler={updateCartHandler}
              removeItemHandler={removeItemHandler}
              emptyCartHandler={emptyCartHandler}
            />
          }
        />
        <Route
          path="checkout"
          element={
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={checkoutHandler}
              error={error}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
