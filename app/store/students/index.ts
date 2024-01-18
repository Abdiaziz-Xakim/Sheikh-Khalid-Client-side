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


export const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    data: [],
    total: 1,
  },
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload[0].students
      state.total = action.payload[0].total
    })
 
  }
})

export default studentsSlice.reducer