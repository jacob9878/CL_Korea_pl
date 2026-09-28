"use client";

import { useCallback, useEffect, useState } from "react";

const FAV_KEY = "cl_iris_fav";

function readFavs(): string[] {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favs, setFavs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFavs(readFavs());
    setReady(true);
  }, []);

  const isFav = useCallback((id: string) => favs.includes(id), [favs]);

  const toggleFav = useCallback((id: string) => {
    setFavs((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem(FAV_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  return { favs, isFav, toggleFav, ready };
}
