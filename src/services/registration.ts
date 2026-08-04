import { api } from '@/services/api'

const API_ROUTE = '/api/user'

export const registrationService = {
    /**
     * Check if a user is registered for the active event
     */
    checkIsRegistered: async (userId: number): Promise<boolean> => {
        const response = await api.get<{ isRegistered: boolean }>(`${API_ROUTE}/isRegistered/${userId}`)
        return response.isRegistered
    }
}
