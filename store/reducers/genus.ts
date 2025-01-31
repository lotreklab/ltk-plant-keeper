import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axiosClient from '@/api/axiosClient';
import Specie from '@/types/specie';
import Plant from '@/types/plant';
// Define a type for the slice state
import Genus from '@/types/genus';

export interface PlantGenusState {
  genusList: Genus[];
  loading: boolean;
  error: string | null;
}



// Define the initial state using that type
const initialState: PlantGenusState = {
  genusList: [],
  loading: false,
  error: null,
};


export const FetchGenus = createAsyncThunk(
  'genus',
  async () => {
    const response = await axiosClient.get<Genus[]>('genus');
    return response.data;
  }
);


export const genusSlice = createSlice({
  name: 'genus',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(FetchGenus.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchGenus.fulfilled, (state, action: PayloadAction<Genus[]>) => {
        state.genusList = action.payload;
        state.loading = false;
      })
      .addCase(FetchGenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch species';
      });
  },
});

export default genusSlice.reducer;
