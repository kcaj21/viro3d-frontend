import { useEffect, useState } from "react";

export function useGenomeCoordinates(id: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    fetch(
      `http://localhost:8000/sequencematch/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCoordinates(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setCoordinates(null);
        setIsLoading(false);
      });
  }, [id]);

  return { coordinates, isLoading };
}