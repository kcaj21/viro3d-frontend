import { useEffect, useState } from "react";
import { api_url } from "../utils/api";

export function useGenomeCoordinates(id: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [coordinates, setCoordinates] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(`${api_url}/api/sequencematch/${id}`)
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
