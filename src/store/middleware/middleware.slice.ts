import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMiddlewareDependencies } from '../../middleware';

interface MiddlewareState {
  dependencies: IMiddlewareDependencies | null;
}

const initialState: MiddlewareState = {
  dependencies: null,
};

const middlewareSlice = createSlice({
  name: 'middleware',
  initialState,
  reducers: {
    setMiddlewareDependencies: (state: any, action: PayloadAction<IMiddlewareDependencies | null>) => {
      state = { ...state, dependencies: action.payload }
    },
  },
});

export const { setMiddlewareDependencies } = middlewareSlice.actions;

export default middlewareSlice.reducer;
