"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LikelihoodChartProps {
    data: { name: string; probability: number }[];
}

export default function LikelihoodChart({ data }: LikelihoodChartProps) {
    // Sort data by probability descending
    const sortedData = [...data].sort((a, b) => b.probability - a.probability);
    const maxVal = Math.max(...sortedData.map(d => d.probability));

    return (
        <div className="w-full space-y-4">
            {sortedData.map((item, index) => (
                <div key={item.name} className="relative group">
                    <div className="flex justify-between items-end mb-1">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            {item.name}
                        </span>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                            {item.probability}%
                        </span>
                    </div>

                    {/* Bar Track */}
                    <div className="h-4 w-full bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm relative">
                        {/* Animated Bar */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.probability}%` }}
                            transition={{ duration: 1, delay: index * 0.1, type: "spring", bounce: 0 }}
                            className={cn(
                                "h-full rounded-full relative",
                                getBarColor(item.probability)
                            )}
                        >
                            {/* Inner Glow / Shine */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/30" />
                        </motion.div>
                    </div>

                    {/* Tooltip on Hover */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        {item.name}: {item.probability}% Probability
                    </div>
                </div>
            ))}
        </div>
    );
}

function getBarColor(prob: number) {
    // Gradient classes for rich "neon" look
    if (prob >= 60) return "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]";
    if (prob >= 40) return "bg-gradient-to-r from-amber-500 to-yellow-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]";
    return "bg-gradient-to-r from-orange-500 to-red-400 shadow-[0_0_10px_rgba(249,115,22,0.3)]";
}
