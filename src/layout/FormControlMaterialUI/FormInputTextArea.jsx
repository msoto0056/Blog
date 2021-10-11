import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';

export const FormInputTextArea = ({ name="Name",  label="label", rules="" }) => {
  const {control,defaultValue} = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue = {defaultValue}
      render={({
        field: { onChange, value},
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          multiline
          rows={3}
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};

