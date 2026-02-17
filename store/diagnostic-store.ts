import { create } from 'zustand';

export interface SymptomData {
    symptoms: string[];
    activities: string[];
    labTests: { name: string; value: string }[];
}

export interface DiagnosisResult {
    name: string;
    probability: number;
}

export interface PhaseResult {
    phase: number;
    diagnoses: DiagnosisResult[];
    confidence: number;
    suggestedTests: string[];
}

interface DiagnosticState {
    currentPhase: number;
    symptomData: SymptomData;
    phaseResults: PhaseResult[];
    isDebating: boolean;
    setSymptomData: (data: SymptomData) => void;
    addLabTests: (tests: { name: string; value: string }[]) => void;
    startDebate: () => void;
    completePhase: (result: PhaseResult) => void;
    nextPhase: () => void;
    reset: () => void;
}

const initialSymptomData: SymptomData = {
    symptoms: [],
    activities: [],
    labTests: [],
};

export const useDiagnosticStore = create<DiagnosticState>((set) => ({
    currentPhase: 1,
    symptomData: initialSymptomData,
    phaseResults: [],
    isDebating: false,
    setSymptomData: (data) => set({ symptomData: data }),
    startDebate: () => set({ isDebating: true }),
    completePhase: (result) =>
        set((state) => ({
            phaseResults: [...state.phaseResults, result],
            isDebating: false,
        })),
    addLabTests: (newTests) =>
        set((state) => ({
            symptomData: {
                ...state.symptomData,
                labTests: [...state.symptomData.labTests, ...newTests],
            },
        })),
    nextPhase: () =>
        set((state) => ({
            currentPhase: state.currentPhase + 1,
        })),
    reset: () =>
        set({
            currentPhase: 1,
            symptomData: initialSymptomData,
            phaseResults: [],
            isDebating: false,
        }),
}));
