import { Button, Typography } from "@mui/material";
import React from "react";
import "./CartSummary.scss";
import { Link } from "react-router-dom";

const CartSummary = ({ subtotal, deliveryFee, emptyCartHandler }) => {
  const total = (subtotal.raw + deliveryFee).toLocaleString();
  return (
    <div className="cart__summary">
      <Typography variant="h4" className="cart__summary--title">
        Cart Summary
      </Typography>
      <Typography variant="h5" className="cart__summary--subtitle">
        Subtotal: {subtotal.formatted_with_symbol}
      </Typography>
      <Typography variant="h5" className="cart__summary--subtitle">
        Delivery Fee: {`₦${deliveryFee.toLocaleString()}`}
      </Typography>
      <Typography variant="h5" className="cart__summary--subtitle">
        Total: {`₦${total}`}
      </Typography>
      <div className="cart__summary--cta">
        <Button
          type="button"
          variant="outlined"
          sx={{
            marginTop: "1rem",
            fontSize: "1.5rem",
            borderColor: "#777",
            color:"#777",
          }}
          onClick={emptyCartHandler}
        >
          Empty Cart
        </Button>
        <Button
          component={Link}
          to="/checkout"
          type="button"
          variant="contained"
          sx={{
            marginTop: "1rem",
            fontSize: "1.5rem",
            backgroundColor: "#777",
          }}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
