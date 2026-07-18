import { api } from '@/services/api'


export interface CertificationType {
    id: number,
    name: string
}



const API_ROUTE = '/api/db'

export const certificationRoutes = {

    getCertificationTypes: async (): Promise<CertificationType[]> => {
        return api.get<CertificationType[]>(API_ROUTE + '/certificationTypes')
    },
}