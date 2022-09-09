import React from "react";
import Typography from "@mui/material/Typography";
import "./Cart.scss";
import CartItem from "../../components/Cart/CartItem";
import CartSummary from "../../components/Cart/CartSummary";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
const deliveryFee = 550;
const EmptyCart = () => {
  return (
    <Paper elevation={3} sx={{
      p: 8,
    }}>
      <Typography variant="h4">Your cart is empty, start shopping <Link to="/" className="cart__link">HERE</Link>.</Typography>
    </Paper>
  );
};

const Cart = ({
  cart,
  updateCartHandler,
  removeItemHandler,
  emptyCartHandler,
}) => {
  console.log(cart);
  if (!cart?.line_items?.length) return <EmptyCart />;
  return (
    <section className="cart">
      <Typography variant="h2">
        Shopping cart <span>({cart.total_items})</span>
      </Typography>
      <div className="cart__container">
        <div className="cart__container--1">
          <div className="cart__heading">
            <Typography variant="h4" className="cart__heading-1">
              Product Details
            </Typography>
            <Typography variant="h4" className="cart__heading-2">
              Quantity
            </Typography>
          </div>
          {cart.line_items.map((product, i) => (
            <CartItem
              key={product.id}
              product={product}
              index={i}
              updateCartHandler={updateCartHandler}
              removeItemHandler={removeItemHandler}
            />
          ))}
        </div>
        <div className="cart__container--2">
          <CartSummary
            subtotal={cart.subtotal}
            deliveryFee={deliveryFee}
            emptyCartHandler={emptyCartHandler}
          />
        </div>
      </div>
    </section>
  );
};

export default Cart;
