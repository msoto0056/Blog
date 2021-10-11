import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Controller, useFormContext  } from "react-hook-form";



export const FormRadio = ({name,label,options,rules=""}) => {
  const {control,defaultValue} = useFormContext();
  const generateRadioOptions = () => {
    return options.map((singleOption, index) => (
        
      < FormControlLabel
        size="small"
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio size={"small"}/>}
        key={index}
      />
    ));
  };

  return (
    <FormControl component="fieldset" size={"small"}>
      <FormLabel component="legend" size={"small"}>{label}</FormLabel>
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
          <RadioGroup value={value} onChange={onChange} size={"small"}>
            {generateRadioOptions()}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};