import { useState } from "react";
import { api_url } from "../utils/api";

export function useZipDownload(id: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDownload = async (format: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://${api_url}/api/zip/${id}/${format}`);
      if (!response.ok && response.status !== 429) {
        throw new Error("Failed to download Models");
      }
      if(response.status === 429) {
        alert("Too Many Requests. 60 second timeout initiated")
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      if (format === ".cif") {
        link.download = `${id} mmCIFs.zip`;
      } else {
        link.download = `${id} PDBs.zip`;
      }
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading Models:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleDownload };
}
