import React, { useEffect } from "react";
import FormLabel from "@material-ui/core/FormLabel";
import Slider from "@material-ui/core/Slider";
import Stack from '@material-ui/core/Stack';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
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
                <VolumeDown />
                <Slider
                    value={sliderValue}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                    step={1}
                />
                <VolumeUp />
            </Stack>
        )}
      />
    </>
  );
};