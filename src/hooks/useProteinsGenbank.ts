import { useEffect, useState } from "react";

export function useProteinsGenbank() {
    const [proteinInfo, setProteinInfo] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/genbankid/CAX33877.1')
            .then((res) => res.json())
            .then((data) => {
                setProteinInfo(data.protein_structures[0])
            });
    }, []);


    return {proteinInfo}
}