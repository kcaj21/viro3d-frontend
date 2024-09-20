import { useEffect, useState } from "react";

export function useGenomeCoordinates(filterparam: string, id: string,) {
  const [isLoading, setIsLoading] = useState(true);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(
        `http://localhost:8000/genome_coordinates/${filterparam}/${id}`    
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
  }, [filterparam, id]);

  return { coordinates, isLoading };
}