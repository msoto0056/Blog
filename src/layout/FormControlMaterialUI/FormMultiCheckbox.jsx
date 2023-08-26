import React, { useEffect, useState } from "react";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Controller, useFormContext  } from "react-hook-form";



export const FormCheckbox = ({ name, label, options, rules="" }) => {
  const {control,setValue} = useFormContext();
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (value) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems) => [...prevItems, value]);
    }
  };

  useEffect(() => {
    setValue(name, selectedItems);
  }, [selectedItems,name,setValue]);

  return (
    <FormControl size={"small"} variant={"outlined"}>
      <FormLabel  size={"small"} component="legend">{label}</FormLabel>

      <>
        {options.map((option) => {
          return (
            <FormControlLabel
              size={"small"}
              control={
                <Controller
                  rules={rules}
                  name={name}
                  render={() => {
                    return (
                      <Checkbox
                        size={"small"}
                        checked={selectedItems.includes(option.value)}
                        onChange={() => handleSelect(option.value)}
                      />
                    );
                  }}
                  control={control}
                />
              }
              label={option.label}
              key={option.value}
            />
          );
        })}
      </>
    </FormControl>
  );
};