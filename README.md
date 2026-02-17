# AI Diagnostic Assistant

A modern, minimal, and professional diagnostic web app built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS v3**, and **shadcn/ui**.

## Features

- 🔐 **Temporary Authentication** - Login/Signup with client-side session management
- 📝 **Symptom Input** - Multi-tag input for symptoms, activities, and lab results
- 🤖 **AI Debate Arena** - 6 specialized AI agents debating diagnoses in real-time
- 📊 **Multi-Phase Analysis** - Up to 5 diagnostic phases with evolving probabilities
- 🎯 **Belief Agent Results** - Confidence-based diagnosis with test recommendations
- ✨ **Smooth Animations** - Framer Motion powered transitions and interactions
- 📱 **Fully Responsive** - Works seamlessly on desktop and mobile

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or navigate to the project directory:
```bash
cd diagnostic-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
diagnostic-app/
├── app/                      # Next.js App Router pages
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── dashboard/           # Symptom input dashboard
│   ├── debate/              # AI debate arena
│   ├── results/             # Diagnosis results
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home redirect
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── agent-card.tsx       # AI agent display
│   ├── auth-guard.tsx       # Route protection
│   ├── chat-bubble.tsx      # Debate messages
│   ├── diagnosis-card.tsx   # Diagnosis display
│   ├── phase-progress.tsx   # Progress indicator
│   └── tag-input.tsx        # Multi-tag input
├── config/                  # Configuration files
│   ├── debate-config.ts     # AI agents & scripts
│   └── phase-data.ts        # Phase probabilities
├── store/                   # Zustand stores
│   ├── auth-store.ts        # Authentication state
│   └── diagnostic-store.ts  # Diagnostic flow state
├── lib/                     # Utilities
│   └── utils.ts             # Helper functions
└── public/                  # Static assets
```

## How It Works

### 1. Authentication
- Users can login or signup with any credentials (demo mode)
- Session is stored in localStorage
- Protected routes redirect to login if not authenticated

### 2. Symptom Input
- Add symptoms using tag input with autocomplete
- Enter recent activities
- Optionally add lab test results
- Click "Start AI Diagnosis" to begin

### 3. AI Debate
- 6 specialized AI agents analyze the symptoms
- Scripted conversation simulates real-time debate
- Agents show emotion states (thinking, arguing, agreeing)
- Messages appear with timed delays for realistic flow

### 4. Results & Multi-Phase
- Belief Agent shows diagnosis probabilities
- Confidence level determines next steps:
  - **< 75% confidence**: Proceed to next phase for deeper analysis
  - **≥ 75% confidence**: Complete diagnosis
- Up to 5 phases with evolving probabilities
- Suggested tests appear when uncertainty is high

## AI Agents

1. **Dr. Viral** - Infection Expert
2. **Dr. Breath** - Lung Specialist
3. **Dr. Heart** - Cardiologist
4. **Dr. Mind** - Neurologist
5. **Dr. Care** - General Practitioner
6. **Dr. Remedy** - Pharmacologist

## Customization

### Adding New Debate Scripts
Edit `config/debate-config.ts` to add or modify agent conversations.

### Adjusting Phase Data
Edit `config/phase-data.ts` to change diagnosis probabilities and test recommendations.

### Styling
- Theme colors: `app/globals.css` (CSS variables)
- Tailwind config: `tailwind.config.ts`

## Build for Production

```bash
npm run build
npm start
```

## Notes

- This is a **demo application** for hackathon purposes
- No real backend or AI integration
- All debates are pre-scripted
- Authentication is temporary and client-side only


