import { api } from '@/services/api'


export interface Area {
    id: number,
    name: string,
    sname: string,
    active: number,
    created_at: Date,
    updated_at: Date
}

export interface AreaPayload {
    name: string,
    sname: string
}



const API_ROUTE = '/api/db'

export const areaService = {

    getAreas: async (): Promise<Area[]> => {
        return api.get<Area[]>(API_ROUTE + '/areas')
    },
    getAreaById: async (areaId: string): Promise<Area> => {
        if (!areaId) console.log("No Area")

        return api.get<Area>(API_ROUTE + `/areas/${areaId}`)

    }
}