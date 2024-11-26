import { useEffect, useState } from "react";
import { VirusData } from "../types/virusdata";
import { api_url } from "../utils/api";

export function useViruses(
  filterparam: string,
  id: string,
  currentpage: number
) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<VirusData | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `http://${api_url}/api/viruses/?qualifier=${id}&page_size=10&page_num=${currentpage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setData(data);
      })
      .catch((error) => {
        console.error(error);
        setData(null);
        setIsLoading(false);
      });
  }, [filterparam, id, currentpage]);

  return { isLoading, data };
}
