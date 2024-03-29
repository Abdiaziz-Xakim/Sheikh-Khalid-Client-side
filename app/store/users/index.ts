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
  role: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Users
export const fetchData = createAsyncThunk(
  'appUsers/fetchData', 
  async (params: DataParams ) => {
    const { q = '', page, role = '', pageSize} = params ?? ''
    const queryLowered = q.toLowerCase()

    const response = await axios.get(`${apiUrl.url}/users_app/users/?page=${page}&page_size=${pageSize}&role=${role}&search=${queryLowered}`)
    
    const data = response.data.results

  return [
    {
      users: data,
      total: response.data.count
    }
  ]
})

// ** Deactivate User
export const deactivateReactivateUser = createAsyncThunk(
  'appUsers/deactivateReactivateUser',
    async (data: { [key: string]: number | string | any }, { dispatch }: Redux) => {
    const id = data.id
    const response = await axios.patch(`${apiUrl.url}/users_app/update-user/${id}/`, {
      is_active: data.is_active,
    });

    dispatch(
      getSingleUser({
        id
      })
    )

    return response.data
  }
)

// ** Update User
export const updateUser = createAsyncThunk(
  'appUsers/updateUser',
    async (data: { [key: string]: number | string | any }) => {
    const id = data.id
    const response = await axios.patch(`${apiUrl.url}/users_app/update-user/${id}/`, {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      mobile: data.mobile,
      location: data.location,
      role: data.role,
    });
    
    return response.data
  }
)


// ** Get Single User
export const getSingleUser = createAsyncThunk(
  'appUsers/getSingleUser',
  async (params: { [key: string]: number | string | any }) => {
    const { id } = params ?? ''
    const response = await axios.get(`${apiUrl.url}/users_app/single-user/${id}/`);
    
    return [
      // 200,
      {
        user: response.data,
      }
    ]
  }
)


export const appUsersSlice = createSlice({
  name: 'appUsers',
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
      state.data = action.payload[0].users
      state.total = action.payload[0].total
    })
    .addCase(deactivateReactivateUser.fulfilled, (state) => {
      state.status = 'succeeded'
    })
    .addCase(deactivateReactivateUser.rejected, (state) => {
      state.status = 'failed'
    })
    .addCase(getSingleUser.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.singleUser = action.payload[0].user
    })
    .addCase(getSingleUser.rejected, (state) => {
      state.status = 'failed'
      state.singleUser = null
    })
    .addCase(updateUser.fulfilled, (state) => {
      state.status = 'succeeded'
    })
    .addCase(updateUser.rejected, (state) => {
      state.status = 'failed'
    })
 
  }
})

export default appUsersSlice.reducer