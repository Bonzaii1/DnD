
import { useQuery } from '@tanstack/react-query'
import { areaService, Area } from "@/services/area"

interface useAreaReturn {
    areas: Area[]
    loading: boolean
    error: string | null
    refresh: () => void
}

export function useArea(): useAreaReturn {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['areas'],
        queryFn: areaService.getAreas
    })

    return {
        areas: data ?? [],
        loading: isLoading,
        error: error ? (error instanceof Error ? error.message : String(error)) : null,
        refresh: () => { refetch() }
    }
}