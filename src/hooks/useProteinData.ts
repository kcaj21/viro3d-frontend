import { useEffect, useState } from "react";

export function useProteinData(filterparam, id) {
    const [isLoading, setIsLoading] = useState(true);
    const [proteinInfo, setProteinInfo] = useState(null);

    useEffect(() => {


        setIsLoading(true)
        fetch(`http://localhost:8000/${filterparam}/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setIsLoading(false);
                setProteinInfo(data.protein_structures)
            })
            .catch((error) => {
                console.error(error);
                setProteinInfo(null)
                setIsLoading(false)
              });
    }, [filterparam, id]);


    return {isLoading, proteinInfo}
}