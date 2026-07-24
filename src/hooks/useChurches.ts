import { Church, churchService } from "@/services/church";
import { useEffect, useState } from "react";



interface useChurchReturn {
    churches: Church[],
    loading: boolean,
    error: string | null,
    getByArea: (areaId: number) => void,
    clearFilter: () => void,
    refresh: () => void
}


export function useChurch(areaIdInit: number | null): useChurchReturn {

    const [areaId, setAreaId] = useState<number | null>(areaIdInit)
    const [churches, setChurches] = useState<Church[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [tick, setTick] = useState<number>(0)

    useEffect(() => {

        setLoading(true)
        setError(null)

        const request = areaId !== null
            ? churchService.getChurchByAreaId(areaId)
            : churchService.getChurches()

        request
            .then(data => setChurches(data))
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false))

    }, [areaId, tick])


    function getByArea(areaId: number) { setAreaId(areaId) }
    function clearFilter() { setAreaId(null) }
    function refresh() { setTick(t => t + 1) }




    return { churches, loading, error, getByArea, clearFilter, refresh }


}