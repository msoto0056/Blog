import React from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from "react-hook-form";

export const FormInputDate = ({ name, label, rules="" }) => {
  const {control, defaultValue} = useFormContext();

  return (
     <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({
        field: { onChange, value, ref },
        fieldState: { error },
        formState,
        }) => (
          <DatePicker
            value={value}
            onChange={onChange}
            label={label}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      />
    </LocalizationProvider>
  );
};


export const FormInputYear = ({ name, label,  rules="" }) => {
  const {control, defaultValue} = useFormContext();

  return (
     <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({
        field: { onChange, value, ref },
        fieldState: { error },
        formState,
        }) => (
          <DatePicker
            views={['year']}
            value={value}
            onChange={onChange}
            label={label}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export const FormInputMonth = ({ name, label, rules="" }) => {
  const {control, defaultValue} = useFormContext();

  return (
     <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({
        field: { onChange, value, ref },
        fieldState: { error },
        formState,
        }) => (
          <DatePicker
            views={['month']}
            value={value}
            onChange={onChange}
            label={label}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export const FormInputYearMonth = ({ name, label, rules="" }) => {
  const {control,defaultValue} = useFormContext();
  
  return (
     <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({
        field: { onChange, value, ref },
        fieldState: { error },
        formState,
        }) => (
          <DatePicker
            views={['year', 'month']}
            value={value}
            onChange={onChange}
            label={label}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export const FormInputDateTime = ({ name, label, rules="" }) => {
  const {control, defaultValue} = useFormContext();

  return (
     <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue = {defaultValue}
        render={({
        field: { onChange, value, ref },
        fieldState: { error },
        formState,
        }) => (
            <DateTimePicker
                label={label}
                value={value}
                onChange={onChange}
                inputFormat="yyyy/MM/dd hh:mm a"
                mask="___/__/__ __:__ _M"
                renderInput={(props) => <TextField {...props} />}
            />
         )}
      />
    </LocalizationProvider>
  );
};

export const FormInputTime = ({ name, label, rules="" }) => {
  const {control, defaultValue} = useFormContext();

  return (
     <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue = {defaultValue}
        render={({
        field: { onChange, value, ref },
        fieldState: { error },
        formState,
        }) => (
            <TimePicker
                renderInput={(props) => <TextField {...props} />}
                label={label}
                value={value}
                onChange={onChange}
            />
         )}
      />
    </LocalizationProvider>
  );
};