import { useState } from "react";
import { api_url } from "../utils/api";

export function useZipDownload(endpoint:string, id: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDownload = async (format: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${api_url}/api/zip/${endpoint}/${id}/${format}`);
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
        link.download = endpoint === 'virus' ? `${id} mmCIFs.zip` : `${id.slice(3, 13)}_similar_structures_mmCIFs.zip`;
      } else {
        link.download = endpoint === 'virus' ? `${id} PDBs.zip` : `${id.slice(3, 13)}_similar_structures_PDBs.zip`;
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
