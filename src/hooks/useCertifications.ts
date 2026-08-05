
import { useQuery } from '@tanstack/react-query'
import { certificationService, CertificationType } from "@/services/certification"

interface useCertificationTypeReturn {
    certifications: CertificationType[]
    loading: boolean
    error: string | null
    refresh: () => void
}

export function useCertificationType(role: string | undefined): useCertificationTypeReturn {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['certifications', role],
        queryFn: () => certificationService.getCertificationTypes(role!),
        enabled: !!role
    })

    return {
        certifications: data ?? [],
        loading: isLoading,
        error: error ? (error instanceof Error ? error.message : String(error)) : null,
        refresh: () => { refetch() }
    }
}