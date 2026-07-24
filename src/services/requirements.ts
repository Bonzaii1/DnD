import { api } from '@/services/api'


export interface RequirementsPayload {
    recordCard: number,
    entranceEssay: number,
    notes: number,
    recommendation: number,
    userId: number
}


const API_ROUTE = '/api/db'

export const requirementService = {

    updateRequirements: async (payload: RequirementsPayload) => {
        const form = new FormData()
        form.append('recordCard', payload.recordCard.toString())
        form.append('entranceEssay', payload.entranceEssay.toString())
        form.append('notes', payload.notes.toString())
        form.append('recommendation', payload.recommendation.toString())
        form.append('userId', payload.userId.toString())
        try {
            await api.post(API_ROUTE + '/requirements', payload)
            return "success"
        } catch (err) {
            return "Failure: " + err

        }
    }

}