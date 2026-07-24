import { api } from '@/services/api'


export interface Church {
    id: number,
    name: string,
    cname: string,
    active: number,
    created_at: Date,
    updated_at: Date,
    areaId: number
}

const API_URL = '/api/db'

export const churchService = {

    getChurches: async (): Promise<Church[]> => {
        return api.get<Church[]>(API_URL + '/churches')
    },
    getChurchById: async (churchId: number): Promise<Church> => {
        return api.get<Church>(API_URL + `/churches/${churchId}`)
    },
    getChurchByAreaId: async (areaId: number): Promise<Church[]> => {
        const params = new URLSearchParams()
        if (areaId) params.set('areaId', areaId.toString())
        return api.get<Church[]>(API_URL + `/churches?${params}`)
    }
}