import { useEffect, useRef } from "react";

interface GameOfLifeProps {
    cellSize?: number;
    tickMs?: number;
    background?: string;
    fillRGB?: string;
    aliveAlpha?: number;
    fadeRate?: number;
    seedProb?: number;
    stagnationDelta?: number;
    stagnationMaxTicks?: number;
    className?: string;
    style?: React.CSSProperties;
}

const GameOfLife: React.FC<GameOfLifeProps> = ({
    cellSize = 30,
    tickMs = 720,
    fillRGB = "0,0,0",
    aliveAlpha = 1,
    fadeRate = 0.12,
    seedProb = 0.22,
    stagnationDelta = 0.005,
    stagnationMaxTicks = 80,
    className,
    style,
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const dotsCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const CELL = cellSize;
        const TICK_MS = tickMs;
        const FADE = fadeRate;

        const canvas = canvasRef.current!;
        const dotsCanvas = dotsCanvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        const dotsCtx = dotsCanvas.getContext("2d")!;
        const dpr = window.devicePixelRatio || 1;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const cols = Math.ceil(vw / CELL);
        const rows = Math.ceil(vh / CELL);
        const total = rows * cols;

        // set up canvases
        [canvas, dotsCanvas].forEach((c) => {
            c.style.width = "100%";
            c.style.height = "100%";
            c.width = cols * CELL * dpr;
            c.height = rows * CELL * dpr;
        });

        dotsCtx.clearRect(0, 0, dotsCanvas.width, dotsCanvas.height);
        dotsCtx.fillStyle = "#A6A6A4";

        // draw dots at each intersection (grid line crossing)
        for (let r = 0; r <= rows; r++) {
            for (let c = 0; c <= cols; c++) {
                dotsCtx.beginPath();
                dotsCtx.arc(
                    c * CELL * dpr,
                    r * CELL * dpr,
                    0.6 * dpr, // dot radius
                    0,
                    2 * Math.PI
                );
                dotsCtx.fill();
            }
        }


        // game logic
        const idx = (r: number, c: number) => r * cols + c;
        const seed = () =>
            Uint8Array.from({ length: total }, () =>
                Math.random() < seedProb ? 1 : 0
            );

        let gridA = seed();
        let gridB = new Uint8Array(total);
        let disp = Float32Array.from(gridA);
        let prevAlive = gridA.reduce((a, b) => a + b, 0);
        let stagnation = 0;
        let lastTick = 0;

        const step = (from: Uint8Array, to: Uint8Array) => {
            for (let r = 0; r < rows; r++) {
                const rm1 = (r - 1 + rows) % rows;
                const rp1 = (r + 1) % rows;
                for (let c = 0; c < cols; c++) {
                    const cm1 = (c - 1 + cols) % cols;
                    const cp1 = (c + 1) % cols;
                    const neighbors =
                        from[idx(rm1, cm1)] +
                        from[idx(rm1, c)] +
                        from[idx(rm1, cp1)] +
                        from[idx(r, cm1)] +
                        from[idx(r, cp1)] +
                        from[idx(rp1, cm1)] +
                        from[idx(rp1, c)] +
                        from[idx(rp1, cp1)];
                    const cur = from[idx(r, c)];
                    to[idx(r, c)] = neighbors === 3 || (cur && neighbors === 2) ? 1 : 0;
                }
            }
        };

        const draw = () => {
            const w = cols * CELL * dpr;
            const h = rows * CELL * dpr;

            // ✨ no solid fill — we want transparency
            ctx.clearRect(0, 0, w, h);

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const i = idx(r, c);
                    const a = disp[i];
                    if (a > 0.01) {
                        ctx.fillStyle = `rgba(${fillRGB},${aliveAlpha * a})`;
                        ctx.fillRect(c * CELL * dpr, r * CELL * dpr, CELL * dpr, CELL * dpr);
                    }
                }
            }
        };

        const animate = (t: number) => {
            if (!lastTick) lastTick = t;
            if (t - lastTick >= TICK_MS) {
                step(gridA, gridB);
                [gridA, gridB] = [gridB, gridA];
                const alive = gridA.reduce((a, b) => a + b, 0);
                const delta = Math.abs(alive - prevAlive) / total;

                if (
                    alive === 0 ||
                    (delta < stagnationDelta && ++stagnation > stagnationMaxTicks)
                ) {
                    gridA = seed();
                    stagnation = 0;
                }
                prevAlive = alive;
                lastTick = t;
            }

            for (let i = 0; i < total; i++) {
                const target = gridA[i] ? 1 : 0;
                disp[i] += (target - disp[i]) * FADE;
            }

            draw();
            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [
        cellSize,
        tickMs,
        fillRGB,
        aliveAlpha,
        fadeRate,
        seedProb,
        stagnationDelta,
        stagnationMaxTicks,
    ]);

    return (
        <>
            {/* main animation (transparent) */}
            <canvas
                ref={canvasRef}
                className={className}
                style={{
                    position: "fixed",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    display: "block",
                    background: "transparent",
                    zIndex: -3,
                    ...style,
                }}
            />

            {/* static dot grid (behind everything but visible) */}
            <canvas
                ref={dotsCanvasRef}
                style={{
                    position: "fixed",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    display: "block",
                    pointerEvents: "none",
                    zIndex: -2,
                }}
            />
        </>
    );
};

export default GameOfLife;
