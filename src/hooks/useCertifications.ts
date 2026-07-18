
import { certificationRoutes, CertificationType } from "@/services/certification";
import { useEffect, useState } from "react";

interface useCertificationTypeReturn {
    certifications: CertificationType[],
    loading: boolean,
    error: string | null,
    refresh: () => void
}


export function useCertificationType(): useCertificationTypeReturn {
    const [certifications, setCertifications] = useState<CertificationType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [tick, setTick] = useState(0)


    useEffect(() => {

        setLoading(true)
        setError(null)

        certificationRoutes.getCertificationTypes()
            .then(data => setCertifications(data ?? []))
            .catch(error => setError(error instanceof Error ? error.message : String(error)))
            .finally(() => setLoading(false))
    }, [tick])


    return { certifications, loading, error, refresh: () => setTick(t => t + 1) }
}