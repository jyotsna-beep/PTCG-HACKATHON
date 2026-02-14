"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { AlertOctagon, TrendingDown, Activity } from "lucide-react"

const recurringIssuesData = [
    { issue: "VPN Timeout", count: 45, impact: "High" },
    { issue: "Outlook Sync", count: 32, impact: "Medium" },
    { issue: "Printer Driver", count: 28, impact: "Low" },
    { issue: "Login Failure", count: 25, impact: "High" },
    { issue: "Wi-Fi Access", count: 18, impact: "Medium" },
]

const resolutionTimeData = [
    { range: "< 1h", count: 120 },
    { range: "1-4h", count: 85 },
    { range: "4-8h", count: 45 },
    { range: "8-24h", count: 30 },
    { range: "> 24h", count: 15 },
]

export function TopRecurringIssuesChart() {
    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm h-full">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Top Recurring Issues</h3>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={recurringIssuesData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e4e4e7" />
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="issue"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            width={100}
                            tick={{ fontSize: 12, fill: '#71717a' }}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export function TimeToResolutionChart() {
    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm h-full">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Time-to-Resolution Distribution</h3>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={resolutionTimeData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                        <XAxis
                            dataKey="range"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#71717a' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#71717a' }}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export function NoiseAlertSummary() {
    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm h-full flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-orange-500">
                <AlertOctagon size={80} />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <Activity className="text-orange-500" size={20} />
                    Noise Alert Detection
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    AI detected 3 system alerts generating excess noise.
                </p>
            </div>

            <div className="mt-6 space-y-4">
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-100 dark:border-orange-800/30">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-semibold text-orange-900 dark:text-orange-100 text-sm">Zabbix: CPU High Load</h4>
                            <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">Generating 120 alerts/hour</p>
                        </div>
                        <span className="bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                            Muted
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <TrendingDown size={16} className="text-green-500" />
                    <span>Noise reduced by <strong>45%</strong> this hour.</span>
                </div>
            </div>
        </div>
    )
}
