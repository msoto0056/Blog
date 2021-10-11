import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';

export const FormInputSelect = ({ name="Name", label="Label", options, rules="" }) => {
  const {control} = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          select
          helperText={error ? error.message : null}
          size={"small"}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
         >
        {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField> 
      )}
    />
  );
};

