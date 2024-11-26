import { useEffect, useState } from "react";
import { api_url } from "../utils/api";

export function useGenomeCoordinates(id: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    fetch(`http://${api_url}/api/sequencematch/${id}`)
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
