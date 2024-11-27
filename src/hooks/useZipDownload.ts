import { useState } from "react";
import { api_url } from "../utils/api";

export function useZipDownload(id: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDownload = async (format: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://${api_url}/api/zip/${id}/${format}`);
      if (!response.ok) {
        throw new Error("Failed to download Models");
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
