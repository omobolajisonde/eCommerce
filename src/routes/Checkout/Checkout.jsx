import React, { useState, useEffect } from "react";
import "./Checkout.scss";
import { Paper, Stepper, Step, StepLabel, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddressForm from "../../components/Checkout/AddressForm";
import PaymentForm from "../../components/Checkout/PaymentForm";
import Confirmation from "../../components/Checkout/Confirmation";
import commerce from "../../lib/commerce";

const steps = ["Shipping Address", "Payment Details"];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const generateCheckoutToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        console.log(token);
        setToken(token);
      } catch (error) {
        navigate("/");
      }
    };
    generateCheckoutToken();
  }, [cart]);

  const nextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const next = (data) => {
    setShippingData(data);
    nextStep();
  };
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={token} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={token}
        prevStep={prevStep}
        nextStep={nextStep}
        onCaptureCheckout={onCaptureCheckout}
      />
    );

  return (
    <>
      <section className="checkout">
        <Paper className="checkout__paper" elevation={3}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel className="checkout__label">{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation order={order} error={error} />
          ) : (
            token && <Form />
          )}
        </Paper>
      </section>
    </>
  );
};

export default Checkout;
