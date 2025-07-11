'use client';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import Link from 'next/link';
import { ScrambleText } from "@/components/scramble-text"

const SnakeGame = dynamic(() => import('@/components/SnakeGame'), { ssr: false });

const games = [
    {
        name: 'Snake',
        description: 'snake game.',
        href: '/games/snake',
    }
];

export default function GamesPage() {
    const [started, setStarted] = useState(false);

    return (
        <div className="text-xl">
            <main className="animate-fade-in-up relative">
                <h1 className="text-4xl font-bold mb-8 text-white">
                    <span className="text-blue-500 mr-2">*</span>
                    <ScrambleText text="games" />
                </h1>
                <div className="space-y-6">
                    {games.map((game) => (
                        <Link
                            key={game.name}
                            href={game.href}
                            className="block bg-gray-900 border border-blue-500/30 rounded-lg shadow hover:border-blue-500 transition-colors p-6 group"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-semibold text-white group-hover:text-blue-500 transition-colors">
                                        {game.name}
                                    </h2>
                                    <p className="text-gray-400 mt-1">{game.description}</p>
                                </div>
                                <span className="text-blue-500 text-lg font-mono">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
} 