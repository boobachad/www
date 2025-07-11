'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useState } from 'react';

const SnakeGame = dynamic(() => import('@/components/SnakeGame'), { ssr: false });

export default function SnakeGamePage() {
    const [started, setStarted] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full animate-fade-in-up">
            {!started ? (
                <button
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-xl"
                    onClick={() => setStarted(true)}
                >
                    Start the Game
                </button>
            ) : (
                <div className="w-full flex justify-center items-center">
                    <SnakeGame />
                </div>
            )}
        </div>
    );
} 