"use client"

import { Ticket } from "@/lib/types"
import { TicketCard } from "./TicketCard"

const mockTickets: Ticket[] = [
    {
        id: "INC-2024-001",
        title: "System outage in region US-East",
        description: "Multiple users reporting 503 errors when accessing the dashboard. Load balancers showing high latency.",
        priority: "critical",
        status: "new",
        slaRisk: "breached",
        aiConfidence: 98,
        category: "Infrastructure",
        createdAt: "2024-02-14T08:00:00Z",
        assignee: { name: "Sarah Connor" }
    },
    {
        id: "INC-2024-002",
        title: "Password reset requests piling up",
        description: "Automated reset email service seems to be stuck. Queue size increasing.",
        priority: "high",
        status: "open",
        slaRisk: "at-risk",
        aiConfidence: 92,
        category: "Access Management",
        createdAt: "2024-02-14T09:30:00Z",
    },
    {
        id: "REQ-2024-045",
        title: "New software license for Marketing",
        description: "Request for Adobe Creative Cloud licenses for the new design interns.",
        priority: "low",
        status: "new",
        slaRisk: "safe",
        aiConfidence: 85,
        category: "Software Request",
        createdAt: "2024-02-14T10:15:00Z",
    },
    {
        id: "INC-2024-003",
        title: "VPN connection unstable",
        description: "Remote employees reporting intermittent disconnects from the VPN.",
        priority: "medium",
        status: "in-progress",
        slaRisk: "safe",
        aiConfidence: 89,
        category: "Network",
        createdAt: "2024-02-14T11:00:00Z",
        assignee: { name: "John Wick" }
    }
]

interface TicketListProps {
    onSelect?: (ticket: Ticket) => void
    selectedId?: string
}

export function TicketList({ onSelect, selectedId }: TicketListProps) {
    return (
        <div className="space-y-3">
            {mockTickets.map((ticket) => (
                <div key={ticket.id} className={selectedId === ticket.id ? "ring-2 ring-blue-500 rounded-xl" : ""}>
                    <TicketCard
                        ticket={ticket}
                        onClick={onSelect}
                    />
                </div>
            ))}
        </div>
    )
}
