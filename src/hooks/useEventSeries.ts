
import { eventSeriesService, EventSeries } from "@/services/eventSeries";
import { useEffect, useState } from "react";

interface useEventSeriesReturn {
    eventSeries: EventSeries[],
    loading: boolean,
    error: string | null,
    refresh: () => void
}


export function useEventSeries(): useEventSeriesReturn {
    const [eventSeries, setEventSeries] = useState<EventSeries[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [tick, setTick] = useState(0)


    useEffect(() => {

        setLoading(true)
        setError(null)

        eventSeriesService.getEventSeries()
            .then(data => setEventSeries(data ?? []))
            .catch(error => setError(error instanceof Error ? error.message : String(error)))
            .finally(() => setLoading(false))
    }, [tick])


    return { eventSeries, loading, error, refresh: () => setTick(t => t + 1) }
}