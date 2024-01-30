'use client';

// ** React Imports
import React, { MouseEvent, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { CardHeader, CardHeaderProps, Grid, Collapse } from '@mui/material'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


// ** Axios
import axios from 'axios'

import { signIn } from "next-auth/react";

// ** Config
import authConfig from '../../../configs/auth'


// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from '../../../icon'

import { useRouter, usePathname } from 'next/navigation'

// ** Store & Actions Imports
import { postStudent } from '../../../store/students'
import { AppDispatch } from '../../../store'
import { useDispatch } from 'react-redux';



interface State {
  showPassword: boolean
  showConfirmPassword: boolean
}

interface StudentData {
  regno: string
  fullname: string
  classs: string
  parents_name: string
  parents_contact: string
  fees: string
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  parents_contact: yup
    .string()
    .typeError('Mobile Number field is required')
    .min(10, obj => showErrors('Mobile Number', obj.value.length, obj.min))
    .required(),
    fullname: yup
    .string()
    .min(3, obj => showErrors('Full Name', obj.value.length, obj.min))
    .required(),
    parents_name: yup
    .string()
    .min(3, obj => showErrors("Parent's Name", obj.value.length, obj.min))
    .required(),
    classs: yup
    .string()
    .min(3, obj => showErrors('classs', obj.value.length, obj.min))
    .required(),
    fees: yup
    .string()
    .min(3, obj => showErrors('Fees', obj.value.length, obj.min))
    .required(),
})

const defaultValues = {
  regno: '',
  fullname: '',
  classs: '',
  parents_name: '',
  parents_contact: '',
  fees: '',
  // isStudent: false,
}

const StyledCardHeader= styled(CardHeader)<CardHeaderProps>(({ theme }) => ({
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.default
}))



const AddStudent = () => {
  // ** State
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')

  // ** Hooks
  //   const auth = useAuth()
  const router = useRouter()

  // const student = student ?.id

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    // resolver: yupResolver(schema)
  })
  const dispatch = useDispatch<AppDispatch>()

  
  const onSubmit = (data: StudentData) => {
    const valuesToLowerCase = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value.toString().toLowerCase()])
    );
    dispatch(postStudent({ ...valuesToLowerCase}))
    reset()
    setOpen(true)
  }

        // console.log(res.data.user)

        // const resp = await signIn("creposdentials", { 
        //   email: email, 
        //   password: password, 
        //   redirect: false,
        //   // callbackUrl: '/pages/about' 
        // });

        // if(!resp?.error){
        //   console.log(res?.status)
        //   router.push('/pages/dashboard')
        //   router.refresh()
        // }

        // if (res?.response.data.email) {
        //       setIsError(true)
        //       setMessage("Email already exists!")
        //   }

        // return res.data.user;
      // })
      // .catch((error) => {
      //   console.log(error.response);
      //   throw new Error(error.response.data.message);
      // })

    // console.log(data)

    setOpen(true)
// }


  return (
    <div>
      <Card sx={{ml:9, m:5}}>
          <StyledCardHeader title='Add Student' sx={{ pb: 4, mt:'27px', '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
          <Collapse in={open} sx={{ maxWidth: '600px', margin: 'auto', mb:6 }}>
              <Alert 
                action={
                  <IconButton
                  aria-label="close"
                  color={isError ? "error" : "success"}
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <Icon icon='mdi:close' />
                  </IconButton>
                }
                severity={isError ? "error" : "success"}
              >
                { message }
              </Alert>
          </Collapse>
          <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name="regno"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                    type= 'string'
                      value={value}
                      label='Reg No'
                      onChange={onChange}
                      placeholder='001'
                      error={Boolean(errors.regno)}
                    />
                  )}
                />
                {errors.regno && <FormHelperText sx={{ color: 'error.main' }}>{errors.regno.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='fullname'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Full Name'
                      onChange={onChange}
                      placeholder='Hassan Abdi'
                      error={Boolean(errors.fullname)}
                    />
                  )}
                />
                {errors.fullname && <FormHelperText sx={{ color: 'error.main' }}>{errors.fullname.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='classs'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Class'
                      onChange={onChange}
                      placeholder='Form One'
                      error={Boolean(errors.classs)}
                    />
                  )}
                />
                {errors.classs && <FormHelperText sx={{ color: 'error.main' }}>{errors.classs.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='parents_name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type='name'
                      value={value}
                      label="Parent's Name"
                      onChange={onChange}
                      placeholder='Fatuma Aden'
                      error={Boolean(errors.parents_name)}
                    />
                  )}
                />
                {errors.parents_name && <FormHelperText sx={{ color: 'error.main' }}>{errors.parents_name.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='parents_contact'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type='number'
                      value={value}
                      label="Parent's Contact"
                      onChange={onChange}
                      placeholder='0712 345 678'
                      error={Boolean(errors.parents_contact)}
                    />
                  )}
                />
                {errors.parents_contact && <FormHelperText sx={{ color: 'error.main' }}>{errors.parents_contact.message}</FormHelperText>}
              </FormControl>
            </Grid>
            {/* <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        <FormControlLabel
          value="disabled"
          disabled
          control={<Radio />}
          label="other"
        />
      </RadioGroup>
    </FormControl> */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='fees'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type='number'
                      value={value}
                      label="fees"
                      onChange={onChange}
                      placeholder='Enter Agreed Fees'
                      error={Boolean(errors.fees)}
                    />
                  )}
                />
                {errors.parents_contact && <FormHelperText sx={{ color: 'error.main' }}>{errors.parents_contact.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' type='submit' sx={{ mr: 3 }}>
                Submit
              </Button>
              <Button type='reset' variant='outlined' color='secondary' onClick={() => reset()}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddStudent