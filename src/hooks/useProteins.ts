import { useEffect, useState } from "react";

export function useProteins(filterparam: string, id: string, currentpage: number) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [resultCount, setResultCount] = useState(null);

  useEffect(() => {
    setIsLoading(true);
      fetch(
        `http://viro3d-dev.cvr.gla.ac.uk/api/proteins/${filterparam}/?qualifier=${id}&page_size=10&page_num=${currentpage}`
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
  }, [filterparam, id, currentpage]);

  return { isLoading, data, resultCount };
}