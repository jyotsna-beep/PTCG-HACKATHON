"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from "recharts"

const volumeData = [
    { time: "08:00", active: 12, new: 5 },
    { time: "10:00", active: 18, new: 8 },
    { time: "12:00", active: 35, new: 15 },
    { time: "14:00", active: 28, new: 10 },
    { time: "16:00", active: 22, new: 7 },
    { time: "18:00", active: 15, new: 4 },
]

const priorityData = [
    { name: 'Low', value: 45, color: '#94a3b8' }, // Slate-400
    { name: 'Medium', value: 30, color: '#f59e0b' }, // Amber-500
    { name: 'High', value: 15, color: '#ef4444' }, // Red-500
    { name: 'Critical', value: 10, color: '#991b1b' }, // Red-800
]

export function TicketVolumeChart() {
    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Ticket Volume Over Time</h3>
                <select className="text-xs bg-zinc-100 dark:bg-zinc-800 border-none rounded px-2 py-1">
                    <option>Today</option>
                    <option>Yesterday</option>
                    <option>Last 7 Days</option>
                </select>
            </div>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={volumeData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                        <XAxis
                            dataKey="time"
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
                        <Line type="monotone" dataKey="new" stroke="#3b82f6" strokeWidth={3} dot={false} />
                        <Line type="monotone" dataKey="active" stroke="#a8a29e" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export function PriorityDistributionChart() {
    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm h-full">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Priority Distribution</h3>
            <div className="h-[250px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={priorityData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {priorityData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
