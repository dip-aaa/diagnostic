"use client";

import { motion } from "framer-motion";
import { Agent } from "@/config/debate-config";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
    agent: Agent;
    message: string;
    isTyping?: boolean;
}

export default function ChatBubble({ agent, message, isTyping }: ChatBubbleProps) {
    const Icon = agent.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex gap-3 mb-4"
        >
            <div className={cn("p-2 rounded-full h-10 w-10 flex-shrink-0 text-white", agent.color)}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{agent.name}</span>
                    <span className="text-xs text-muted-foreground">{agent.specialty}</span>
                </div>
                <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm border">
                    {isTyping ? (
                        <div className="flex gap-1">
                            <motion.span
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                className="w-2 h-2 bg-muted-foreground rounded-full"
                            />
                            <motion.span
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                className="w-2 h-2 bg-muted-foreground rounded-full"
                            />
                            <motion.span
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                className="w-2 h-2 bg-muted-foreground rounded-full"
                            />
                        </div>
                    ) : (
                        <p className="text-sm leading-relaxed">{message}</p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
