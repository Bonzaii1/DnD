import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Church, churchService } from "@/services/church"

interface useChurchReturn {
    churches: Church[]
    loading: boolean
    error: string | null
    getByArea: (areaId: number) => void
    clearFilter: () => void
    refresh: () => void
}

export function useChurch(areaIdInit: number | null): useChurchReturn {
    const [areaId, setAreaId] = useState<number | null>(areaIdInit)

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['churches', areaId],
        queryFn: () => areaId !== null 
            ? churchService.getChurchByAreaId(areaId)
            : churchService.getChurches()
    })

    function getByArea(newAreaId: number) { setAreaId(newAreaId) }
    function clearFilter() { setAreaId(null) }
    function refresh() { refetch() }

    return {
        churches: data ?? [],
        loading: isLoading,
        error: error ? (error instanceof Error ? error.message : String(error)) : null,
        getByArea,
        clearFilter,
        refresh
    }
}