import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axiosClient from '@/api/axiosClient';
import Specie from '@/types/specie';
import Plant from '@/types/plant';
// Define a type for the slice state

export interface PlantSpecies {
  variety: Specie[];
  loading: boolean;
  error: string | null;
}



// Define the initial state using that type
const initialState: PlantSpecies = {
  variety: [],
  loading: false,
  error: null,
};


export const FetchSpecies = createAsyncThunk(
  'species',
  async () => {
    const response = await axiosClient.get<Specie[]>('species');
    return response.data;
  }
);


export const speciesSlice = createSlice({
  name: 'species',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(FetchSpecies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchSpecies.fulfilled, (state, action: PayloadAction<Specie[]>) => {
        state.variety = action.payload;
        state.loading = false;
      })
      .addCase(FetchSpecies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch species';
      });
  },
});

export default speciesSlice.reducer;
