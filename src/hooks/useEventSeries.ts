
import { useQuery } from '@tanstack/react-query'
import { eventSeriesService, EventSeries } from "@/services/eventSeries"

interface useEventSeriesReturn {
    eventSeries: EventSeries[]
    loading: boolean
    error: string | null
    refresh: () => void
}

export function useEventSeries(): useEventSeriesReturn {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['eventSeries'],
        queryFn: eventSeriesService.getEventSeries
    })

    return {
        eventSeries: data ?? [],
        loading: isLoading,
        error: error ? (error instanceof Error ? error.message : String(error)) : null,
        refresh: () => { refetch() }
    }
}