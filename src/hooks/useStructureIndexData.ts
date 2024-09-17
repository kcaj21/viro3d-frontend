import { useEffect, useState } from "react";

export function useStructureIndexData(id: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [proteinInfo, setProteinInfo] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8000/recordid/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProteinInfo(data.protein_structure);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setProteinInfo(null);
        setIsLoading(false);
      });
  }, [id]);

  return { isLoading, proteinInfo };
}
