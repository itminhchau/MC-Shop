import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userApi from 'api/userApi';
import StorageKeys from 'constants/storage-keys';

export const register = createAsyncThunk(
    'users/register',
    async (payload, thunkAPI) => {
        // call api
        const { data } = await userApi.register(payload)
        // save data storage
        localStorage.setItem(StorageKeys.TOKEN, data.jwt)
        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user))
        // return data
        return data.user;
    }
)

export const login = createAsyncThunk(
    'users/login',
    async (payload, thunkAPI) => {
        // call api
        const { data } = await userApi.login(payload)
        // save data storage
        localStorage.setItem(StorageKeys.TOKEN, data.jwt)
        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user))
        // return data
        return data.user;
    }
)


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        setting: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
        current: {}
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem(StorageKeys.TOKEN)
            localStorage.removeItem(StorageKeys.USER)
            state.current = {}
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(register.fulfilled, (state, action) => {
            // Add user to the state array
            state.current = action.payload
        })

        builder.addCase(login.fulfilled, (state, action) => {
            // Add user to the state array
            state.current = action.payload
        })

    },
})

// Action creators are generated for each case reducer function
export const { actions, reducer } = userSlice
export const { logout } = actions
export default reducer