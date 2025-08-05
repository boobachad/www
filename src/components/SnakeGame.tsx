"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Point {
    x: number;
    y: number;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

type GameState = 'INIT' | 'RUNNING' | 'GAME_OVER';

const GRID_SIZE = 20;
const INITIAL_SNAKE: Point[] = [
    { x: 0, y: Math.floor(GRID_SIZE / 2) },
    { x: -1, y: Math.floor(GRID_SIZE / 2) },
    { x: -2, y: Math.floor(GRID_SIZE / 2) },
];
const INITIAL_DIRECTION: Direction = 'RIGHT';
const SPEED = 100; // ms per move

function getRandomFood(snake: Point[]): Point {
    let food: Point;
    do {
        food = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        };
    } while (snake.some((s) => s.x === food.x && s.y === food.y));
    return food;
}

function isCollision(head: Point, snake: Point[]): boolean {
    return (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE ||
        snake.some((s) => s.x === head.x && s.y === head.y)
    );
}

function getNextHead(head: Point, dir: Direction): Point {
    switch (dir) {
        case 'UP':
            return { x: head.x, y: head.y - 1 };
        case 'DOWN':
            return { x: head.x, y: head.y + 1 };
        case 'LEFT':
            return { x: head.x - 1, y: head.y };
        case 'RIGHT':
            return { x: head.x + 1, y: head.y };
    }
}

const DIR_MAP: Record<string, Direction> = {
    ArrowUp: 'UP',
    ArrowDown: 'DOWN',
    ArrowLeft: 'LEFT',
    ArrowRight: 'RIGHT',
};

