"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/stores/userStore";

export function UserProvider({ user, children }) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return children;
}
