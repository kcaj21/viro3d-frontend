import { useEffect, useState } from "react";

export function useResultsPageData(filterparam, id, currentPage) {
  const [isLoading, setIsLoading] = useState(true);
  const [proteinInfo, setProteinInfo] = useState(null);
  const [resultCount, setResultCount] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `http://localhost:8000/${filterparam}/${id}?page_size=10&page_num=${currentPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setResultCount(data.count);
        setProteinInfo(data.protein_structures);
      })
      .catch((error) => {
        console.error(error);
        setProteinInfo(null);
        setIsLoading(false);
      });
  }, [filterparam, id, currentPage]);

  return { isLoading, proteinInfo, resultCount };
}
