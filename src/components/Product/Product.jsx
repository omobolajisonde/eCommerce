import React from "react";
import { Grid, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./Product.scss";

const Product = ({ product, addToCartHandler }) => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
    >
      <figure className="product">
        <img
          src={product.image.url}
          alt="store product"
          className="product__img"
        />
        <figcaption className="product__name">{product.name}</figcaption>
        <figcaption className="product__price">
          {product.price.formatted_with_symbol}
        </figcaption>
        <IconButton
          aria-label="add to shopping cart"
          sx={{
            alignSelf: "flex-end",
            marginRight: ".5rem",
            color: "orangered",
          }}
          onClick={() => addToCartHandler(product.id, 1)}
        >
          <AddShoppingCartIcon
            sx={{
              fontSize: "3rem",
            }}
          />
        </IconButton>
      </figure>
    </Grid>
  );
};

export default Product;
