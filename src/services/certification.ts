import { api } from '@/services/api'


export interface CertificationType {
    id: number,
    name: string
}



const API_ROUTE = '/api/db'

export const certificationService = {

    getCertificationTypes: async (role: string): Promise<CertificationType[]> => {
        return api.get<CertificationType[]>(API_ROUTE + '/certificationTypes?role=' + encodeURIComponent(role))
    },
}