import { Brain, Heart, Wind, Microscope, Pill, Stethoscope } from "lucide-react";

export interface Agent {
    id: string;
    name: string;
    specialty: string;
    icon: any;
    color: string;
    avatar: string;
}

export interface DebateMessage {
    agentId: string;
    message: string;
    delay: number;
    emotion?: "thinking" | "arguing" | "agreeing" | "neutral";
}

export interface PhaseDebate {
    phase: number;
    messages: DebateMessage[];
}

export const agents: Agent[] = [
    {
        id: "infection",
        name: "Dr. Viral",
        specialty: "Infection Expert",
        icon: Microscope,
        color: "bg-red-500",
        avatar: "/assets/doctor_avatar_infection.png",
    },
    {
        id: "respiratory",
        name: "Dr. Breath",
        specialty: "Lung Specialist",
        icon: Wind,
        color: "bg-blue-500",
        avatar: "/assets/doctor_avatar_respiratory.png",
    },
    {
        id: "cardio",
        name: "Dr. Heart",
        specialty: "Cardiologist",
        icon: Heart,
        color: "bg-pink-500",
        avatar: "/assets/doctor_avatar_cardio.png",
    },
    {
        id: "neuro",
        name: "Dr. Mind",
        specialty: "Neurologist",
        icon: Brain,
        color: "bg-purple-500",
        avatar: "/assets/doctor_avatar_neuro.png",
    },
    {
        id: "general",
        name: "Dr. Care",
        specialty: "General Practitioner",
        icon: Stethoscope,
        color: "bg-green-500",
        avatar: "/assets/doctor_avatar_general.png",
    },
    {
        id: "pharma",
        name: "Dr. Remedy",
        specialty: "Pharmacologist",
        icon: Pill,
        color: "bg-orange-500",
        avatar: "/assets/doctor_avatar_pharma.png",
    },
];

