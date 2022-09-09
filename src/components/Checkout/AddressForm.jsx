import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import "./AddressForm.scss";
import { useForm, FormProvider } from "react-hook-form";
import FormInputField from "./FormInputField";
import commerce from "../../lib/commerce";
import { Link } from "react-router-dom";

const AddressForm = ({ checkoutToken,next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const methods = useForm();
  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };
  const fetchShippingSubdivisions = async (checkoutTokenId, countryCode) => {
    const { subdivisions } =
      await commerce.services.localeListShippingSubdivisions(
        checkoutTokenId,
        countryCode
      );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };
  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, [checkoutToken]);
  useEffect(() => {
    if (shippingCountry)
      fetchShippingSubdivisions(checkoutToken.id, shippingCountry);
  }, [checkoutToken, shippingCountry]);
  useEffect(() => {
    if (shippingCountry && shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [checkoutToken, shippingCountry, shippingSubdivision]);
  const countries = Object.entries(shippingCountries).map(([code, country]) => {
    return { code: code, label: country };
  });
  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => {
      return { code: code, label: name };
    }
  );
  const options = shippingOptions.map((sO) => ({
    id: sO.id,
    label: `${sO.description} (${sO.price.formatted_with_code})`,
  }));
  return (
    <>
      <Typography variant="h6">Shipping Address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(data=>next({...data,shippingCountry,shippingSubdivision,shippingOption}))}>
          <Grid container spacing={3}>
            <FormInputField name="firstName" label="First Name" required />
            <FormInputField name="lastName" label="Last Name" required />
            <FormInputField name="address1" label="Address" required />
            <FormInputField name="email" label="Email" required />
            <FormInputField name="city" label="City" required />
            <FormInputField name="ZIP" label="ZIP / Postal Code" required />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.code} value={subdivision.code}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <div className="address__cta">
              <Button component={Link} to="/cart" variant="outlined">Back to cart</Button>
              <Button type="submit" variant="contained">Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
