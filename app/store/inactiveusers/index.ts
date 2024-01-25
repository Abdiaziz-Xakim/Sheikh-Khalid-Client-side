// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** url
import apiUrl from '../../configs/url'
// import { deactivateReactivateUser } from '../users'

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
  'appInactiveSlice/fetchData', 
  async (params: DataParams ) => {
    const { q = '', page, pageSize} = params ?? ''
    const queryLowered = q.toLowerCase()

    const response = await axios.get(`${apiUrl.url}/users_app/inactive/?page=${page}&page_size=${pageSize}&search=${queryLowered}`)
    
    const data = response.data.results
    // console.log(data)
  return [
    {
      inactive: data,
      total: response.data.count
    }
  ]
})

export const appInactiveSlice = createSlice({
  name: 'appInactive',
  initialState: {
    data: [],
    total: 1,
    status: '',
    singleUser: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload[0].inactive
      state.total = action.payload[0].total
    })
 
  }
})

export default appInactiveSlice.reducer