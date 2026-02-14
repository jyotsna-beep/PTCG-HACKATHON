"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

interface DatasetContextType {
    isUploaded: boolean
    fileName: string | null
    uploadData: (file: File) => void
    clearData: () => void
}

const DatasetContext = createContext<DatasetContextType | undefined>(undefined)

export function DatasetProvider({ children }: { children: ReactNode }) {
    const [isUploaded, setIsUploaded] = useState(false)
    const [fileName, setFileName] = useState<string | null>(null)
    const router = useRouter()
    const pathname = usePathname()

    // Route Protection
    useEffect(() => {
        if (!isUploaded && pathname !== "/upload") {
            router.push("/upload")
        }
    }, [isUploaded, pathname, router])

    const uploadData = (file: File) => {
        // Simulating upload/parsing delay is handled in the UI
        setIsUploaded(true)
        setFileName(file.name)
        // Router push is handled in the component after animation
    }

    const clearData = () => {
        setIsUploaded(false)
        setFileName(null)
        router.push("/upload")
    }

    return (
        <DatasetContext.Provider value={{ isUploaded, fileName, uploadData, clearData }}>
            {children}
        </DatasetContext.Provider>
    )
}

export function useDataset() {
    const context = useContext(DatasetContext)
    if (context === undefined) {
        throw new Error("useDataset must be used within a DatasetProvider")
    }
    return context
}
