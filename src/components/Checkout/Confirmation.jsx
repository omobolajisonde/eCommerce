import React from "react";
import { Typography, Divider, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const Confirmation = ({ order, error }) => {
  console.log(order, error);
  if (error) {
    return (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
      </>
    );
  }
  return order.customer ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
        <Divider />
        <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home
      </Button>
    </>
  ) : (
    <div>
      <CircularProgress />
    </div>
  );
};

export default Confirmation;
