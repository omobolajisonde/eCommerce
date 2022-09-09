import "./Review.scss";
import React from 'react';
import { Typography,List,ListItem,ListItemText } from "@mui/material";

const Review = ({checkoutToken}) => {
  return (
    <>
        <Typography variant="h6">Order Summary</Typography>
        <List>
            {checkoutToken.live.line_items.map(product=>(
                <ListItem key={product.name}>
                    <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
                    <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
                </ListItem>
            ))}
            <ListItem>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1">{checkoutToken.live.subtotal.formatted_with_symbol}</Typography>
            </ListItem>
        </List>
    </>
    )
}

export default Review