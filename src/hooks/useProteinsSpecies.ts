import { useEffect, useState } from "react";

export function useProteinsSpecies(id) {
    const [proteinInfo, setProteinInfo] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/species/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProteinInfo(data.protein_structures)
            });
    }, []);


    return {proteinInfo}
}