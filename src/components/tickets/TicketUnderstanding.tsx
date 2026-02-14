"use client"

import { Ticket } from "@/lib/types"
import { motion } from "framer-motion"
import { Bot, Tag, FileText, AlertTriangle } from "lucide-react"

interface TicketUnderstandingProps {
    ticket?: Ticket
}

export function TicketUnderstanding({ ticket }: TicketUnderstandingProps) {
    if (!ticket) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-zinc-400 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                <Bot className="w-12 h-12 mb-4 opacity-20" />
                <p>Select a ticket to view AI insights</p>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
        >
            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-400 font-semibold">
                    <Bot size={18} />
                    <h3>AI Summary</h3>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    User is experiencing a <strong>critical infrastructure issue</strong> regarding 503 errors and high latency in the US-East region. This appears to be related to load balancer performance.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-medium">
                            <Tag size={16} className="text-purple-500" />
                            <h4>Classification</h4>
                        </div>
                        <div className="flex gap-1">
                            <button className="text-zinc-400 hover:text-green-500 transition-colors" title="Correct">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" /></svg>
                            </button>
                            <button className="text-zinc-400 hover:text-red-500 transition-colors" title="Incorrect">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 14V2" /><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" /></svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {["Infrastructure", "High Severity", "Load Balancer"].map(tag => (
                            <span key={tag} className="px-2 py-1 text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-md border border-purple-100 dark:border-purple-900/30">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2 mb-3 text-zinc-900 dark:text-zinc-100 font-medium">
                        <FileText size={16} className="text-orange-500" />
                        <h4>Entities</h4>
                    </div>
                    <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                        <li className="flex justify-between">
                            <span>Region:</span>
                            <span className="font-medium text-zinc-900 dark:text-zinc-200">US-East</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Error Code:</span>
                            <span className="font-medium text-zinc-900 dark:text-zinc-200">503</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Component:</span>
                            <span className="font-medium text-zinc-900 dark:text-zinc-200">Load Balancer</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
                <div className="flex items-center gap-2 mb-2 text-yellow-700 dark:text-yellow-400 font-semibold">
                    <AlertTriangle size={18} />
                    <h3>Missing Information</h3>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                    The specific availability zone within US-East is not mentioned. <button className="text-blue-600 dark:text-blue-400 underline hover:no-underline">Request details</button>
                </p>
            </div>
        </motion.div>
    )
}
