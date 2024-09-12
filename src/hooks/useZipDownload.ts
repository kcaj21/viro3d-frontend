import { useState } from "react";

export function useZipDownload(id: string) {

    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/zip/${id}`);
        if (!response.ok) {
          throw new Error('Failed to download PDBs');
        }
        // Simulate file download (you might need to adjust this part based on your backend)
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${id} PDBs.zip`;
        link.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading PDBs:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    return { isLoading, handleDownload };
}