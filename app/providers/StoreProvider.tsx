"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { getAuthPreloadedState, hydrateAuth } from "@/store/slices/authSlice";
import { makeStore, type AppStore } from "@/store/store";

export default function StoreProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore(getAuthPreloadedState());
  }

  useEffect(() => {
    storeRef.current?.dispatch(hydrateAuth());
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
