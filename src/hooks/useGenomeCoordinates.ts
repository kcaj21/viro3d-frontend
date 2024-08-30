import { useEffect, useState } from "react";

export function useGenomeCoordinates(id) {
  const [isLoading, setIsLoading] = useState(true);
  const [coordinates, setCoordinates] = useState(null);

    useEffect(() => {
    setIsLoading(true);
    fetch(
        `http://localhost:8000/genome_coordinates/${id}`    
    )
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setCoordinates(data);
      })
      .catch((error) => {
        console.error(error);
        setCoordinates(null);
        setIsLoading(false);
      });
  }, [id]);

  return { coordinates, isLoading };
}