import { useEffect, useState } from "react";

export function useStructureIndexData(id: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [proteinInfo, setProteinInfo] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8000/recordid/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setProteinInfo(data.protein_structure);
      })
      .catch((error) => {
        console.error(error);
        setProteinInfo(null);
        setIsLoading(false);
      });
  }, [id]);

  return { isLoading, proteinInfo };
}
