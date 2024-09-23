import { useEffect, useState } from "react";

export function useStructureIndexData(id: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [proteinInfo, setProteinInfo] = useState(null);
  const [defaultModel, setDefaultModel] = useState(null);
  const [isESMFoldModelPresent, setIsESMFoldModelPresent] = useState(false);


  const handleCollabFoldClick = () => {
    setDefaultModel('CF')
  }

  const handleESMFoldClick = () => {
    setDefaultModel('EF')
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8000/recordid/${id}`)
      .then((res) => res.json())
      .then( async (data) => {
        setProteinInfo(data.protein_structure);
        if(
          await data.protein_structure.esmfold_log_pLDDT >
          data.protein_structure.colabfold_json_pLDDT
        ) {
          setDefaultModel('EF');
          setIsESMFoldModelPresent(true)
        } else {
          setDefaultModel('CF');
          setIsESMFoldModelPresent(false)
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setProteinInfo(null);
        setIsLoading(false);
      });
  }, [id]);

  return { isLoading, proteinInfo, defaultModel, isESMFoldModelPresent, handleCollabFoldClick, handleESMFoldClick };
}
