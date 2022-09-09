import React from "react";
import "./CartItem.scss";
import { IconButton, Button, Typography } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = ({ product, index, updateCartHandler, removeItemHandler }) => {
  console.log(product);
  const isEven = index % 2 === 0;
  return (
    <div className={`cart__product ${isEven ? "cart__product-alt" : ""}`}>
      <figure className="cart__item">
        <img src={product.image.url} alt={product.name} className="cart__img" />
        <div className="cart__details">
          <figcaption>
            <span>Title</span>
            <span className="cart__title">{product.name}</span>
          </figcaption>
          <figcaption>
            <span>Price</span>
            <span className="cart__price">
              {product.price.formatted_with_symbol}
            </span>
          </figcaption>
          <figcaption>
            <span>Subtotal</span>{" "}
            <span className="cart__code">
              {product.line_total.formatted_with_symbol}
            </span>
          </figcaption>
        </div>
      </figure>
      <div className="cart__quantity">
        <div className="cart__cta">
          <IconButton
            aria-label="decrement button"
            onClick={() => updateCartHandler(product.id, product.quantity - 1)}
          >
            <RemoveCircleIcon
              sx={{
                width: "2rem",
                height: "2rem",
              }}
            />
          </IconButton>
          <span className="cart__cta--label">{product.quantity}</span>
          <IconButton
            aria-label="increment button"
            onClick={() => updateCartHandler(product.id, product.quantity + 1)}
          >
            <AddCircleIcon
              sx={{
                width: "2rem",
                height: "2rem",
              }}
            />
          </IconButton>
        </div>
        <Button
          sx={{
            fontSize: "1.4rem",
            backgroundColor: "#777",
          }}
          className="cart__cta--btn"
          type="button"
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={() => removeItemHandler(product.id)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
