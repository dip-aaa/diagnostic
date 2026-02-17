import { DiagnosisResult } from "@/store/diagnostic-store";

export interface PhaseData {
    phase: number;
    diagnoses: DiagnosisResult[];
    confidence: number;
    suggestedTests: string[];
    recommendation?: string;
}

export const phaseData: PhaseData[] = [
    {
        phase: 1,
        diagnoses: [
            { name: "Common Cold", probability: 40 },
            { name: "Influenza", probability: 30 },
            { name: "Allergic Rhinitis", probability: 20 },
            { name: "Other Viral Infection", probability: 10 },
        ],
        confidence: 45,
        suggestedTests: [
            "Rapid Influenza Diagnostic Test (RIDT)",
            "Complete Blood Count (CBC)",
            "Allergy Panel",
        ],
    },
    {
        phase: 2,
        diagnoses: [
            { name: "Influenza", probability: 50 },
            { name: "Common Cold", probability: 25 },
            { name: "Allergic Rhinitis", probability: 15 },
            { name: "Other Viral Infection", probability: 10 },
        ],
        confidence: 55,
        suggestedTests: [
            "Rapid Influenza Diagnostic Test (RIDT)",
            "Chest X-ray (if respiratory symptoms worsen)",
        ],
    },
    {
        phase: 3,
        diagnoses: [
            { name: "Influenza", probability: 60 },
            { name: "Common Cold", probability: 20 },
            { name: "Allergic Rhinitis", probability: 12 },
            { name: "Other Viral Infection", probability: 8 },
        ],
        confidence: 65,
        suggestedTests: [
            "Rapid Influenza Diagnostic Test (RIDT)",
            "Throat Culture",
        ],
    },
    {
        phase: 4,
        diagnoses: [
            { name: "Influenza", probability: 65 },
            { name: "Common Cold", probability: 15 },
            { name: "Allergic Rhinitis", probability: 10 },
            { name: "Other Viral Infection", probability: 10 },
        ],
        confidence: 72,
        suggestedTests: [
            "Rapid Influenza Diagnostic Test (RIDT) - Recommended",
        ],
    },
    {
        phase: 5,
        diagnoses: [
            { name: "Influenza", probability: 70 },
            { name: "Common Cold", probability: 12 },
            { name: "Other Viral Infection", probability: 10 },
            { name: "Allergic Rhinitis", probability: 8 },
        ],
        confidence: 80,
        suggestedTests: [],
        recommendation: "Based on comprehensive multi-agent analysis, we recommend confirming with a Rapid Influenza Diagnostic Test. If positive, consider antiviral treatment within 48 hours of symptom onset. Maintain supportive care including rest, hydration, and symptom management.",
    },
];
