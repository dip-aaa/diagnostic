"use client";

import { motion } from "framer-motion";

interface ConfidenceGaugeProps {
    value: number;
    size?: number;
}

export default function ConfidenceGauge({ value, size = 300 }: ConfidenceGaugeProps) {
    // Clamp value between 0 and 100
    const clampedValue = Math.min(Math.max(value, 0), 100);

    // Calculate rotation (-90deg to +90deg)
    const rotation = (clampedValue / 100) * 180 - 90;

    // Radius for the arcs
    const radius = 120;
    const strokeWidth = 24;
    const center = size / 2;

    // Arc path generator
    const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
        const start = polarToCartesian(x, y, radius, endAngle);
        const end = polarToCartesian(x, y, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        return [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");
    };

    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    // Color logic
    const getColor = (val: number) => {
        if (val >= 75) return "#10b981"; // Emerald
        if (val >= 50) return "#f59e0b"; // Amber
        return "#f97316"; // Orange
    };

    const currentColor = getColor(clampedValue);

    return (
        <div className="relative flex flex-col items-center justify-center">
            {/* SVG Gauge */}
            <svg width={size} height={size / 2 + 40} viewBox={`0 0 ${size} ${size / 2 + 40}`} className="overflow-visible">
                {/* Defs for Gradients */}
                <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Background Arc (Gray) */}
                <path
                    d={describeArc(center, center, radius, -90, 90)}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    className="text-slate-200 dark:text-slate-800"
                />

                {/* Foreground Arc (Colored) - Animated */}
                <motion.path
                    d={describeArc(center, center, radius, -90, ((clampedValue / 100) * 180) - 90)}
                    fill="none"
                    stroke="url(#gaugeGradient)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    filter="url(#glow)"
                />

                {/* Needle */}
                <motion.g
                    initial={{ rotate: -90 }}
                    animate={{ rotate: rotation }}
                    transition={{ type: "spring", stiffness: 50, damping: 10, delay: 0.2 }}
                    style={{ originX: "50%", originY: "50%", x: center, y: center }} // Center origin
                >
                    <motion.polygon
                        points="-4,-20 0,-110 4,-20 0,0" // Needle shape
                        fill={currentColor}
                        filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.3))"
                    />
                    <circle cx="0" cy="0" r="12" fill={currentColor} className="stroke-white dark:stroke-slate-900 stroke-4" />
                </motion.g>

                {/* Ticks */}
                {[0, 25, 50, 75, 100].map((tick) => {
                    const pos = polarToCartesian(center, center, radius + 35, (tick / 100) * 180 - 90);
                    return (
                        <text
                            key={tick}
                            x={pos.x}
                            y={pos.y}
                            fill="currentColor"
                            className="text-xs font-medium text-slate-400 dark:text-slate-500"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                        >
                            {tick}%
                        </text>
                    );
                })}
            </svg>

            {/* Central Text Value */}
            <div className="absolute top-[60%] flex flex-col items-center">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Confidence Score
                </span>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-baseline"
                >
                    <span
                        className="text-5xl font-bold tracking-tighter"
                        style={{ color: currentColor }}
                    >
                        {clampedValue}
                    </span>
                    <span className="text-2xl ml-1 text-slate-400">%</span>
                </motion.div>
            </div>
        </div>
    );
}
