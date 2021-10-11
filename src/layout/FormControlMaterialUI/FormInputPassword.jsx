import React, {useState} from "react";
import { Controller, useFormContext } from "react-hook-form";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export const FormInputPassword = ({ name="Name", label="Label", rules="" }) => {
  const {control,defaultValue} = useFormContext();
  const [showPassword,setShowPassword]=useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
      <FormControl sx={{ m: 1, width: '25ch', fontSize: 10 }} variant="outlined" size='small'>
          <InputLabel htmlFor="outlined-adornment-password sx={{ fontSize: 5 }}">{label}</InputLabel>
            <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue}
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) => (
                <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                size='small'
                error={!!error}
                onChange={onChange}
                value={value}
                fullWidth
                endAdornment={
                    <InputAdornment position="end" size= 'small'>
                        <IconButton
                        size= 'small'
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
                />       
            )}
            />
    </FormControl>
  );
};

