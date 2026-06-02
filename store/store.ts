import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { baseApi } from "./api/baseApi";
import "./api/turmasApi";
import { authReducer } from "./slices/authSlice";

export const makeStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: {
      auth: authReducer,
      [authApi.reducerPath]: authApi.reducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, baseApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
