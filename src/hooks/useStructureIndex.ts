import { useEffect, useState } from "react";

export function useStructureIndex(id) {
    const [isLoading, setIsLoading] = useState(true);
    const [proteinInfo, setProteinInfo] = useState(null);

    useEffect(() => {
        setIsLoading(true)
        fetch(`http://localhost:8000/recordid/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setIsLoading(false);
                console.log(data.protein_structure)
                setProteinInfo(data.protein_structure)
            })
            .catch((error) => {
                console.error(error);
                setProteinInfo(null)
                setIsLoading(false)
              });
    }, [id]);


    return {isLoading, proteinInfo}
}