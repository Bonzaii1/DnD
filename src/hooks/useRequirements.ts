import { requirementService, RequirementsPayload } from "@/services/requirements";
import { useState } from "react";



interface useRequirementsReturn {
    resMessage: string | null,
    update: (payload: RequirementsPayload) => Promise<void>,
    loading: boolean
}


export function useRequirements(): useRequirementsReturn {

    const [resMessage, setResMessage] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)


    async function update(payload: RequirementsPayload) {
        setLoading(true)
        const res = await requirementService.updateRequirements(payload)

        setResMessage(res)
        setLoading(false)

    }

    return { resMessage, update, loading }

}