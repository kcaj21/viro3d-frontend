import { useEffect, useState } from "react";

export function useProteinData(filterparam, id) {
    const [proteinInfo, setProteinInfo] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/${filterparam}/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProteinInfo(data.protein_structures)
            });
    }, []);


    return {proteinInfo}
}