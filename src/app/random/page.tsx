'use client'

import dynamic from 'next/dynamic';
import YearProgressTimer from '@/components/random/YearProgressTimer';
import TimerLocked from '@/components/random/timer-locked';
import NumericKeypad from '@/components/random/numeric-keypad';
import React, { useState } from 'react';
import KiroFace1 from '@/components/random/kiro-face1';
import KiroFace1gi from '@/components/random/kiro-face1gi';
import { useRef } from 'react';

// Client-only components (use dynamic import with ssr: false)
const LiveAgeCalculator = dynamic(() => import('@/components/random/LiveAgeCalculator'), { ssr: false });
const Toggle1 = dynamic(() => import('@/components/random/toggle1'), { ssr: false });
const Toggle1g = dynamic(() => import('@/components/random/toggle1g'), { ssr: false }) as any; // Type assertion to allow props
const Toggle1gi = dynamic(() => import('@/components/random/toggle1gi'), { ssr: false });

// Add a wrapper for full-page demo isolation
function FullPageDemoSandbox({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-[600px] bg-black rounded-lg overflow-auto border-2 border-dashed border-yellow-400 flex items-center justify-center relative">
            {children}
        </div>
    );
}

// Add a sandbox for face widgets
function FaceSandbox({ mode, onToggle, children, label }: { mode: 'dark' | 'light'; onToggle: () => void; children: React.ReactNode; label: string }) {
    return (
        <div className={`w-full h-[300px] rounded-lg overflow-auto border-2 border-dashed border-green-400 flex flex-col items-center justify-center relative p-4 transition-colors duration-300 ${mode === 'dark' ? 'bg-gray-950' : 'bg-gray-100'}`}>
            <div className="mb-2 text-green-400 font-mono text-sm">{label}</div>
            <div className="flex flex-col items-center">
                {children}
                <div className="mt-4 text-black dark:text-white font-mono">Current mode: {mode === 'dark' ? 'Dark' : 'Light'}</div>
                <h3 className={`mt-4 text-xl font-bold ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>Sample Content</h3>
                <p className={`mb-2 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>This content should change color with the theme.</p>
                <button
                    className={`px-4 py-2 rounded font-semibold transition-colors duration-200 ${mode === 'dark' ? 'bg-green-700 text-white hover:bg-green-600' : 'bg-green-200 text-green-900 hover:bg-green-300'}`}
                    onClick={onToggle}
                >
                    Toggle Theme
                </button>
            </div>
        </div>
    );
}

export default function RandomShowcasePage() {
    // For NumericKeypad demo
    const [keypadValue, setKeypadValue] = useState('');
    // For Toggle1g, manage its theme state in the parent for demo purposes
    const [toggle1gMode, setToggle1gMode] = useState<'dark' | 'light'>('dark');
    const handleToggle1gToggle = () => setToggle1gMode(m => (m === 'dark' ? 'light' : 'dark'));

    // For KiroFace1 and KiroFace1gi, track their mode for display
    const [kiroFace1Mode, setKiroFace1Mode] = useState<'dark' | 'light'>('dark');
    const [kiroFace1giMode, setKiroFace1giMode] = useState<'dark' | 'light'>('dark');
    const handleKiroFace1Toggle = () => setKiroFace1Mode(m => (m === 'dark' ? 'light' : 'dark'));
    const handleKiroFace1giToggle = () => setKiroFace1giMode(m => (m === 'dark' ? 'light' : 'dark'));

    return (
        <div className="max-w-3xl mx-auto py-8 space-y-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Random Components Showcase</h1>

            {/* LiveAgeCalculator */}
            <section className="p-4 border rounded-lg bg-gray-900">
                <h2 className="text-xl font-semibold mb-2">LiveAgeCalculator</h2>
                <LiveAgeCalculator />
            </section>

            {/* Toggle1g */}
            <section className="p-4 border rounded-lg bg-gray-900">
                <h2 className="text-xl font-semibold mb-2">Toggle1g</h2>
                <FaceSandbox mode={toggle1gMode} onToggle={handleToggle1gToggle} label="Click the button to toggle light/dark mode for the sandbox. (Toggle1g manages its own theme internally)">
                    <Toggle1g key={toggle1gMode} />
                </FaceSandbox>
            </section>

            {/* KiroFace1 (from Toggle1) */}
            <section className="p-4 border rounded-lg bg-gray-900">
                <h2 className="text-xl font-semibold mb-2">KiroFace1 (from Toggle1)</h2>
                <FaceSandbox mode={kiroFace1Mode} onToggle={handleKiroFace1Toggle} label="Click the face or button to toggle light/dark mode.">
                    <KiroFace1 mode={kiroFace1Mode} onToggle={handleKiroFace1Toggle} />
                </FaceSandbox>
            </section>
            {/* KiroFace1gi (from Toggle1gi) */}
            <section className="p-4 border rounded-lg bg-gray-900">
                <h2 className="text-xl font-semibold mb-2">KiroFace1gi (from Toggle1gi)</h2>
                <FaceSandbox mode={kiroFace1giMode} onToggle={handleKiroFace1giToggle} label="Click the face or button to toggle light/dark mode.">
                    <KiroFace1gi mode={kiroFace1giMode} onToggle={handleKiroFace1giToggle} />
                </FaceSandbox>
            </section>
            <hr className="my-8 border-yellow-400" />

            {/* YearProgressTimer */}
            <section className="p-4 border rounded-lg bg-gray-900">
                <h2 className="text-xl font-semibold mb-2">YearProgressTimer</h2>
                <YearProgressTimer />
            </section>

            {/* TimerLocked */}
            <section className="p-4 border rounded-lg bg-gray-900">
                <h2 className="text-xl font-semibold mb-2">TimerLocked</h2>
                <TimerLocked duration={90} onComplete={() => { /* no prompt */ }} />
            </section>

            {/* NumericKeypad */}
            <section className="p-4 border rounded-lg bg-gray-900">
                <h2 className="text-xl font-semibold mb-2">NumericKeypad</h2>
                <div className="mb-2">Value: <span className="font-mono text-blue-400">{keypadValue}</span></div>
                <NumericKeypad onKeyPress={key => {
                    if (key === 'clear') setKeypadValue('');
                    else if (key === 'enter') alert(`Entered: ${keypadValue}`);
                    else setKeypadValue(v => v + key);
                }} />
            </section>
        </div>
    );
} 