
import { areaService, Area } from "@/services/area";
import { useEffect, useState } from "react";

interface useAreaReturn {
    areas: Area[],
    loading: boolean,
    error: string | null,
    refresh: () => void
}


export function useArea(): useAreaReturn {
    const [areas, setAreas] = useState<Area[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [tick, setTick] = useState(0)


    useEffect(() => {

        setLoading(true)
        setError(null)

        areaService.getAreas()
            .then(data => setAreas(data ?? []))
            .catch(error => setError(error instanceof Error ? error.message : String(error)))
            .finally(() => setLoading(false))
    }, [tick])


    return { areas, loading, error, refresh: () => setTick(t => t + 1) }
}