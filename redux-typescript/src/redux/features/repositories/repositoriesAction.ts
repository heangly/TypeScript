import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export enum Repositories {
  Name = 'repositories',
  Search = 'repositories/search',
  Base_URL = 'https://registry.npmjs.org/-/v1/search?text='
}

export const searchRepositories = createAsyncThunk(
  Repositories.Search,
  async (name: string, thunkAPI) => {
    try {
      const { data } = await axios.get(Repositories.Base_URL + name)
      return data.objects.map((result: any) => result.package.name)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ?? error.message ?? error.toString()
        return thunkAPI.rejectWithValue(message)
      }
      return thunkAPI.rejectWithValue(error)
    }
  }
)
