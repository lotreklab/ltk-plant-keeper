import Plant from '@/types/plant'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface StarredState {
  value: Array<Plant>
}

const initialState: StarredState = {
  value: []
}

export const starredSlice = createSlice({
  name: 'starred',
  initialState,
  reducers: {
    toggleStarred: (state, action: PayloadAction<Plant>) => {
      const index = state.value.findIndex(plant => plant.id === action.payload.id)
      if (index === -1) {
        state.value = [ ...state.value, action.payload ]
      } else {
        state.value = state.value.filter(plant => plant.id !== action.payload.id)
      }
    }
  }
})

export const selectStarredPlants = (state: RootState) => state.starred.value

export const { toggleStarred } = starredSlice.actions

export default starredSlice.reducer
