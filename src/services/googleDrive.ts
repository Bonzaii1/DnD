import { api } from '@/services/api'

export interface DriveFile {
    id: string,
    name: string,
    mimeType: string,
}

export interface DriveFileList {
    files: DriveFile[],
}

export interface Payload {
    fname: string,
    lname: string,
    recordCard: File | null,
    entranceEssay: File | null,
    notes: File | null,
    recommendation: File | null
}

interface FileResponse {
    fieldName: string,
    id: string,
    name: string,
    mimeType: string,
    size: string,
    webViewLink: string
}

export interface UploadResponse {
    message: string,
    files: FileResponse[],
    details?: string
}

const BASE_URL = import.meta.env.VITE_API_URL ?? ''

export const googleDrive = {
    listFiles: async (folderId?: string): Promise<DriveFileList> => {
        const params = new URLSearchParams()
        if (folderId) params.set('q', `'${folderId}' in parents`)
        return api.get<DriveFileList>(`/api/drive/files?${params}`)
    },

    uploadFile: async (file: File, folderPath?: string, createIfMissing = false): Promise<DriveFile> => {
        const form = new FormData()
        form.append('file', file)
        if (folderPath) {
            form.append('folderPath', folderPath)
            form.append('createIfMissing', String(createIfMissing))
        }
        const r = await fetch(`${BASE_URL}/api/drive/upload`, { method: 'POST', body: form })
        if (!r.ok) throw new Error(`Upload failed: ${r.statusText}`)
        return r.json()
    },

    uploadPayload: async (payload: Payload, folderPath?: string, createIfMissing = true): Promise<UploadResponse> => {

        const form = new FormData()
        form.append('fname', payload.fname)
        form.append('lname', payload.lname)
        if (payload.recordCard) form.append('recordCard', payload.recordCard)
        if (payload.entranceEssay) form.append('entranceEssay', payload.entranceEssay)
        if (payload.notes) form.append('notes', payload.notes)
        if (payload.recommendation) form.append('recommendation', payload.recommendation)
        if (folderPath) {
            form.append('folderPath', folderPath)
            form.append('createIfMissing', String(createIfMissing))
        }
        const r = await fetch(`${BASE_URL}/api/drive/uploadPayload`, { method: 'POST', body: form })
        if (!r.ok) throw new Error(`Upload failed: ${r.statusText}`)
        const data = await r.json()
        console.log(data)
        return data
    }
}