import { api } from '@/services/api'

export interface DriveFile {
    id: string,
    name: string,
    mimeType: string,
}

export interface DriveFileList {
    files: DriveFile[],
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
}