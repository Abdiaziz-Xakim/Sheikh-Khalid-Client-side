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

// ** Deactivate Student
export const deactivateStudent = createAsyncThunk(
  'appStudent/deactivateStudent',
    async (data: { [key: string]: number | string | any }, { dispatch }: Redux) => {
    const id = data.id
    const response = await axios.patch(`${apiUrl.url}/school_app/update-student/${id}/`, {
      is_active: false,
    });

    dispatch(
      fetchData({
        q: '',
        page: 1,
        pageSize: 10
      })
    )

    return response.data
  }
)

export const studentsSlice = createSlice({
  name: 'appStudent',
  initialState: {
    data: [],
    total: 1,
    status: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload[0].students
      state.total = action.payload[0].total
    })
    .addCase(deactivateStudent.fulfilled, (state) => {
      state.status = 'succeeded'
    })
    .addCase(deactivateStudent.rejected, (state) => {
      state.status = 'failed'
    })
 
  }
})


export default studentsSlice.reducer