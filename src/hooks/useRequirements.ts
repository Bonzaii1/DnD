import { useMutation } from '@tanstack/react-query'
import { requirementService, RequirementsPayload } from "@/services/requirements"

interface useRequirementsReturn {
    resMessage: string | null
    update: (payload: RequirementsPayload) => Promise<void>
    loading: boolean
}

export function useRequirements(): useRequirementsReturn {
    const mutation = useMutation({
        mutationFn: requirementService.updateRequirements
    })

    async function update(payload: RequirementsPayload) {
        await mutation.mutateAsync(payload)
    }

    return {
        resMessage: mutation.data ?? null,
        update,
        loading: mutation.isPending
    }
}