"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useDiagnosticStore } from "@/store/diagnostic-store";
import { phaseData } from "@/config/phase-data";
import AuthGuard from "@/components/auth-guard";
import DiagnosisCard from "@/components/diagnosis-card";
import PhaseProgress from "@/components/phase-progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/theme-toggle";
import { Activity, Brain, ArrowRight, CheckCircle2, AlertCircle, BarChart3, Microscope } from "lucide-react";
import ConfidenceGauge from "@/components/visualizations/confidence-gauge";
import LikelihoodChart from "@/components/visualizations/likelihood-chart";

export default function ResultsPage() {
    const router = useRouter();
    const { currentPhase, phaseResults, nextPhase, reset } = useDiagnosticStore();

    const currentResult = phaseResults[phaseResults.length - 1];
    const currentPhaseData = phaseData.find((p) => p.phase === currentPhase);

    if (!currentResult || !currentPhaseData) {
        router.push("/dashboard");
        return null;
    }

    const isHighConfidence = currentResult.confidence >= 75;
    const isFinalPhase = currentPhase >= 5;

    const handleNextPhase = () => {
        // Navigate to intermediate lab input step instead of directly to debate
        router.push("/lab-input");
    };

    const handleFinish = () => {
        reset();
        router.push("/dashboard");
    };

    return (
        <AuthGuard>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-50 transition-colors duration-500 overflow-x-hidden">

                {/* Background Pattern - Tech Grid */}
                <div className="fixed inset-0 pointer-events-none opacity-40 dark:opacity-20 flex bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-blue-50/80 via-white/50 to-cyan-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"></div>

                {/* Header */}
                <header className="fixed w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 supports-[backdrop-filter]:bg-white/60">
                    <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                                className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 shadow-lg shadow-blue-500/20"
                            >
                                <Activity className="h-5 w-5 text-white" />
                            </motion.div>
                            <div>
                                <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                                    Diagnostic Results
                                </h1>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                    AI-Powered Analysis
                                </p>
                            </div>
                        </div>
                        <ThemeToggle />
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-4 pt-24 pb-12 max-w-6xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                    >
                        {/* Top: Phase Progress (Full Width) */}
                        <div className="lg:col-span-12">
                            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-200/60 dark:border-slate-800/60 p-6 shadow-sm">
                                <PhaseProgress currentPhase={currentPhase} />
                            </div>
                        </div>

                        {/* Left Column: visualizations & Key Stats (7 cols) */}
                        <div className="lg:col-span-7 space-y-6">

                            {/* Confidence Gauge Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-violet-500/5 pointer-events-none" />

                                <div className="p-8 flex flex-col items-center">
                                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 mb-6 flex items-center gap-2">
                                        <Brain className="w-6 h-6 text-blue-500" />
                                        Confidence Analysis
                                    </h2>

                                    <ConfidenceGauge value={currentResult.confidence} size={320} />

                                    <div className="mt-8 flex gap-4 w-full">
                                        <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 text-center border border-slate-100 dark:border-slate-700/50">
                                            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Phase</div>
                                            <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{currentPhase} / 5</div>
                                        </div>
                                        <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 text-center border border-slate-100 dark:border-slate-700/50">
                                            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Status</div>
                                            <div className={`text-xl font-bold ${isHighConfidence ? 'text-emerald-500' : 'text-amber-500'}`}>
                                                {isHighConfidence ? 'Complete' : 'Analyzing'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Data Visualization: Likelihood Chart */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg p-6 relative overflow-hidden"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5 text-indigo-500" />
                                        Likelihood Distribution
                                    </h3>
                                </div>
                                <LikelihoodChart data={currentResult.diagnoses} />
                            </motion.div>

                        </div>

                        {/* Right Column: Details & Actions (5 cols) */}
                        <div className="lg:col-span-5 space-y-6">

                            {/* Diagnosis List */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold px-1 flex items-center gap-2">
                                    <Microscope className="w-5 h-5 text-teal-500" />
                                    Top Diagnoses
                                </h3>
                                {currentResult.diagnoses.map((diagnosis, index) => (
                                    <DiagnosisCard
                                        key={diagnosis.name}
                                        name={diagnosis.name}
                                        probability={diagnosis.probability}
                                        index={index}
                                    />
                                ))}
                            </div>

                            {/* Recommendations / Next Steps */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 p-6"
                            >
                                {currentPhaseData.suggestedTests.length > 0 && (
                                    <div className="mb-6">
                                        <h4 className="font-semibold mb-3 flex items-center gap-2 text-indigo-900 dark:text-indigo-200">
                                            <AlertCircle className="w-5 h-5 text-indigo-500" />
                                            Suggested Tests
                                        </h4>
                                        <ul className="space-y-2">
                                            {currentPhaseData.suggestedTests.map((test, index) => (
                                                <li key={index} className="text-sm bg-white/50 dark:bg-slate-900/50 p-2 rounded-lg text-indigo-800 dark:text-indigo-300 flex items-center gap-2 border border-indigo-100 dark:border-indigo-900/30">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                                    {test}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {currentPhaseData.recommendation && (
                                    <div>
                                        <h4 className="font-semibold mb-3 flex items-center gap-2 text-emerald-900 dark:text-emerald-200">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                            Recommendation
                                        </h4>
                                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white/50 dark:bg-slate-900/50 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                                            {currentPhaseData.recommendation}
                                        </p>
                                    </div>
                                )}
                            </motion.div>

                            {/* Main Actions */}
                            <div className="pt-4">
                                {!isFinalPhase && !isHighConfidence ? (
                                    <Button
                                        onClick={handleNextPhase}
                                        size="lg"
                                        className="w-full h-14 text-lg shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0"
                                    >
                                        Proceed to Next Phase
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleFinish}
                                        size="lg"
                                        className="w-full h-14 text-lg shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 border-0"
                                    >
                                        <CheckCircle2 className="mr-2 w-5 h-5" />
                                        Complete Diagnosis
                                    </Button>
                                )}
                                {!isFinalPhase && !isHighConfidence && (
                                    <p className="text-center text-xs text-slate-400 mt-3">
                                        Confidence below 75% recommends further analysis
                                    </p>
                                )}
                            </div>

                        </div>
                    </motion.div>
                </main>
            </div>
        </AuthGuard>
    );
}
