import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
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
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true
    },
    hasBoarded: (state, action: PayloadAction<boolean | undefined>) => {
      state.value = action.payload ?? false;
    }
  }
})

// Action creators are generated for each case reducer function
export const { toggleOnBoarding, hasBoarded } = boardedSlice.actions

export default boardedSlice.reducer