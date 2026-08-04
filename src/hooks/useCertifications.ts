
import { useQuery } from '@tanstack/react-query'
import { certificationService, CertificationType } from "@/services/certification"

interface useCertificationTypeReturn {
    certifications: CertificationType[]
    loading: boolean
    error: string | null
    refresh: () => void
}

export function useCertificationType(): useCertificationTypeReturn {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['certifications'],
        queryFn: certificationService.getCertificationTypes
    })

    return {
        certifications: data ?? [],
        loading: isLoading,
        error: error ? (error instanceof Error ? error.message : String(error)) : null,
        refresh: () => { refetch() }
    }
}