export default function SnakeGame() {
    const [snake, setSnake] = useState<Point[]>([...INITIAL_SNAKE]);
    const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
    const [pendingDirection, setPendingDirection] = useState<Direction>(INITIAL_DIRECTION);
    const pendingDirectionRef = useRef<Direction>(INITIAL_DIRECTION);
    const directionRef = useRef<Direction>(INITIAL_DIRECTION);
    const [food, setFood] = useState<Point>(getRandomFood(INITIAL_SNAKE));
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState<number>(0);
    const [gameState, setGameState] = useState<GameState>('INIT');
    const [animatingIn, setAnimatingIn] = useState(true);
    const [hasStarted, setHasStarted] = useState(false); // init as false since we have not pressed any key
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('snake_high_score');
        if (stored) setHighScore(Number(stored));
    }, []);

    useEffect(() => {
        if (gameState === 'INIT') {
            setSnake([...INITIAL_SNAKE]);
            setDirection(INITIAL_DIRECTION);
            setPendingDirection(INITIAL_DIRECTION);
            pendingDirectionRef.current = INITIAL_DIRECTION;
            directionRef.current = INITIAL_DIRECTION;
            setFood(getRandomFood(INITIAL_SNAKE));
            setScore(0);
            setAnimatingIn(true);
            setHasStarted(false);
            let frame = 0;
            const totalFrames = Math.floor(GRID_SIZE / 2) + 2;
            const anim = () => {
                if (frame < totalFrames) {
                    setSnake((prev) =>
                        prev.map((seg, idx) => ({ x: frame - idx, y: Math.floor(GRID_SIZE / 2) }))
                    );
                    frame++;
                    setTimeout(anim, 30);
                } else {
                    setAnimatingIn(false);
                    setGameState('RUNNING');
                }
            };
            anim();
        }
    }, [gameState]);

    useEffect(() => {
        if (gameState !== 'RUNNING' || animatingIn) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }
        intervalRef.current = setInterval(() => {
            directionRef.current = pendingDirectionRef.current;
            setDirection(directionRef.current);
            setSnake((prev) => {
                if (!prev[0]) return prev;
                const newHead = getNextHead(prev[0], directionRef.current);
                if (!hasStarted) {
                    if (
                        newHead.x < 0 ||
                        newHead.x >= GRID_SIZE ||
                        newHead.y < 0 ||
                        newHead.y >= GRID_SIZE
                    ) {
                        let bounceDir: Direction;
                        switch (directionRef.current) {
                            case 'UP': bounceDir = 'DOWN'; break;
                            case 'DOWN': bounceDir = 'UP'; break;
                            case 'LEFT': bounceDir = 'RIGHT'; break;
                            case 'RIGHT': bounceDir = 'LEFT'; break;
                        }
                        directionRef.current = bounceDir;
                        pendingDirectionRef.current = bounceDir;
                        setPendingDirection(bounceDir);
                        const bounceHead = getNextHead(getNextHead(prev[0], bounceDir), bounceDir);
                        let newSnake = [bounceHead, ...prev.slice(0, prev.length - 1)];
                        return newSnake;
                    }
                } else if (isCollision(newHead, prev)) {
                    setGameState('GAME_OVER');
                    setHighScore((prevHigh) => {
                        if (score > prevHigh) {
                            localStorage.setItem('snake_high_score', String(score));
                            return score;
                        }
                        return prevHigh;
                    });
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    return prev;
                }
                let newSnake = [newHead, ...prev];
                if (newHead.x === food.x && newHead.y === food.y) {
                    setFood(getRandomFood(newSnake));
                    setScore((s) => s + 1);
                } else {
                    newSnake.pop();
                }
                return newSnake;
            });
        }, SPEED);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [gameState, animatingIn, food, hasStarted, score]);

    // Keyboard controls
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            const newDir = DIR_MAP[e.key];
            if (!newDir) return;
            e.preventDefault(); //prevent arrow key to scroll
            if (
                (newDir === 'UP' && directionRef.current === 'DOWN') ||
                (newDir === 'DOWN' && directionRef.current === 'UP') ||
                (newDir === 'LEFT' && directionRef.current === 'RIGHT') ||
                (newDir === 'RIGHT' && directionRef.current === 'LEFT')
            ) {
                return;
            }
            pendingDirectionRef.current = newDir;
            setPendingDirection(newDir); // Force update even if same
            if (!hasStarted) setHasStarted(true);
        };
        window.addEventListener('keydown', handleKey, { passive: false });
        return () => window.removeEventListener('keydown', handleKey);
    }, [hasStarted]);

    const handleRestart = useCallback(() => {
        setGameState('INIT');
    }, []);

    const size = Math.min(500, window.innerWidth - 32);
    const cell = size / GRID_SIZE;

    return (
        <div className="flex flex-col items-center">
            <div className="mb-4 flex items-center justify-between w-full max-w-xs">
                <span className="text-blue-500 font-mono text-lg">Score: {score}</span>
                <span className="text-yellow-400 font-mono text-sm ml-4">High: {highScore}</span>
                {gameState === 'GAME_OVER' && (
                    <button
                        className="px-3 py-1 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm ml-4"
                        onClick={handleRestart}
                    >
                        Restart
                    </button>
                )}
            </div>
            <div
                className="relative bg-gray-900 rounded-lg shadow-lg border-4 border-blue-500 flex items-center justify-center"
                style={{ width: size, height: size }}
            >
                {/* Grid */}
                <svg width={size} height={size} style={{ display: 'block' }}>
                    {/* Food */}
                    <rect
                        x={food.x * cell}
                        y={food.y * cell}
                        width={cell}
                        height={cell}
                        rx={cell * 0.3}
                        fill="#facc15"
                        className="transition-all duration-150"
                    />
                    {/* Snake */}
                    {snake.map((seg, i) => (
                        <rect
                            key={i}
                            x={seg.x * cell}
                            y={seg.y * cell}
                            width={cell}
                            height={cell}
                            rx={cell * 0.3}
                            fill={i === 0 || i === snake.length - 1 ? '#2563eb' : '#60a5fa'}
                            className="transition-all duration-75"
                            opacity={
                                i === 0 ? 1 : 0.4 + (Math.abs(i - Math.floor(snake.length / 2)) / Math.floor(snake.length / 2)) * 0.6
                            }
                        />
                    ))}
                </svg>
                {/* Game Over overlay */}
                {gameState === 'GAME_OVER' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 rounded-lg">
                        <div className="text-2xl font-bold text-white mb-2">Game Over</div>
                        <div className="text-blue-400 font-mono mb-4">Score: {score}</div>
                        <div className="text-yellow-400 font-mono mb-2">High: {highScore}</div>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-lg"
                            onClick={handleRestart}
                        >
                            Restart
                        </button>
                    </div>
                )}
            </div>
            <div className="mt-4 text-gray-400 text-xs text-center">
                Use arrow keys to control the snake. Eat yellow food. Don&apos;t hit the wall or yourself!
            </div>
        </div>
    );
} 