import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axiosClient from '@/api/axiosClient';
import Plant from '@/types/plant';
// Define a type for the slice state

export interface PlantState {
  plant: Plant | null;
  plant_list: Plant[];
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: PlantState = {
  plant: null,
  plant_list: [],
  loading: false,
  error: null,
};



export const FetchPlantsByGenusID = createAsyncThunk(
  'plants',
  async (speciesId) => {
    const response = await axiosClient.get<Plant[]>('plants', {params: {genus_id: speciesId}});
    return response.data;
  }
);

export const FetchPlant = createAsyncThunk(
  'plant',
  async (plantId) => {
    const response = await axiosClient.get<Plant>(`plants/${plantId}/`);
    return response.data;
  }
);

export const plantsSlice = createSlice({
  name: 'plants',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(FetchPlantsByGenusID.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchPlantsByGenusID.fulfilled, (state, action: PayloadAction<Plant[]>) => {
        state.plant_list = action.payload;
        state.loading = false;
      })
      .addCase(FetchPlantsByGenusID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch plants';
      })
      .addCase(FetchPlant.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchPlant.fulfilled, (state, action: PayloadAction<Plant>) => {
        state.plant = action.payload;
        state.loading = false;
      })
      .addCase(FetchPlant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch plant';
      })
  },
});

export default plantsSlice.reducer;
