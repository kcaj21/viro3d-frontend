import { useEffect, useState } from "react";

export function useResultsPageData(filterparam, id, currentPage) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [resultCount, setResultCount] = useState(null);

    useEffect(() => {
      console.log('fetching')
    setIsLoading(true);
    fetch(
      `http://localhost:8000/${filterparam}/${id}?page_size=10&page_num=${currentPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setResultCount(data.count);
        setData(data);
      })
      .catch((error) => {
        console.error(error);
        setData(null);
        setIsLoading(false);
      });
  }, [filterparam, id, currentPage]);

  return { isLoading, data, resultCount };
}