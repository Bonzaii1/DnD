import { useState, useEffect } from 'react'
import { googleDrive, DriveFile, Payload, UploadResponse } from '@/services/googleDrive'

interface UseDriveReturn {
    files: DriveFile[]
    loading: boolean
    error: string | null
    uploadResult: UploadResponse | null
    upload: (file: File, folderPath?: string) => Promise<void>
    uploadPayload: (payload: Payload, folderPath?: string) => Promise<void>
    refresh: () => void
}


export function useDrive(folderId?: string): UseDriveReturn {
    const [files, setFiles] = useState<DriveFile[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [tick, setTick] = useState(0)
    const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null)

    useEffect(() => {
        setLoading(true)
        setError(null)
        googleDrive.listFiles(folderId)
            .then(data => setFiles(data.files))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false))
    }, [folderId, tick])

    async function upload(file: File, folderPath?: string) {
        setLoading(true)
        setError(null)
        try {
            await googleDrive.uploadFile(file, folderPath)
            setTick(t => t + 1)
        } catch (e) {
            setError((e as Error).message)
        } finally {
            setLoading(false)
        }
    }

    async function uploadPayload(payload: Payload, folderPath?: string) {
        setLoading(true)
        setError(null)
        try {
            const result = await googleDrive.uploadPayload(payload, folderPath)
            setUploadResult(result)
            console.log(result)
            setTick(t => t + 1)
        } catch (e) {
            setError((e as Error).message)
        } finally {
            setLoading(false)
        }
    }

    return { files, loading, error, uploadResult, upload, uploadPayload, refresh: () => setTick(t => t + 1) }
}
