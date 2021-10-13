import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Loader from "react-loader-spinner";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {FormInputText} from '../layout/FormControlMaterialUI/FormInputText';
import {FormInputTextArea} from '../layout/FormControlMaterialUI/FormInputTextArea';
// import {FormInputDateTime} from '../layout/FormControlMaterialUI/FormDate';
import {FormCheckbox} from '../layout/FormControlMaterialUI/FormCheckbox';
import {FormInputSelect} from '../layout/FormControlMaterialUI/FormInputSelect';
// import {FormSelect} from '../layout/FormControlMaterialUI/FormSelect';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

const SelectOptions = [
  {
    label: 'Draft',
    value: 'draft',
  },
  {
    label: 'Published',
    value: 'published',
  },
]

export default function BlogForm({defaultValues,onFormSubmit,isLoading}) {
                                                
  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, formState: { errors },reset } = methods;
  
  const onSubmit = handleSubmit((data) => {
    onFormSubmit(data);
  });

  // const onSubmit = data => console.log(data);
  // console.log("errors",errors);
  
  return (
    <Paper elevation ={24} sx={{display: "grid",gridRowGap: 10 ,  
           padding: "5px", mb:'10px', 
           justifyContent:'center', alignItems:'center', textAlign:'center'}}>
      <Typography variant="h6" > Post</Typography>
      <FormProvider {...methods} > 
        <FormInputText name="title" label="Title" rules={{ required: "This field is required" }}/>
        {/* <FormInputDateTime name="birthday" label="Birthday"/>  */}
        <FormInputTextArea name="excerpt" label="excerpt" rules={{ required: "This field is required" }}/>
        <FormInputTextArea name="content" label="content" rules={{ required: "This field is required" }}/>
        <Grid container spacing={1} justifyContent='space-between'>
          <Grid item xs={12} sm={6} md={3}>
              <FormCheckbox name={"active"} label={"active"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormInputSelect name={"status"} label={'status'} options={SelectOptions} />
          </Grid>
        </Grid>
      </FormProvider >
      <Divider />
       <Grid container spacing={1} justifyContent='space-between'>
         <Grid item xs={12} sm={4} md={3} >
          <Button onClick={() => reset()} variant={"outlined"}  size="small" 
            startIcon={<UndoOutlinedIcon/>}>
            {" "}
            Reset{" "}
          </Button>
        </Grid>
         <Grid item xs={12} sm={4} md={3}>
          <LoadingButton
            onClick={onSubmit}
            loading={isLoading}
            loadingPosition="center"
            startIcon={<SaveOutlinedIcon />}
            variant="contained"
            size="small"
            loadingIndicator={<Loader type="ThreeDots" color="#4682b4" height={5} />}
          >
            {!isLoading?'Save':null}
          </LoadingButton>
        </Grid>
        <Grid item xs={12} sm={4} md={3} >
          <Button href="/" variant={"contained"} color="error" size="small"
            startIcon={<CancelOutlinedIcon/>}>
            {" "}
            Cancel{" "}
          </Button>
        </Grid>
        </Grid>
      </Paper>
  );
}