export const phaseDebates: PhaseDebate[] = [
    {
        phase: 1,
        messages: [
            {
                agentId: "infection",
                message: "Looking at the symptoms, I see classic signs of a viral infection. The fever and body aches are particularly telling.",
                delay: 1000,
                emotion: "thinking",
            },
            {
                agentId: "respiratory",
                message: "I agree with the viral hypothesis, but the respiratory symptoms suggest we should consider upper respiratory tract involvement.",
                delay: 2000,
                emotion: "agreeing",
            },
            {
                agentId: "general",
                message: "The combination of symptoms is quite common. We're likely looking at a common cold or flu, but we need to differentiate.",
                delay: 3000,
                emotion: "neutral",
            },
            {
                agentId: "neuro",
                message: "The headache could be secondary to the infection, but we shouldn't rule out other causes entirely.",
                delay: 4000,
                emotion: "thinking",
            },
            {
                agentId: "infection",
                message: "Based on the symptom cluster, I'd estimate 40% probability for common cold, 30% for influenza.",
                delay: 5000,
                emotion: "neutral",
            },
            {
                agentId: "pharma",
                message: "If it's viral, symptomatic treatment would be appropriate. However, we should monitor for bacterial complications.",
                delay: 6000,
                emotion: "agreeing",
            },
            {
                agentId: "respiratory",
                message: "I'd also consider allergic rhinitis at about 20% probability, especially if there's seasonal exposure.",
                delay: 7000,
                emotion: "arguing",
            },
            {
                agentId: "general",
                message: "Good point. We should recommend some additional tests to narrow this down further.",
                delay: 8000,
                emotion: "agreeing",
            },
        ],
    },
    {
        phase: 2,
        messages: [
            {
                agentId: "infection",
                message: "With the additional context, I'm now leaning more towards influenza - about 45% probability.",
                delay: 1000,
                emotion: "thinking",
            },
            {
                agentId: "respiratory",
                message: "The respiratory pattern is consistent with flu. I'd put it at 50% now.",
                delay: 2000,
                emotion: "agreeing",
            },
            {
                agentId: "cardio",
                message: "I've been monitoring the vital signs implications. Nothing concerning from a cardiac perspective.",
                delay: 3000,
                emotion: "neutral",
            },
            {
                agentId: "neuro",
                message: "The headache severity and pattern align with systemic viral infection rather than primary neurological cause.",
                delay: 4000,
                emotion: "agreeing",
            },
            {
                agentId: "general",
                message: "The timeline and progression support the flu diagnosis. Common cold probability dropping to 25%.",
                delay: 5000,
                emotion: "thinking",
            },
            {
                agentId: "pharma",
                message: "If we confirm influenza, early antiviral treatment could be beneficial within the first 48 hours.",
                delay: 6000,
                emotion: "neutral",
            },
            {
                agentId: "infection",
                message: "Agreed. Let's recommend a rapid flu test to confirm our hypothesis.",
                delay: 7000,
                emotion: "agreeing",
            },
        ],
    },
    {
        phase: 3,
        messages: [
            {
                agentId: "respiratory",
                message: "The pattern is becoming clearer. I'm now 60% confident it's influenza.",
                delay: 1000,
                emotion: "thinking",
            },
            {
                agentId: "infection",
                message: "I concur. The symptom progression over time is textbook influenza. 55% confidence here.",
                delay: 2000,
                emotion: "agreeing",
            },
            {
                agentId: "general",
                message: "Common cold is now at 20%. The severity and duration don't match typical cold presentation.",
                delay: 3000,
                emotion: "neutral",
            },
            {
                agentId: "neuro",
                message: "Neurological symptoms remain secondary. No primary concern from my end.",
                delay: 4000,
                emotion: "agreeing",
            },
            {
                agentId: "pharma",
                message: "Treatment plan should include antivirals, antipyretics, and supportive care.",
                delay: 5000,
                emotion: "neutral",
            },
            {
                agentId: "cardio",
                message: "Patient should monitor for any chest pain or breathing difficulties as complications.",
                delay: 6000,
                emotion: "thinking",
            },
            {
                agentId: "infection",
                message: "One more round of analysis should give us high confidence in the diagnosis.",
                delay: 7000,
                emotion: "neutral",
            },
        ],
    },
    {
        phase: 4,
        messages: [
            {
                agentId: "infection",
                message: "After thorough analysis, I'm 65% confident this is influenza A or B.",
                delay: 1000,
                emotion: "thinking",
            },
            {
                agentId: "respiratory",
                message: "The respiratory involvement strongly supports this. 65% confidence from me as well.",
                delay: 2000,
                emotion: "agreeing",
            },
            {
                agentId: "general",
                message: "All signs point to flu. Common cold now at 15%, allergic rhinitis at 10%.",
                delay: 3000,
                emotion: "agreeing",
            },
            {
                agentId: "pharma",
                message: "I recommend starting oseltamivir if within 48 hours of symptom onset.",
                delay: 4000,
                emotion: "neutral",
            },
            {
                agentId: "neuro",
                message: "Monitor for any neurological complications, though they're rare.",
                delay: 5000,
                emotion: "neutral",
            },
            {
                agentId: "cardio",
                message: "Cardiovascular monitoring recommended for high-risk patients.",
                delay: 6000,
                emotion: "thinking",
            },
            {
                agentId: "infection",
                message: "Let's proceed to final confirmation with diagnostic testing.",
                delay: 7000,
                emotion: "agreeing",
            },
        ],
    },
    {
        phase: 5,
        messages: [
            {
                agentId: "infection",
                message: "Final analysis complete. Influenza is the primary diagnosis at 70% confidence.",
                delay: 1000,
                emotion: "neutral",
            },
            {
                agentId: "respiratory",
                message: "Agreed. The respiratory pattern, fever, and systemic symptoms all align. 70% confidence.",
                delay: 2000,
                emotion: "agreeing",
            },
            {
                agentId: "general",
                message: "This is a clear case. Common cold at 12%, other viral infections at 10%.",
                delay: 3000,
                emotion: "agreeing",
            },
            {
                agentId: "pharma",
                message: "Treatment protocol established: antivirals, symptom management, rest, and hydration.",
                delay: 4000,
                emotion: "neutral",
            },
            {
                agentId: "neuro",
                message: "No neurological concerns. Headache should resolve with primary treatment.",
                delay: 5000,
                emotion: "agreeing",
            },
            {
                agentId: "cardio",
                message: "Cardiovascular system stable. Standard monitoring sufficient.",
                delay: 6000,
                emotion: "agreeing",
            },
            {
                agentId: "infection",
                message: "Consensus reached. Recommend confirmation with rapid influenza diagnostic test.",
                delay: 7000,
                emotion: "agreeing",
            },
        ],
    },
];
