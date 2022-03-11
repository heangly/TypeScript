import { createSlice } from '@reduxjs/toolkit'
import { ReactText } from 'react'
import { Repositories, searchRepositories } from './repositoriesAction'
import { toast } from 'react-toastify'

interface InitialState {
  data: string[]
  error: string | null
}

const initialState: InitialState = {
  data: [],
  error: null
}

let toastId: ReactText

const repositoriesSlice = createSlice({
  name: Repositories.Name,
  initialState,
  reducers: {
    resetRepositories: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // Search Repositories
      .addCase(searchRepositories.pending, () => {
        toast.dismiss(toastId)
        toastId = toast.loading('Searching Repositoires...')
      })
      .addCase(searchRepositories.fulfilled, (state, action) => {
        state.data = action.payload
        state.error = null
        toast.dismiss(toastId)
        toastId = toast.success(`Found ${state.data.length} packages`)
      })
      .addCase(searchRepositories.rejected, (state, action) => {
        state.data = []
        state.error = action.payload as string
        toast.dismiss(toastId)
        toastId = toast.error(state.error)
      })
  }
})

export const { resetRepositories } = repositoriesSlice.actions
export default repositoriesSlice.reducer
