import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Vegetable } from './vegetablesSlice';
import getVegetables from '../getVegetables';

export const fetchVegetables = createAsyncThunk<
  Vegetable[],
  void,
  { rejectValue: string }
>('vegetables/fetchVegetables', async (_, { rejectWithValue }) => {
  try {
    const data = await getVegetables(); // вроде как можно удалить getVegetables и всю api вставить
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message || 'Ошибка сети');
  }
});
