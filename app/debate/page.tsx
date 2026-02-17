"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useDiagnosticStore } from "@/store/diagnostic-store";
import { agents, phaseDebates, DebateMessage } from "@/config/debate-config";
import { phaseData } from "@/config/phase-data";
import AuthGuard from "@/components/auth-guard";
import AgentCard from "@/components/agent-card";
import ChatBubble from "@/components/chat-bubble";
import PhaseProgress from "@/components/phase-progress";
import ThemeToggle from "@/components/theme-toggle";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DisplayedMessage extends DebateMessage {
    agentName: string;
    agentIcon: any;
    agentColor: string;
    agentSpecialty: string;
}

export default function DebatePage() {
    const router = useRouter();
    const { currentPhase, completePhase } = useDiagnosticStore();
    const [messages, setMessages] = useState<DisplayedMessage[]>([]);
    const [activeAgentId, setActiveAgentId] = useState<string | null>(null);
    const [agentEmotions, setAgentEmotions] = useState<Record<string, "thinking" | "arguing" | "agreeing" | "neutral">>({});
    const [isComplete, setIsComplete] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const currentDebate = phaseDebates.find((d) => d.phase === currentPhase);
        if (!currentDebate) {
            router.push("/dashboard");
            return;
        }

        let timeoutIds: NodeJS.Timeout[] = [];
        let cumulativeDelay = 0;

        currentDebate.messages.forEach((msg, index) => {
            cumulativeDelay += msg.delay;

            const timeoutId = setTimeout(() => {
                const agent = agents.find((a) => a.id === msg.agentId);
                if (!agent) return;

                setActiveAgentId(msg.agentId);
                setAgentEmotions((prev) => ({
                    ...prev,
                    [msg.agentId]: msg.emotion || "neutral",
                }));

                // Show typing/active state then add message
                setMessages((prev) => [
                    ...prev,
                    {
                        ...msg,
                        agentName: agent.name,
                        agentIcon: agent.icon,
                        agentColor: agent.color,
                        agentSpecialty: agent.specialty,
                    },
                ]);

                setTimeout(() => {
                    setActiveAgentId(null);
                }, 1500);

                // Mark as complete after last message
                if (index === currentDebate.messages.length - 1) {
                    setTimeout(() => {
                        setIsComplete(true);
                        const phaseResult = phaseData.find((p) => p.phase === currentPhase);
                        if (phaseResult) {
                            completePhase({
                                phase: currentPhase,
                                diagnoses: phaseResult.diagnoses,
                                confidence: phaseResult.confidence,
                                suggestedTests: phaseResult.suggestedTests,
                            });
                        }
                    }, 2000);
                }
            }, cumulativeDelay);

            timeoutIds.push(timeoutId);
        });

        return () => {
            timeoutIds.forEach((id) => clearTimeout(id));
        };
    }, [currentPhase, completePhase, router]);

    // Calculate positions for circular table
    const getAgentPosition = (index: number, total: number) => {
        const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // Start from top (-90deg)
        const radius = 200; // Reduced radius to fit better in container
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return { x, y };
    };

    return (
        <AuthGuard>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100 dark:from-slate-950 dark:via-violet-950/20 dark:to-cyan-950/10 font-sans text-slate-900 dark:text-slate-50 flex flex-col transition-colors duration-500">

                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                            opacity: [0.03, 0.05, 0.03]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            rotate: [90, 0, 90],
                            opacity: [0.05, 0.03, 0.05]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-3xl"
                    />
                </div>

                {/* Header */}
                <header className="fixed w-full z-50">
                    {/* Backdrop blur layer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/70 to-white/80 dark:from-slate-900/80 dark:via-slate-900/70 dark:to-slate-900/80 backdrop-blur-2xl border-b border-slate-200/60 dark:border-slate-700/60"></div>

                    <div className="container mx-auto px-6 py-3 relative">
                        <div className="flex items-center justify-between">
                            {/* Left: Logo & Title */}
                            <div className="flex items-center gap-4">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative group"
                                >
                                    {/* Animated particles around logo */}
                                    <div className="absolute inset-0 -z-10">
                                        <motion.div
                                            animate={{
                                                rotate: 360,
                                                scale: [1, 1.1, 1]
                                            }}
                                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-violet-500/20 rounded-2xl blur-xl"
                                        />
                                    </div>

                                    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-violet-600 to-violet-700 text-white shadow-xl shadow-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/40 transition-all duration-300">
                                        <Activity className="h-7 w-7" />
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/0 to-white/20"></div>
                                    </div>
                                </motion.div>

                                <div className="flex flex-col">
                                    <h1 className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-primary to-violet-600 dark:from-slate-100 dark:via-primary dark:to-violet-400">
                                        Diagnostic Council
                                    </h1>
                                    <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                                        AI-Powered Medical Analysis
                                    </p>
                                </div>
                            </div>

                            {/* Right: Theme Toggle & Phase Progress */}
                            <div className="hidden lg:flex items-center gap-4">
                                <ThemeToggle />
                                <PhaseProgress currentPhase={currentPhase} />
                            </div>
                        </div>

                        {/* Mobile: Theme Toggle & Phase Progress */}
                        <div className="lg:hidden mt-3 flex items-center justify-between gap-4">
                            <PhaseProgress currentPhase={currentPhase} />
                            <ThemeToggle />
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 container mx-auto px-4 pt-24 lg:pt-20 pb-6 flex flex-col lg:flex-row gap-6 relative z-10">

                    {/* Round Table Area - Fixed Height, No Scroll */}
                    <div className="flex-1 relative flex items-center justify-center min-h-[650px] h-[650px] lg:h-[calc(100vh-8rem)] bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-800/50 order-2 lg:order-1 overflow-hidden p-8 lg:p-12">

                        {/* Floor Texture/Effect */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent z-0 opacity-50" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] z-0 pointer-events-none" />

                        {/* Central Table */}
                        <div className="relative z-10 w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 shadow-[0_0_80px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_0_100px_-20px_rgba(139,92,246,0.4)] flex items-center justify-center border-8 border-white/60 dark:border-slate-700/60 backdrop-blur-md">
                            {/* Central Hologram */}
                            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-slate-200/80 to-slate-300/80 dark:from-slate-900/90 dark:to-slate-800/90 flex items-center justify-center overflow-hidden border-2 border-white/30 dark:border-white/10 shadow-inner">
                                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(139,92,246,0.3)_360deg)] animate-[spin_5s_linear_infinite] opacity-40" />
                                <div className="text-center p-4 lg:p-6 relative z-20">
                                    <h2 className="text-primary font-bold text-xl lg:text-2xl tracking-[0.2em] uppercase mb-1 lg:mb-2 drop-shadow-lg">Analysis</h2>
                                    <p className="text-muted-foreground text-xs lg:text-sm uppercase tracking-widest mb-3 lg:mb-4 font-semibold">Phase {currentPhase}</p>
                                    {!isComplete && (
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full animate-pulse"></div>
                                            <Loader2 className="w-8 h-8 lg:w-10 lg:h-10 text-primary animate-spin relative z-10 mx-auto drop-shadow-lg" />
                                        </div>
                                    )}
                                    {isComplete && <span className="text-emerald-500 text-3xl lg:text-4xl mt-2 block drop-shadow-lg animate-bounce">✓</span>}
                                </div>
                            </div>
                        </div>

                        {/* Agents around the table */}
                        {agents.slice(0, 5).map((agent, index) => {
                            const { x, y } = getAgentPosition(index, 5);
                            return (
                                <div
                                    key={agent.id}
                                    className="absolute z-20 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                                    style={{
                                        transform: `translate(${x}px, ${y}px)`,
                                    }}
                                >
                                    <AgentCard
                                        agent={agent}
                                        emotion={agentEmotions[agent.id] || "neutral"}
                                        isActive={activeAgentId === agent.id}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Chat/Debate Log Panel */}
                    <Card className="w-full lg:w-96 h-[400px] lg:h-[calc(100vh-8rem)] bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-slate-200/50 dark:border-slate-800/50 shadow-2xl flex flex-col order-1 lg:order-2 rounded-3xl overflow-hidden">
                        <CardContent className="p-0 flex-1 flex flex-col h-full">
                            <div className="p-5 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-primary/10 to-violet-500/10">
                                <h2 className="font-bold text-lg flex items-center gap-2">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                    </span>
                                    Live Transcript
                                </h2>
                                <p className="text-xs text-muted-foreground mt-1">Real-time AI deliberation</p>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-3 p-5 scroll-smooth">
                                <AnimatePresence initial={false}>
                                    {messages.map((msg, index) => {
                                        const agent = agents.find((a) => a.id === msg.agentId);
                                        if (!agent) return null;
                                        return (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/80 dark:to-slate-900/80 p-4 rounded-2xl rounded-tl-sm border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${agent.color.replace('bg-', 'bg-').replace('500', '500/20 text-') + agent.color.replace('bg-', '')}`}>
                                                        {agent.name}
                                                    </span>
                                                    <span className="text-[9px] text-muted-foreground uppercase tracking-wide">{agent.specialty}</span>
                                                </div>
                                                <p className="text-sm leading-relaxed text-foreground/90">{msg.message}</p>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                                <div ref={messagesEndRef} />
                            </div>

                            {/* View Results Button */}
                            <AnimatePresence>
                                {isComplete && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-5 bg-gradient-to-r from-primary/5 to-violet-500/5 backdrop-blur-sm border-t border-slate-200/50 dark:border-slate-800/50"
                                    >
                                        <Button
                                            onClick={() => router.push("/results")}
                                            className="w-full bg-gradient-to-r from-primary to-violet-600 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] text-white h-12 rounded-xl text-base font-bold transition-all"
                                        >
                                            View Final Diagnosis <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </AuthGuard>
    );
}
