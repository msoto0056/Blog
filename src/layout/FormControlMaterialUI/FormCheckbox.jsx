import React from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Controller, useFormContext  } from "react-hook-form";

export const FormCheckbox = ({ name, label, options, rules="" }) => {
  const {control, defaultValue} = useFormContext();
  
  return (
        <Controller
          rules={rules}
          name={name}
          control={control}
          defaultValue = {defaultValue}
          render={({ field: { value, onChange } }) => {
              return (
                <FormControlLabel
                  control={<Checkbox size ="small" checked={value} onChange={onChange} />}
                  label={label}
                />
              );
          }}
        />
      );
};