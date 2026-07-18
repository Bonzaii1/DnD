import { api } from '@/services/api'


export interface EventSeries {
    id: number,
    name: string,
}



const API_ROUTE = '/api/db'

export const eventSeriesRoutes = {

    getEventSeries: async (): Promise<EventSeries[]> => {
        return api.get<EventSeries[]>(API_ROUTE + '/eventSeries')
    },
}