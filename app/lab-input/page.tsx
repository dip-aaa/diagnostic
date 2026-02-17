"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useDiagnosticStore } from "@/store/diagnostic-store";
import AuthGuard from "@/components/auth-guard";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Beaker, Plus, X, ArrowRight, TestTube2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LabInputPage() {
    const router = useRouter();
    const { addLabTests, nextPhase, currentPhase } = useDiagnosticStore();

    const [labTests, setLabTests] = useState<{ name: string; value: string }[]>([]);
    const [testName, setTestName] = useState("");
    const [testValue, setTestValue] = useState("");

    const handleAddLabTest = () => {
        if (testName && testValue) {
            setLabTests([...labTests, { name: testName, value: testValue }]);
            setTestName("");
            setTestValue("");
        }
    };

    const handleRemoveLabTest = (index: number) => {
        setLabTests(labTests.filter((_, i) => i !== index));
    };

    const handleContinue = () => {
        // Add tests if any were entered
        if (labTests.length > 0) {
            addLabTests(labTests);
        }

        // Advance phase and go to debate
        nextPhase();
        router.push("/debate");
    };

    return (
        <AuthGuard>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-50 transition-colors duration-500 overflow-x-hidden">

                {/* Background Pattern */}
                <div className="fixed inset-0 pointer-events-none opacity-40 dark:opacity-20 flex bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-blue-50/80 via-white/50 to-cyan-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"></div>

                {/* Header */}
                <header className="fixed w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 supports-[backdrop-filter]:bg-white/60">
                    <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 shadow-lg shadow-blue-500/20">
                                <TestTube2 className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                                    Additional Lab Data
                                </h1>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                    Refining Diagnosis for Phase {currentPhase + 1}
                                </p>
                            </div>
                        </div>
                        <ThemeToggle />
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-4 pt-32 pb-12 max-w-2xl relative z-10 flex flex-col items-center">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full space-y-6"
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 mb-2">
                                New Lab Findings?
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                                Provide any new test results requested by the AI or relevant to the evolving diagnosis. You can skip this if you have no new data.
                            </p>
                        </div>

                        <Card className="border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-xl overflow-hidden">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Beaker className="w-5 h-5 text-blue-500" />
                                    Enter Lab Result
                                </CardTitle>
                                <CardDescription>
                                    e.g., "Hemoglobin: 12.5 g/dL" or "MRI: Normal"
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Test Name (e.g. WBC)"
                                        value={testName}
                                        onChange={(e) => setTestName(e.target.value)}
                                        className="flex-1 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                                    />
                                    <Input
                                        placeholder="Value/Result"
                                        value={testValue}
                                        onChange={(e) => setTestValue(e.target.value)}
                                        className="flex-1 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                                        onKeyDown={(e) => e.key === "Enter" && handleAddLabTest()}
                                    />
                                    <Button onClick={handleAddLabTest} size="icon" className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white">
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>

                                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 mt-4">
                                    <AnimatePresence mode="popLayout">
                                        {labTests.map((test, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 10 }}
                                                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                        <TestTube2 className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-sm">{test.name}</div>
                                                        <div className="text-xs text-slate-500 dark:text-slate-400">{test.value}</div>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleRemoveLabTest(index)}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    {labTests.length === 0 && (
                                        <div className="text-center py-8 text-slate-400 dark:text-slate-500 italic text-sm border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-lg">
                                            No new tests added yet
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Button
                            onClick={handleContinue}
                            size="lg"
                            className="w-full h-14 text-lg shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0"
                        >
                            {labTests.length > 0 ? `Submit ${labTests.length} Tests & Continue` : "Skip & Continue to Debate"}
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>

                    </motion.div>
                </main>
            </div>
        </AuthGuard>
    );
}
