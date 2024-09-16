import { useEffect, useState } from "react";
import { debounce } from "lodash";


export function useAutocomplete(id: string, currentpage: number) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [resultCount, setResultCount] = useState(null);

  useEffect(() => {
    if (id !== '') {
      setIsLoading(true);
      fetch(
        `http://localhost:8000/viruses/${id}?page_size=10&page_num=${currentpage}`
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
    }

  }, [ id, currentpage]);

  return { isLoading, data, resultCount };
}