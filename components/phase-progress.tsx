"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface PhaseProgressProps {
    currentPhase: number;
    totalPhases?: number;
}

const phases = [
    { number: 1, label: "Initial Assessment" },
    { number: 2, label: "Deep Analysis" },
    { number: 3, label: "Cross-Validation" },
    { number: 4, label: "Refinement" },
    { number: 5, label: "Final Diagnosis" },
];

export default function PhaseProgress({ currentPhase, totalPhases = 5 }: PhaseProgressProps) {
    return (
        <div className="flex items-center gap-1">
            {phases.slice(0, totalPhases).map((phase, index) => {
                const isCompleted = currentPhase > phase.number;
                const isCurrent = currentPhase === phase.number;
                const isPending = currentPhase < phase.number;

                return (
                    <div key={phase.number} className="flex items-center">
                        {/* Phase Step */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                                scale: isCurrent ? 1.05 : 1,
                                opacity: 1
                            }}
                            transition={{ duration: 0.3 }}
                            className="relative group"
                        >
                            {/* Tooltip */}
                            <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                <div className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
                                    Phase {phase.number}: {phase.label}
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-100 rotate-45"></div>
                                </div>
                            </div>

                            {/* Step Circle */}
                            <div className={cn(
                                "relative w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 border-2",
                                isCompleted && "bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-500/30",
                                isCurrent && "bg-gradient-to-br from-primary to-violet-600 border-primary text-white shadow-lg shadow-primary/40 ring-4 ring-primary/20",
                                isPending && "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-400 dark:text-slate-500"
                            )}>
                                {isCompleted ? (
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                    >
                                        <Check className="w-4 h-4" strokeWidth={3} />
                                    </motion.div>
                                ) : (
                                    <span>{phase.number}</span>
                                )}

                                {/* Pulse animation for current phase */}
                                {isCurrent && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-primary"
                                        initial={{ scale: 1, opacity: 0.5 }}
                                        animate={{ scale: 1.5, opacity: 0 }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                )}
                            </div>
                        </motion.div>

                        {/* Connector Line */}
                        {index < totalPhases - 1 && (
                            <div className="w-6 md:w-10 h-0.5 mx-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden relative">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{
                                        width: currentPhase > phase.number ? "100%" : "0%"
                                    }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-sm"
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
