import { configureStore } from '@reduxjs/toolkit';
import characterSlice from './characterSlice';
import jewelrySlice from './jewelrySlice';
import equipmentSlice from './equipmentSlice';
import uiSlice from './uiSlice';

export const store = configureStore({
  reducer: {
    character: characterSlice,
    jewelry: jewelrySlice,
    equipment: equipmentSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;