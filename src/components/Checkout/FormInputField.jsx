import React from 'react';
import { TextField,Grid } from '@mui/material';
import { useFormContext,Controller } from 'react-hook-form';

const FormInputField = ({name,label,required}) => {
    const methods = useFormContext();
  return (
    <Grid item xs={12} sm={6}>
        <Controller 
        defaultValue=""
            render={
                ({field,fieldState,formState})=>{
                    console.log(field,fieldState,formState);
                    return <TextField {...field} required={required} label={label} variant="standard" />
                }
            }
            control={methods.control}
            name={name}
        />
    </Grid>
    )
}

export default FormInputField