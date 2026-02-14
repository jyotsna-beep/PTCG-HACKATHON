export type Priority = "low" | "medium" | "high" | "critical"
export type Status = "new" | "open" | "in-progress" | "resolved" | "closed"
export type SLARisk = "safe" | "at-risk" | "breached"

export interface Ticket {
    id: string
    title: string
    description: string
    priority: Priority
    status: Status
    slaRisk: SLARisk
    aiConfidence: number
    category: string
    createdAt: string
    assignee?: {
        name: string
        avatar?: string
    }
}
