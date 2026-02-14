import { ArrowUp, ArrowDown, Clock, AlertTriangle, Layers, Zap, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ResponsiveContainer, AreaChart, Area } from "recharts"

const sparklineData = [
    { value: 10 }, { value: 15 }, { value: 12 }, { value: 20 }, { value: 18 }, { value: 25 }, { value: 22 }
]

const stats = [
    {
        label: "Total Tickets",
        value: "1,240",
        change: "+12%",
        trend: "up",
        color: "text-blue-600",
        chartColor: "#2563eb",
        data: [{ value: 100 }, { value: 120 }, { value: 115 }, { value: 130 }, { value: 125 }, { value: 140 }, { value: 135 }]
    },
    {
        label: "High Priority",
        value: "42",
        change: "+8%",
        trend: "up", // bad
        color: "text-red-600",
        chartColor: "#dc2626",
        data: [{ value: 30 }, { value: 35 }, { value: 32 }, { value: 40 }, { value: 38 }, { value: 45 }, { value: 42 }]
    },
    {
        label: "SLA Risk",
        value: "18",
        change: "-5%",
        trend: "down", // good
        color: "text-amber-600",
        chartColor: "#d97706",
        data: [{ value: 25 }, { value: 22 }, { value: 20 }, { value: 18 }, { value: 20 }, { value: 19 }, { value: 18 }]
    },
    {
        label: "Duplicate Clusters",
        value: "7",
        change: "+2",
        trend: "up", // neutral/bad
        color: "text-purple-600",
        chartColor: "#9333ea",
        data: [{ value: 4 }, { value: 5 }, { value: 6 }, { value: 5 }, { value: 7 }, { value: 6 }, { value: 7 }]
    },
    {
        label: "Avg Resolution",
        value: "4h 12m",
        change: "-15%",
        trend: "down", // good
        color: "text-green-600",
        chartColor: "#16a34a",
        data: [{ value: 300 }, { value: 280 }, { value: 270 }, { value: 260 }, { value: 255 }, { value: 250 }, { value: 252 }]
    },
]

export function StatsOverview() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden group"
                >
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</h3>
                        <div className={cn(
                            "flex items-center text-xs font-medium",
                            stat.trend === "up" && (stat.label === "Total Tickets" || stat.label === "Customer Satisfaction") ? "text-green-600" :
                                stat.trend === "down" && (stat.label === "Avg Resolution" || stat.label === "SLA Risk") ? "text-green-600" :
                                    "text-red-500"
                        )}>
                            {stat.change}
                            {stat.trend === "up" ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                        </div>
                    </div>

                    <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{stat.value}</p>
                        <div className="h-8 w-20">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stat.data}>
                                    <defs>
                                        <linearGradient id={`color-${index}`} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={stat.chartColor} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={stat.chartColor} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke={stat.chartColor}
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill={`url(#color-${index})`}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
