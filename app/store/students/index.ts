// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** url
import apiUrl from '../../configs/url'

interface DataParams {
  q: string
  page: number
  pageSize: number
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Users
export const fetchData = createAsyncThunk(
  'students/fetchData', 
  async (params: DataParams ) => {
    const { q = '', page, pageSize} = params ?? ''
    const queryLowered = q.toLowerCase()

    const response = await axios.get(`${apiUrl.url}/school_app/students/?page=${page}&page_size=${pageSize}&search=${queryLowered}`)
    
    const data = response.data.results

  return [
    {
      students: data,
      total: response.data.count
    }
  ]
  // console.log('data')
})

// ** Add student
export const postStudent = createAsyncThunk(
  'appStudents/postStudent',
  async (data: { [key: string]: number | string | any }, { getState, dispatch }: Redux) => {
    const { regno, fullname, classs, parents_name, parents_contact, fees} = data ?? ''
    const response = await axios.post(`${apiUrl.url}/school_app/students/`, {
      regno,
      fullname, 
      classs, 
      parents_name, 
      parents_contact, 
      fees,
      })
      
      dispatch(fetchData(getState().student.params))

    return response.data
  }
)

// ** Deactivate Student
export const deactivateReactivateStudent = createAsyncThunk(
  'appStudent/deactivateReactivateStudent',
    async (data: { [key: string]: number | string | any }, { dispatch }: Redux) => {
    const id = data.id
    const response = await axios.patch(`${apiUrl.url}/school_app/update-student/${id}/`, {
      is_active: data.is_active,
    });

    dispatch(
      getSingleStudent({
        id
      })
    )

    return response.data
  }
)

// ** Update User
export const updateStudent = createAsyncThunk(
  'appStudent/updateStudent',
    async (data: { [key: string]: number | string | any }) => {
    const id = data.id
    const response = await axios.patch(`${apiUrl.url}/school_app/update-student/${id}/`, {
      regno: data.regno,
      fullname: data.fullname,
      classs: data.classs,
      parents_name: data.parents_name,
      parents_contact: data.parents_contact,
      fees: data.fees,
    });
    
    return response.data
  }
)
// ** Get Single Student
export const getSingleStudent = createAsyncThunk(
  'appStudents/getSingleStudent',
  async (params: { [key: string]: number | string | any }) => {
    const { id } = params ?? ''
    const response = await axios.get(`${apiUrl.url}/school_app/single-student/${id}/`);
    
    return [
      // 200,
      {
        student: response.data,
      }
    ]
  }
)

// ** Get Single Student by regno
export const getSingleStudentByRegNo = createAsyncThunk(
  'appStudents/getSingleStudentByRegNo',
  async (params: { [key: string]: number | string | any }) => {
    const regno = parseInt(params.regno)
    const response = await axios.get(`${apiUrl.url}/school_app/single-student-by-regno/${regno}/`);
    
    return [
      // 200,
      {
        student: response.data,
      }
    ]
  }
)

export const appStudentSlice = createSlice({
  name: 'appStudent',
  initialState: {
    data: [],
    total: 1,
    status: '',
    singleStudent: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload[0].students
      state.total = action.payload[0].total
    })
    .addCase(deactivateReactivateStudent.fulfilled, (state) => {
      state.status = 'succeeded'
    })
    .addCase(deactivateReactivateStudent.rejected, (state) => {
      state.status = 'failed'
    })
    .addCase(getSingleStudent.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.singleStudent = action.payload[0].student
    })
    .addCase(getSingleStudent.rejected, (state) => {
      state.status = 'failed'
      state.singleStudent = null
    })
    .addCase(getSingleStudentByRegNo.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.singleStudent = action.payload[0].student
    })
    .addCase(getSingleStudentByRegNo.rejected, (state) => {
      state.status = 'failed'
      state.singleStudent = null
    })
    .addCase(updateStudent.fulfilled, (state) => {
      state.status = 'succeeded'
    })
    .addCase(updateStudent.rejected, (state) => {
      state.status = 'failed'
    })
 
  }
})


export default appStudentSlice.reducer