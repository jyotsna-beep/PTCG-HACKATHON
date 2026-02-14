"use client"

import { TicketDetailPanel } from "@/components/tickets/TicketDetailPanel"
import { TicketCard } from "@/components/tickets/TicketCard"
import { Ticket } from "@/lib/types"
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Inbox, SlidersHorizontal, ArrowUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

// Expanded Mock Data
const MOCK_TICKETS: Ticket[] = [
    {
        id: "INC-2024-001",
        title: "VPN Connection Failed",
        description: "User cannot connect to VPN. Error 619.",
        priority: "high",
        status: "open",
        slaRisk: "breached",
        aiConfidence: 95,
        category: "Network",
        createdAt: "2024-02-14T08:00:00Z",
        assignee: { name: "Network Ops" }
    },
    {
        id: "INC-2024-002",
        title: "Email Sync Issue",
        description: "Outlook not syncing emails on mobile.",
        priority: "medium",
        status: "open",
        slaRisk: "at-risk",
        aiConfidence: 88,
        category: "Software",
        createdAt: "2024-02-14T09:00:00Z",
        assignee: { name: "Help Desk" }
    },
    {
        id: "INC-2024-003",
        title: "Password Reset Request",
        description: "User locked out of account.",
        priority: "low",
        status: "new",
        slaRisk: "safe",
        aiConfidence: 99,
        category: "Access",
        createdAt: "2024-02-14T10:00:00Z"
    },
    {
        id: "INC-2024-004",
        title: "Server High CPU Usage",
        description: "Production server CPU at 99%.",
        priority: "critical",
        status: "open",
        slaRisk: "breached",
        aiConfidence: 92,
        category: "Infrastructure",
        createdAt: "2024-02-14T11:00:00Z",
        assignee: { name: "John Doe" }
    },
    {
        id: "INC-2024-005",
        title: "Printer Jam",
        description: "Printer on 3rd floor jammed.",
        priority: "low",
        status: "resolved",
        slaRisk: "safe",
        aiConfidence: 85,
        category: "Hardware",
        createdAt: "2024-02-13T15:00:00Z",
        assignee: { name: "Help Desk" }
    },
    {
        id: "INC-2024-006",
        title: "Database Latency",
        description: "Queries taking longer than 5s.",
        priority: "high",
        status: "open",
        slaRisk: "at-risk",
        aiConfidence: 89,
        category: "Database",
        createdAt: "2024-02-14T12:00:00Z",
        assignee: { name: "DBA Team" }
    },
    {
        id: "INC-2024-007",
        title: "Monitor Flickering",
        description: "Screen flickering on new monitor.",
        priority: "medium",
        status: "open",
        slaRisk: "safe",
        aiConfidence: 91,
        category: "Hardware",
        createdAt: "2024-02-14T13:00:00Z",
        assignee: { name: "John Doe" }
    },
    {
        id: "INC-2024-008",
        title: "CRM Login Failure",
        description: "Sales team unable to log in to CRM.",
        priority: "high",
        status: "open",
        slaRisk: "at-risk",
        aiConfidence: 93,
        category: "Software",
        createdAt: "2024-02-14T14:00:00Z"
    }
]

const CATEGORIES = ["All", "Network", "Hardware", "Software", "Access", "Database", "Infrastructure"]

export default function TicketsPage() {
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [activeCategory, setActiveCategory] = useState("All")

    // Live Filtering Logic
    const filteredTickets = useMemo(() => {
        return MOCK_TICKETS.filter(ticket => {
            const matchesSearch =
                ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ticket.description.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesCategory = activeCategory === "All" || ticket.category === activeCategory

            return matchesSearch && matchesCategory
        })
    }, [searchQuery, activeCategory])

    return (
        <div className="flex h-[calc(100vh-6rem)] gap-6 overflow-hidden">
            {/* Main Ticket List (Single Stream) */}
            <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">

                {/* Header & Controls */}
                <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 space-y-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <Inbox className="text-blue-600" size={24} />
                            Ticket Management
                        </h1>
                        <p className="text-xs text-zinc-500">
                            {filteredTickets.length} active tickets found
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by ID, title, or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        <SlidersHorizontal size={14} className="text-zinc-400 shrink-0 mr-1" />
                        {CATEGORIES.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={cn(
                                    "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border",
                                    activeCategory === category
                                        ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                                        : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                                )}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Scrollable List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                    <AnimatePresence mode="popLayout">
                        {filteredTickets.length > 0 ? (
                            filteredTickets.map((ticket) => (
                                <motion.div
                                    key={ticket.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <TicketCard
                                        ticket={ticket}
                                        isActive={selectedTicket?.id === ticket.id}
                                        onClick={setSelectedTicket}
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-3">
                                    <Filter className="text-zinc-400" size={24} />
                                </div>
                                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">No tickets found</h3>
                                <p className="text-xs text-zinc-500 max-w-[200px] mt-1">
                                    Try adjusting your filters or search query.
                                </p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Sliding Detail Panel (Resizable) */}
            <TicketDetailPanel
                ticket={selectedTicket}
                onClose={() => setSelectedTicket(null)}
            />
        </div>
    )
}
