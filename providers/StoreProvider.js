"use client";

import { useEffect } from "react";

import { usePreferencesStore } from "@/store/stores/preferencesStore";

export function StoreProvider({ preferences, children }) {
  const setPreferences = usePreferencesStore(
    (state) => state.setPreferences,
  );

  useEffect(() => {
    setPreferences(preferences);
  }, [preferences, setPreferences]);

  return children;
}
