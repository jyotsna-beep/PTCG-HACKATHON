"use client"

import { Network, AlertCircle, Server, Database } from "lucide-react"

export function ProblemCluster() {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
                <Network className="text-orange-600 dark:text-orange-400" size={20} />
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Problem Clusters</h2>
            </div>

            <div className="flex-1 relative border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-800/20 overflow-hidden">
                {/* Mock Network Graph Visualization */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">

                    {/* Central Node (Root Cause) */}
                    <div className="relative z-10 flex flex-col items-center group cursor-pointer">
                        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 border-2 border-red-500 flex items-center justify-center text-red-600 dark:text-red-400 shadow-lg shadow-red-500/20 transition-transform group-hover:scale-110">
                            <Database size={24} />
                        </div>
                        <div className="bg-white dark:bg-zinc-800 px-2 py-1 rounded shadow-sm text-xs font-semibold mt-2 border border-zinc-200 dark:border-zinc-700">
                            db-shard-04
                        </div>
                    </div>

                    {/* Connecting Lines */}
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none opacity-40">
                        <line x1="200" y1="200" x2="100" y2="100" stroke="currentColor" strokeWidth="2" className="text-zinc-400 dark:text-zinc-600" />
                        <line x1="200" y1="200" x2="300" y2="100" stroke="currentColor" strokeWidth="2" className="text-zinc-400 dark:text-zinc-600" />
                        <line x1="200" y1="200" x2="100" y2="300" stroke="currentColor" strokeWidth="2" className="text-zinc-400 dark:text-zinc-600" />
                        <line x1="200" y1="200" x2="300" y2="300" stroke="currentColor" strokeWidth="2" className="text-zinc-400 dark:text-zinc-600" />
                    </svg>

                    {/* Connected Nodes (Incidents) */}
                    <div className="absolute top-[-100px] left-[-100px] flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-600 flex items-center justify-center text-zinc-500">
                            <AlertCircle size={16} />
                        </div>
                        <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-1 mt-1 rounded text-zinc-500">INC-102</span>
                    </div>

                    <div className="absolute top-[-100px] left-[100px] flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-600 flex items-center justify-center text-zinc-500">
                            <AlertCircle size={16} />
                        </div>
                        <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-1 mt-1 rounded text-zinc-500">INC-105</span>
                    </div>

                    <div className="absolute top-[100px] left-[-100px] flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-600 flex items-center justify-center text-zinc-500">
                            <Server size={16} />
                        </div>
                        <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-1 mt-1 rounded text-zinc-500">App-Svc</span>
                    </div>

                    <div className="absolute top-[100px] left-[100px] flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-600 flex items-center justify-center text-zinc-500">
                            <AlertCircle size={16} />
                        </div>
                        <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-1 mt-1 rounded text-zinc-500">INC-109</span>
                    </div>

                </div>

                <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg text-xs shadow-sm">
                    <div className="font-semibold mb-1">Cluster Detail</div>
                    <div className="text-zinc-500">Correlation: 98%</div>
                    <div className="text-zinc-500">Root Cause: Database Latency</div>
                </div>
            </div>
        </div>
    )
}
