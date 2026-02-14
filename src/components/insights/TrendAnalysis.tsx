"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from "recharts"
import { TrendingUp } from "lucide-react"

const data = [
    { name: 'Mon', volume: 45, resolutionRate: 88 },
    { name: 'Tue', volume: 52, resolutionRate: 85 },
    { name: 'Wed', volume: 38, resolutionRate: 92 },
    { name: 'Thu', volume: 65, resolutionRate: 80 },
    { name: 'Fri', volume: 48, resolutionRate: 90 },
    { name: 'Sat', volume: 20, resolutionRate: 95 },
    { name: 'Sun', volume: 15, resolutionRate: 98 },
]

export function TrendAnalysis() {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <TrendingUp className="text-blue-600 dark:text-blue-400" size={20} />
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Volume vs Resolution</h2>
                </div>
                <select className="text-sm border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 rounded-md px-2 py-1 focus:outline-none">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>This Quarter</option>
                </select>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#71717A' }}
                            dy={10}
                        />
                        <YAxis
                            yAxisId="left"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#71717A' }}
                            label={{ value: 'Volume', angle: -90, position: 'insideLeft', fill: '#71717A' }}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#71717A' }}
                            label={{ value: 'Resolution %', angle: 90, position: 'insideRight', fill: '#71717A' }}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend />
                        <Bar yAxisId="left" dataKey="volume" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={30} />
                        <Line yAxisId="right" type="monotone" dataKey="resolutionRate" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
