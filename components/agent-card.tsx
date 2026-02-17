import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Agent } from "@/config/debate-config";

interface AgentCardProps {
    agent: Agent;
    emotion?: "thinking" | "arguing" | "agreeing" | "neutral";
    isActive?: boolean;
}

export default function AgentCard({ agent, emotion = "neutral", isActive }: AgentCardProps) {
    const Icon = agent.icon;

    // Map emotions to visual styles
    const emotionStyles = {
        thinking: "ring-amber-400 bg-amber-50 dark:bg-amber-900/20 scale-110 shadow-[0_0_20px_rgba(251,191,36,0.4)]",
        arguing: "ring-red-500 bg-red-50 dark:bg-red-900/20 scale-110 shadow-[0_0_20px_rgba(239,68,68,0.4)]",
        agreeing: "ring-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 scale-110 shadow-[0_0_20px_rgba(16,185,129,0.4)]",
        neutral: "ring-slate-200 dark:ring-slate-700 bg-white dark:bg-slate-800",
    };

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
                scale: isActive ? 1.1 : 1,
                opacity: 1,
                z: isActive ? 50 : 0,
                y: isActive ? -10 : 0
            }}
            transition={{ duration: 0.4, type: "spring" }}
            className={cn(
                "relative flex flex-col items-center justify-center transition-all duration-300",
                isActive ? "z-50" : "z-10 hover:z-20"
            )}
        >
            {/* Avatar Container */}
            <div className={cn(
                "relative rounded-full overflow-hidden border-4 transition-all duration-500",
                isActive ? emotionStyles[emotion] : "border-white dark:border-slate-700 bg-white dark:bg-slate-800 ring-2 ring-slate-100 dark:ring-slate-700 grayscale-[0.3] hover:grayscale-0",
                "w-20 h-20 md:w-24 md:h-24"
            )}>
                {agent.avatar ? (
                    <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className={cn("w-full h-full flex items-center justify-center p-3", agent.color)}>
                        <Icon className="w-10 h-10 text-white" />
                    </div>
                )}

                {/* Status Indicator Overlay */}
                {isActive && (
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                        {emotion === 'thinking' && <span className="text-2xl">🤔</span>}
                        {emotion === 'arguing' && <span className="text-2xl">☝️</span>}
                        {emotion === 'agreeing' && <span className="text-2xl">✅</span>}
                    </div>
                )}
            </div>

            {/* Name Badge */}
            <div className={cn(
                "mt-2 px-3 py-1 rounded-full text-[10px] font-bold shadow-lg whitespace-nowrap backdrop-blur-md border transition-colors",
                isActive
                    ? "bg-primary text-primary-foreground border-primary/20"
                    : "bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
            )}>
                {agent.name}
            </div>

            {/* Thinking Bubble */}
            {isActive && emotion === "thinking" && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 10, x: -10 }}
                    animate={{ opacity: 1, scale: 1, y: -30, x: 10 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute -top-10 -right-4 bg-white dark:bg-slate-800 px-4 py-2 rounded-2xl rounded-bl-none shadow-xl border border-border/50 text-xs font-medium z-30 flex items-center gap-2"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    Thinking...
                </motion.div>
            )}
        </motion.div>
    );
}
