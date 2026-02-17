"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useDiagnosticStore } from "@/store/diagnostic-store";
import { useAuthStore } from "@/store/auth-store";
import AuthGuard from "@/components/auth-guard";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Activity, Beaker, LogOut, Plus, X, ArrowRight, ArrowLeft, Sparkles, Check } from "lucide-react";

const symptomSuggestions = [
    "fever", "cough", "headache", "fatigue", "sore throat",
    "runny nose", "body aches", "chills", "nausea", "dizziness"
];

const activitySuggestions = [
    "hiking", "travel", "cold exposure", "contact with sick person",
    "outdoor activities", "swimming", "gym workout", "crowded places"
];

export default function DashboardPage() {
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);
    const { setSymptomData, startDebate } = useDiagnosticStore();

    const [currentStep, setCurrentStep] = useState(0);
    const [symptoms, setSymptoms] = useState<string[]>([]);
    const [activities, setActivities] = useState<string[]>([]);
    const [labTests, setLabTests] = useState<{ name: string; value: string }[]>([]);
    const [testName, setTestName] = useState("");
    const [testValue, setTestValue] = useState("");
    const [symptomInput, setSymptomInput] = useState("");
    const [activityInput, setActivityInput] = useState("");

    const steps = [
        { id: 0, title: "Symptoms", icon: Activity, description: "What are you experiencing?" },
        { id: 1, title: "Activities", icon: Sparkles, description: "Recent context & activities" },
        { id: 2, title: "Lab Data", icon: Beaker, description: "Optional test results" }
    ];

    const handleAddSymptom = (symptom: string) => {
        if (symptom && !symptoms.includes(symptom.toLowerCase())) {
            setSymptoms([...symptoms, symptom.toLowerCase()]);
            setSymptomInput("");
        }
    };

    const handleAddActivity = (activity: string) => {
        if (activity && !activities.includes(activity.toLowerCase())) {
            setActivities([...activities, activity.toLowerCase()]);
            setActivityInput("");
        }
    };

    const handleAddLabTest = () => {
        if (testName && testValue) {
            setLabTests([...labTests, { name: testName, value: testValue }]);
            setTestName("");
            setTestValue("");
        }
    };

    const handleRemoveSymptom = (symptom: string) => {
        setSymptoms(symptoms.filter(s => s !== symptom));
    };

    const handleRemoveActivity = (activity: string) => {
        setActivities(activities.filter(a => a !== activity));
    };

    const handleRemoveLabTest = (index: number) => {
        setLabTests(labTests.filter((_, i) => i !== index));
    };

    const handleNext = () => {
        if (currentStep === 0 && symptoms.length === 0) {
            alert("Please add at least one symptom");
            return;
        }
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleStartDiagnosis = () => {
        if (symptoms.length === 0) {
            alert("Please add at least one symptom");
            return;
        }
        setSymptomData({ symptoms, activities, labTests });
        startDebate();
        router.push("/debate");
    };

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <AuthGuard>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100 dark:from-slate-950 dark:via-violet-950/20 dark:to-cyan-950/10 font-sans text-slate-900 dark:text-slate-50 transition-colors duration-500 relative overflow-hidden">

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
                <header className="fixed w-full z-50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50">
                    <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                                className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-violet-600 text-white shadow-lg shadow-primary/30"
                            >
                                <Activity className="h-5 w-5" />
                            </motion.div>
                            <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-600">AI Diagnostic</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-muted-foreground hidden md:block">
                                {user?.name}
                            </span>
                            <ThemeToggle />
                            <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full">
                                <LogOut className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-4 pt-28 pb-12 max-w-4xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-8"
                    >
                        {/* Header Section */}
                        <div className="text-center space-y-4 mb-12">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-sm"
                            >
                                <Sparkles className="w-3 h-3" />
                                AI-Powered Analysis
                            </motion.div>
                            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-600 to-accent">
                                    Symptom Analysis
                                </span>
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                Share your symptoms and let our advanced AI council provide comprehensive diagnostic insights
                            </p>
                        </div>

                        {/* Step Indicator */}
                        <div className="flex items-center justify-center gap-2 mb-8">
                            {steps.map((step, index) => (
                                <div key={step.id} className="flex items-center">
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            scale: currentStep === index ? 1.1 : 1,
                                        }}
                                        className="relative"
                                    >
                                        <div className={`
                                            w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300
                                            ${currentStep === index
                                                ? 'bg-gradient-to-br from-primary to-violet-600 text-white shadow-lg shadow-primary/40'
                                                : currentStep > index
                                                    ? 'bg-primary/20 text-primary'
                                                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                                            }
                                        `}>
                                            {currentStep > index ? <Check className="w-5 h-5" /> : index + 1}
                                        </div>
                                        {currentStep === index && (
                                            <motion.div
                                                layoutId="activeStep"
                                                className="absolute -inset-1 rounded-full bg-primary/20 -z-10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </motion.div>
                                    {index < steps.length - 1 && (
                                        <div className={`w-12 md:w-20 h-0.5 mx-2 transition-colors duration-300 ${currentStep > index ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'
                                            }`} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Form Card */}
                        <motion.div
                            layout
                            className="relative bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl shadow-slate-900/5 dark:shadow-slate-900/20 overflow-hidden"
                        >
                            {/* Gradient Border Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />

                            <div className="relative p-8 md:p-12">
                                <AnimatePresence mode="wait">
                                    {/* Step 0: Symptoms */}
                                    {currentStep === 0 && (
                                        <motion.div
                                            key="symptoms"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-violet-500/20 text-primary">
                                                    <Activity className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold">Key Symptoms</h2>
                                                    <p className="text-sm text-muted-foreground">What physical or mental sensations are you experiencing?</p>
                                                </div>
                                            </div>

                                            {/* Input Field */}
                                            <div className="relative">
                                                <Input
                                                    value={symptomInput}
                                                    onChange={(e) => setSymptomInput(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            handleAddSymptom(symptomInput);
                                                        }
                                                    }}
                                                    placeholder="Type a symptom and press Enter..."
                                                    className="h-14 px-6 text-base bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-2xl focus-visible:ring-2 focus-visible:ring-primary/50 transition-all"
                                                />
                                            </div>

                                            {/* Suggestions */}
                                            <div className="space-y-3">
                                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quick Add</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {symptomSuggestions.map((suggestion) => (
                                                        <motion.button
                                                            key={suggestion}
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handleAddSymptom(suggestion)}
                                                            disabled={symptoms.includes(suggestion)}
                                                            className={`
                                                                px-4 py-2 rounded-full text-sm font-medium transition-all
                                                                ${symptoms.includes(suggestion)
                                                                    ? 'bg-primary/20 text-primary cursor-not-allowed'
                                                                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary hover:shadow-md'
                                                                }
                                                            `}
                                                        >
                                                            {symptoms.includes(suggestion) && <Check className="w-3 h-3 inline mr-1" />}
                                                            {suggestion}
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Selected Symptoms */}
                                            {symptoms.length > 0 && (
                                                <div className="space-y-3 pt-4">
                                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Selected ({symptoms.length})</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        <AnimatePresence>
                                                            {symptoms.map((symptom) => (
                                                                <motion.div
                                                                    key={symptom}
                                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                                    animate={{ opacity: 1, scale: 1 }}
                                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                                    className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-violet-600 text-white rounded-full text-sm font-medium shadow-lg shadow-primary/30"
                                                                >
                                                                    <span>{symptom}</span>
                                                                    <button
                                                                        onClick={() => handleRemoveSymptom(symptom)}
                                                                        className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                                                                    >
                                                                        <X className="w-3.5 h-3.5" />
                                                                    </button>
                                                                </motion.div>
                                                            ))}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* Step 1: Activities */}
                                    {currentStep === 1 && (
                                        <motion.div
                                            key="activities"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 text-violet-600 dark:text-violet-400">
                                                    <Sparkles className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold">Context & Activities</h2>
                                                    <p className="text-sm text-muted-foreground">Recent travel, lifestyle changes, or environmental factors</p>
                                                </div>
                                            </div>

                                            {/* Input Field */}
                                            <div className="relative">
                                                <Input
                                                    value={activityInput}
                                                    onChange={(e) => setActivityInput(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            handleAddActivity(activityInput);
                                                        }
                                                    }}
                                                    placeholder="Type an activity and press Enter..."
                                                    className="h-14 px-6 text-base bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-2xl focus-visible:ring-2 focus-visible:ring-violet-500/50 transition-all"
                                                />
                                            </div>

                                            {/* Suggestions */}
                                            <div className="space-y-3">
                                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quick Add</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {activitySuggestions.map((suggestion) => (
                                                        <motion.button
                                                            key={suggestion}
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handleAddActivity(suggestion)}
                                                            disabled={activities.includes(suggestion)}
                                                            className={`
                                                                px-4 py-2 rounded-full text-sm font-medium transition-all
                                                                ${activities.includes(suggestion)
                                                                    ? 'bg-violet-500/20 text-violet-600 dark:text-violet-400 cursor-not-allowed'
                                                                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-400 hover:shadow-md'
                                                                }
                                                            `}
                                                        >
                                                            {activities.includes(suggestion) && <Check className="w-3 h-3 inline mr-1" />}
                                                            {suggestion}
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Selected Activities */}
                                            {activities.length > 0 && (
                                                <div className="space-y-3 pt-4">
                                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Selected ({activities.length})</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        <AnimatePresence>
                                                            {activities.map((activity) => (
                                                                <motion.div
                                                                    key={activity}
                                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                                    animate={{ opacity: 1, scale: 1 }}
                                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                                    className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-lg shadow-violet-500/30"
                                                                >
                                                                    <span>{activity}</span>
                                                                    <button
                                                                        onClick={() => handleRemoveActivity(activity)}
                                                                        className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                                                                    >
                                                                        <X className="w-3.5 h-3.5" />
                                                                    </button>
                                                                </motion.div>
                                                            ))}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* Step 2: Lab Tests */}
                                    {currentStep === 2 && (
                                        <motion.div
                                            key="labtests"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="p-3 rounded-2xl bg-gradient-to-br from-accent/20 to-cyan-500/20 text-accent">
                                                    <Beaker className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold">Lab Data</h2>
                                                    <p className="text-sm text-muted-foreground">Optional: Add any clinical test results you have</p>
                                                </div>
                                            </div>

                                            {/* Input Fields */}
                                            <div className="flex gap-3">
                                                <Input
                                                    placeholder="Test Name (e.g., WBC Count)"
                                                    value={testName}
                                                    onChange={(e) => setTestName(e.target.value)}
                                                    onKeyDown={(e) => e.key === "Enter" && handleAddLabTest()}
                                                    className="h-12 px-5 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl focus-visible:ring-2 focus-visible:ring-accent/50"
                                                />
                                                <Input
                                                    placeholder="Value (e.g., 12.5)"
                                                    value={testValue}
                                                    onChange={(e) => setTestValue(e.target.value)}
                                                    onKeyDown={(e) => e.key === "Enter" && handleAddLabTest()}
                                                    className="h-12 px-5 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl focus-visible:ring-2 focus-visible:ring-accent/50"
                                                />
                                                <Button
                                                    onClick={handleAddLabTest}
                                                    size="icon"
                                                    className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent to-cyan-600 hover:shadow-lg hover:shadow-accent/30 transition-all"
                                                >
                                                    <Plus className="w-5 h-5" />
                                                </Button>
                                            </div>

                                            {/* Lab Tests List */}
                                            {labTests.length > 0 && (
                                                <div className="space-y-3 pt-4">
                                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Added Tests ({labTests.length})</p>
                                                    <div className="space-y-2">
                                                        <AnimatePresence>
                                                            {labTests.map((test, index) => (
                                                                <motion.div
                                                                    key={index}
                                                                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                                                                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                                                                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                                                                    className="group flex items-center justify-between p-4 bg-gradient-to-r from-accent/10 to-cyan-500/10 rounded-xl border border-accent/20 hover:border-accent/40 transition-all"
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                                                        <div>
                                                                            <p className="font-semibold text-sm">{test.name}</p>
                                                                            <p className="text-xs text-muted-foreground">{test.value}</p>
                                                                        </div>
                                                                    </div>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        onClick={() => handleRemoveLabTest(index)}
                                                                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all rounded-lg"
                                                                    >
                                                                        <X className="w-4 h-4" />
                                                                    </Button>
                                                                </motion.div>
                                                            ))}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>
                                            )}

                                            {labTests.length === 0 && (
                                                <div className="text-center py-8 text-muted-foreground">
                                                    <Beaker className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                                    <p className="text-sm">No lab tests added yet. You can skip this step if you don't have any.</p>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Navigation Buttons */}
                                <div className="flex gap-3 mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
                                    {currentStep > 0 && (
                                        <Button
                                            onClick={handleBack}
                                            variant="outline"
                                            className="flex-1 h-12 rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                                        >
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Back
                                        </Button>
                                    )}
                                    {currentStep < steps.length - 1 ? (
                                        <Button
                                            onClick={handleNext}
                                            className="flex-1 h-12 rounded-xl bg-gradient-to-r from-primary to-violet-600 hover:shadow-lg hover:shadow-primary/30 transition-all"
                                        >
                                            Next
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={handleStartDiagnosis}
                                            className="flex-1 h-12 rounded-xl bg-gradient-to-r from-primary via-violet-600 to-accent hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold"
                                        >
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Start AI Analysis
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Info Cards */}
                        <div className="grid md:grid-cols-3 gap-4 mt-8">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                const isActive = currentStep === index;
                                const isCompleted = currentStep > index;

                                return (
                                    <motion.div
                                        key={step.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        className={`
                                            p-4 rounded-2xl border transition-all duration-300
                                            ${isActive
                                                ? 'bg-white/80 dark:bg-slate-900/80 border-primary/50 shadow-lg shadow-primary/10'
                                                : 'bg-white/40 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/50'
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`
                                                p-2 rounded-xl transition-all
                                                ${isActive
                                                    ? 'bg-gradient-to-br from-primary to-violet-600 text-white'
                                                    : isCompleted
                                                        ? 'bg-primary/20 text-primary'
                                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                                }
                                            `}>
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className={`text-sm font-semibold ${isActive ? 'text-primary' : ''}`}>
                                                    {step.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground">{step.description}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </main>
            </div>
        </AuthGuard>
    );
}
