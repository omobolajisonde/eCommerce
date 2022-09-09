import React from "react";
import Grid from "@mui/material/Grid";
import "./Products.scss";
import Product from "../../components/Product/Product";

const Products = ({ products, addToCartHandler }) => {
  return (
    <main className="main">
      <Grid
        sx={{ p: 2.5}}
        container
        spacing={{ xs: 4, sm: 2.5, md: 2, lg: 2.5 }}
      >
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </Grid>
    </main>
  );
};

export default Products;
