import { useEffect, useRef } from "react";

interface ParticleFieldProps {
    count?: number;
    visualRange?: number;
    speedLimit?: number;
    gridSpacing?: number;
    dotSize?: number;
    boidColor?: string;
    backgroundColor?: string;
    dotColor?: string;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * ParticleField.tsx
 * A flocking (boids) simulation with:
 * - Warping edges
 * - Mouse attraction
 * - Click explosion effect
 * - Background grid dots
 * - Customizable colors
 */
const ParticleField: React.FC<ParticleFieldProps> = ({
    count = 100,
    visualRange = 75,
    speedLimit = 15,
    gridSpacing = 40,
    dotSize = 1,
    boidColor = "black",
    backgroundColor = "white",
    dotColor = "rgba(0,0,0,0.35)",
    className,
    style,
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const dotsCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const boidsRef = useRef<any[]>([]);
    const dimsRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
    const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
        x: 0,
        y: 0,
        active: false,
    });

    // Euclidean distance helper
    const distance = (a: any, b: any) =>
        Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

    // Initialize boids
    const initBoids = (w: number, h: number) => {
        const arr = [];
        for (let i = 0; i < count; i++) {
            arr.push({
                x: Math.random() * w,
                y: Math.random() * h,
                dx: Math.random() * 10 - 5,
                dy: Math.random() * 10 - 5,
            });
        }
        boidsRef.current = arr;
    };

    // Cohesion
    const flyTowardsCenter = (boid: any) => {
        const centeringFactor = 0.005;
        let centerX = 0,
            centerY = 0,
            numNeighbors = 0;

        for (let other of boidsRef.current) {
            if (distance(boid, other) < visualRange) {
                centerX += other.x;
                centerY += other.y;
                numNeighbors++;
            }
        }

        if (numNeighbors) {
            centerX /= numNeighbors;
            centerY /= numNeighbors;
            boid.dx += (centerX - boid.x) * centeringFactor;
            boid.dy += (centerY - boid.y) * centeringFactor;
        }
    };

    // Separation
    const avoidOthers = (boid: any) => {
        const minDistance = 20;
        const avoidFactor = 0.05;
        let moveX = 0,
            moveY = 0;

        for (let other of boidsRef.current) {
            if (other !== boid && distance(boid, other) < minDistance) {
                moveX += boid.x - other.x;
                moveY += boid.y - other.y;
            }
        }

        boid.dx += moveX * avoidFactor;
        boid.dy += moveY * avoidFactor;
    };

    // Alignment
    const matchVelocity = (boid: any) => {
        const matchingFactor = 0.05;
        let avgDX = 0,
            avgDY = 0,
            count = 0;

        for (let other of boidsRef.current) {
            if (distance(boid, other) < visualRange) {
                avgDX += other.dx;
                avgDY += other.dy;
                count++;
            }
        }

        if (count) {
            avgDX /= count;
            avgDY /= count;
            boid.dx += (avgDX - boid.dx) * matchingFactor;
            boid.dy += (avgDY - boid.dy) * matchingFactor;
        }
    };

    // Limit speed
    const limitSpeed = (boid: any) => {
        const speed = Math.sqrt(boid.dx * boid.dx + boid.dy * boid.dy);
        if (speed > speedLimit) {
            boid.dx = (boid.dx / speed) * speedLimit;
            boid.dy = (boid.dy / speed) * speedLimit;
        }
    };

    // Warp edges
    const wrapEdges = (boid: any, w: number, h: number) => {
        if (boid.x < 0) boid.x += w;
        else if (boid.x >= w) boid.x -= w;
        if (boid.y < 0) boid.y += h;
        else if (boid.y >= h) boid.y -= h;
    };

    // Mouse attraction
    const attractToMouse = (boid: any) => {
        if (!mouseRef.current.active) return;
        const { x: mx, y: my } = mouseRef.current;
        const dx = mx - boid.x;
        const dy = my - boid.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < visualRange * 2 && dist > 5) {
            const force = 0.0025;
            boid.dx += dx * force;
            boid.dy += dy * force;
        }
    };

    // Explosion
    const explodeAt = (x: number, y: number) => {
        for (let boid of boidsRef.current) {
            const dx = boid.x - x;
            const dy = boid.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150 && dist > 5) {
                const strength = 3 - dist / 50;
                boid.dx += (dx / dist) * strength;
                boid.dy += (dy / dist) * strength;
            }
        }
    };

    // Draw grid dots
    const drawDots = (
        ctx: CanvasRenderingContext2D,
        w: number,
        h: number,
        dpr: number
    ) => {
        ctx.clearRect(0, 0, w * dpr, h * dpr);
        ctx.fillStyle = dotColor;
        for (let y = 0; y <= h; y += gridSpacing) {
            for (let x = 0; x <= w; x += gridSpacing) {
                ctx.beginPath();
                ctx.arc(x * dpr, y * dpr, dotSize * dpr, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current!;
        const dotsCanvas = dotsCanvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        const dotsCtx = dotsCanvas.getContext("2d")!;
        const dpr = window.devicePixelRatio || 1;

        const resize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            dotsCanvas.width = w * dpr;
            dotsCanvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            dotsCanvas.style.width = `${w}px`;
            dotsCanvas.style.height = `${h}px`;
            dimsRef.current = { w, h };

            initBoids(w, h);
            drawDots(dotsCtx, w, h, dpr);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
            mouseRef.current.active = true;
        };
        const handleMouseLeave = () => (mouseRef.current.active = false);
        const handleClick = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            explodeAt(x, y);
        };

        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("click", handleClick);

        const animate = () => {
            const { w, h } = dimsRef.current;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, w, h);

            for (let boid of boidsRef.current) {
                flyTowardsCenter(boid);
                avoidOthers(boid);
                matchVelocity(boid);
                attractToMouse(boid);
                limitSpeed(boid);
                boid.x += boid.dx;
                boid.y += boid.dy;
                wrapEdges(boid, w, h);

                const angle = Math.atan2(boid.dy, boid.dx);
                ctx.save();
                ctx.translate(boid.x, boid.y);
                ctx.rotate(angle);
                ctx.fillStyle = boidColor;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(-10, 4);
                ctx.lineTo(-10, -4);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("click", handleClick);
        };
    }, [count, visualRange, speedLimit, gridSpacing, dotSize, boidColor, backgroundColor, dotColor]);

    return (
        <>
            {/* Boids layer */}
            <canvas
                ref={canvasRef}
                className={className}
                style={{
                    position: "fixed",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    background: "transparent",
                    display: "block",
                    zIndex: -2,
                    ...style,
                }}
            />
            {/* Dot grid layer */}
            <canvas
                ref={dotsCanvasRef}
                style={{
                    position: "fixed",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    display: "block",
                    pointerEvents: "none",
                    zIndex: -3,
                }}
            />
        </>
    );
};

export default ParticleField;