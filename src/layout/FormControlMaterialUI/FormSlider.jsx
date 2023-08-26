import React, { useEffect } from "react";
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Controller, useFormContext } from "react-hook-form";

export const FormSlider = ({ name,label, rules=""}) => {
  const {control, setValue, defaultValue} = useFormContext();
  const [sliderValue, setSliderValue] = React.useState(30);

  useEffect(() => {
    if (sliderValue) setValue(name, sliderValue);
  }, [sliderValue, name, setValue]);

  const handleChange = (event, newValue) => {
    setSliderValue(newValue );
  };

  return (
    <>
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field, fieldState, formState}) => (
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <VolumeDownIcon />
                <Slider
                    value={sliderValue}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                    step={1}
                />
                <VolumeUpIcon />
            </Stack>
        )}
      />
    </>
  );
};