"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import { X, Clock, AlertTriangle, Shield, RefreshCw, Send, Paperclip, ChevronRight, User } from "lucide-react"
import { Ticket } from "@/lib/types"
import { PriorityBadge } from "@/components/ui/PriorityBadge"
import { AnimatedButton } from "@/components/ui/AnimatedButton"
import { Avatar } from "@/components/ui/Avatar"
import { TicketUnderstanding } from "./TicketUnderstanding"
import { AIAssistantPanel } from "./AIAssistantPanel"
import { cn } from "@/lib/utils"

interface TicketDetailPanelProps {
    ticket: Ticket | null
    onClose: () => void
}

export function TicketDetailPanel({ ticket, onClose }: TicketDetailPanelProps) {
    const [width, setWidth] = useState(600)
    const [isResizing, setIsResizing] = useState(false)

    // Handle resizing (Left side drag)
    const startResizing = useCallback(() => setIsResizing(true), [])
    const stopResizing = useCallback(() => setIsResizing(false), [])
    const resize = useCallback((e: MouseEvent) => {
        if (isResizing) {
            const newWidth = window.innerWidth - e.clientX
            if (newWidth > 400 && newWidth < 1200) {
                setWidth(newWidth)
            }
        }
    }, [isResizing])

    useEffect(() => {
        if (isResizing) {
            window.addEventListener("mousemove", resize)
            window.addEventListener("mouseup", stopResizing)
        }
        return () => {
            window.removeEventListener("mousemove", resize)
            window.removeEventListener("mouseup", stopResizing)
        }
    }, [isResizing, resize, stopResizing])

    return (
        <AnimatePresence>
            {ticket && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-40"
                        onClick={onClose}
                    />

                    {/* Sliding Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0, width: width }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-screen bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl z-50 flex flex-col"
                        style={{ width: width }}
                    >
                        {/* Drag Handle */}
                        <div
                            className="absolute left-0 top-0 w-1.5 h-full cursor-col-resize hover:bg-blue-400 transition-colors opacity-0 hover:opacity-100 z-50"
                            onMouseDown={startResizing}
                        />

                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center gap-3">
                                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-mono">
                                    {ticket.id}
                                </h2>
                                <PriorityBadge priority={ticket.priority} slaRisk={ticket.slaRisk} />
                            </div>
                            <div className="flex items-center gap-2">
                                <AnimatedButton variant="ghost" size="icon" onClick={onClose}>
                                    <X size={20} />
                                </AnimatedButton>
                            </div>
                        </div>

                        {/* Content Scrollable Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* Title & Description */}
                            <div>
                                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                                    {ticket.title}
                                </h1>
                                <p className="text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                                    {ticket.description}
                                </p>
                            </div>

                            {/* AI Analysis Section */}
                            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-5 border border-blue-100 dark:border-blue-900/20">
                                <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                                    <Shield size={16} /> AI Classification Analysis
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-zinc-500 block mb-1">Classified Category</span>
                                        <span className="font-medium text-zinc-900 dark:text-zinc-100">{ticket.category}</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-500 block mb-1">Confidence Score</span>
                                        <span className="font-medium text-zinc-900 dark:text-zinc-100">{ticket.aiConfidence}%</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-zinc-500 block mb-1">Routing Explanation</span>
                                        <p className="text-zinc-700 dark:text-zinc-300">
                                            Routed to <span className="font-medium">Network Operations</span> due to 87% similarity with 124 historical VPN tickets.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Widgets Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <TicketUnderstanding ticket={ticket} />
                                <AIAssistantPanel />
                            </div>

                            {/* Audit Trail Timeline */}
                            <div>
                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Audit Trail</h3>
                                <div className="relative pl-4 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-6">
                                    {[
                                        { title: "Ticket Created", time: "2 hours ago", desc: "Ticket received via Email Channel", icon: RefreshCw },
                                        { title: "AI Classification", time: "1 hour 58 mins ago", desc: "Classified as Infrastructure (98% confidence)", icon: Shield },
                                        { title: "Smart Routing", time: "1 hour 58 mins ago", desc: "Assigned to Network Ops", icon: User },
                                        { title: "SLA Warning", time: "10 mins ago", desc: "Ticket approaching breach threshold", icon: AlertTriangle, color: "text-amber-500" },
                                    ].map((item, i) => (
                                        <div key={i} className="relative">
                                            <div className={cn(
                                                "absolute -left-[21px] top-0 w-10 h-10 rounded-full border-4 border-white dark:border-zinc-900 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800",
                                                item.color ? item.color : "text-zinc-500"
                                            )}>
                                                <item.icon size={16} />
                                            </div>
                                            <div className="pl-6">
                                                <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.title}</h4>
                                                <span className="text-xs text-zinc-400 block mb-1">{item.time}</span>
                                                <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer / Smart Reply */}
                        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                            <div className="relative">
                                <textarea
                                    placeholder="Type a reply or internal note..."
                                    className="w-full bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-xl p-3 pr-12 min-h-[44px] max-h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                                <button className="absolute right-2 bottom-2 p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors">
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
