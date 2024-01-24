// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports 
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'


// ** Store and Actions Imports
import { useDispatch } from 'react-redux'
import { getSingleUser, updateUser } from '../../../store/users'

// ** Types Imports
import { AppDispatch, RootState } from '../../../store'
import { useSelector } from 'react-redux'

// ** Context
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

// ** Icon Imports
import Icon from '../../../icon'
import { getSingleStudent, updateStudent } from '@/app/store/students'

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
  parents_contact: yup
  .string()
  .typeError('Mobile Number field is required')
  .min(10, obj => showErrors('Mobile Number', obj.value.length, obj.min))
  .required(),
  regno: yup
  .string()
  .min(3, obj => showErrors('regno', obj.value.length, obj.min))
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
}

const EditStudentForm = ({ id }: any) => {

  // ** State
  const [open, setOpen] = useState(false);

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getSingleStudent({id}))
  }, [dispatch, id]);


  const store = useSelector((state: RootState) => state.students)

  const student: any = store.singleStudent

  const {
    setValue,
    control,
    reset,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const defaultData = () => {
    dispatch(getSingleUser({id}))
    reset({}, { keepValues: true })
  }

  // Update the defaultValues with the user data
  useEffect(() => {
    setValue('regno', student?.regno);
    setValue('fullname', student?.fullname);
    setValue('classs', student?.classs);
    setValue('parents_name', student?.parents_name);    
    setValue('parents_contact', student?.parents_contact);
    setValue('fees', student?.fees);
  }, [setValue, student]);

  // Listen if the defaultValues changed
  useEffect(() => {
    // console.log(isDirty)
    // console.log(dirtyFields)

  }, [isDirty, dirtyFields]);

  const onSubmit = (data: StudentData) => {
    dispatch(updateStudent({ ...data, id }))
    setOpen(true)

    reset({}, { keepValues: true })
  }

  return (
    <Card>
    <CardHeader title='Edit User' />
    <CardContent>
    <Collapse in={open} sx={{ maxWidth: '600px', margin: 'auto' }}>
      {store.status === "succeeded" ?    
        <Alert 
          action={
            <IconButton
            aria-label="close"
            color="success"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
          <Icon icon='mdi:close' />
          </IconButton>
        }
        severity="success"
        >
          Updated successfully!
        </Alert>
        :''
      }
      {store.status === "failed" ?    
      <Alert 
      action={
        <IconButton
          aria-label="close"
          color="error"
          size="small"
          onClick={() => {
            setOpen(false);
          }}
        >
        <Icon icon='mdi:close' />
        </IconButton>
      }
      severity="error"
      >
        Could not update. An error occured!
      </Alert>
      :''
      }
     
      </Collapse>
    </CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
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
            <Grid item xs={12}>
              {isDirty ? 
              <>
                <Button type='submit' variant='contained' sx={{ mr: 3 }}>
                  Save Changes
                </Button>
                <Button type='reset' variant='outlined' color='secondary'  onClick={() => defaultData()} >
                  Reset
                </Button>
              </>
              :
              <>
                <Button type='submit' disabled variant='contained' sx={{ mr: 3 }}>
                    Save Changes
                </Button>
                <Button type='reset' disabled variant='outlined' color='secondary'  onClick={() => defaultData()} >
                  Reset
                </Button>
              </>
              }
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  )
}

export default EditStudentForm