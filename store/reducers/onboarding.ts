import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export interface OnBoardingState {
  value: boolean
}

// Define the initial state using that type
const initialState: OnBoardingState = {
  value: false
}

export const boardedSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    toggleOnBoarding: state => {
      state.value = !state.value
    }
  }
})

// Action creators are generated for each case reducer function
export const { toggleOnBoarding } = boardedSlice.actions

export default boardedSlice.reducer