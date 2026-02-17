"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface DiagnosisCardProps {
    name: string;
    probability: number;
    index: number;
}

export default function DiagnosisCard({ name, probability, index }: DiagnosisCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
                "p-5 rounded-xl border transition-all duration-300 hover:shadow-md relative overflow-hidden group",
                "bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm",
                getColor(probability)
            )}
        >
            {/* Background Gradient on Hover */}
            <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500",
                getProgressColor(probability).replace("bg-", "bg-gradient-to-r from-transparent to-")
            )} />

            <div className="flex items-center justify-between mb-3 relative z-10">
                <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", getProgressColor(probability))} />
                    <h3 className="font-bold text-lg">{name}</h3>
                </div>
                <span className="text-xl font-black tracking-tight">{probability}%</span>
            </div>

            <div className="relative h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${probability}%` }}
                    transition={{ duration: 1, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
                    className={cn(
                        "h-full rounded-full shadow-lg relative overflow-hidden",
                        getProgressColor(probability)
                    )}
                >
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                </motion.div>
            </div>
        </motion.div>
    );
}

// Update helper to return standard tailwind colors relative to theme
function getProgressColor(prob: number) {
    if (prob >= 60) return "bg-emerald-500 dark:bg-emerald-400";
    if (prob >= 40) return "bg-amber-500 dark:bg-amber-400";
    if (prob >= 20) return "bg-orange-500 dark:bg-orange-400";
    return "bg-slate-400 dark:bg-slate-500";
}

function getColor(prob: number) {
    if (prob >= 60) return "border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-50";
    if (prob >= 40) return "border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-50";
    if (prob >= 20) return "border-orange-200 dark:border-orange-800/50 text-orange-900 dark:text-orange-50";
    return "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300";
}
