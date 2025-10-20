import { useEffect, useRef } from "react";

interface ParallaxImageProps {
    src?: string;
    strength?: number;   // how far the image drifts (px)
    calmness?: number;   // how smooth/slow the motion is
    positionX?: string;  // e.g. "50%", "40%"
    positionY?: string;  // e.g. "50%", "60%"
    width?: string;      // e.g. "45vw", "400px"
}

export default function ParallaxImage({
    src = "/stocks_img.png",
    strength = 25,
    calmness = 0.08,
    positionX = "50%",
    positionY = "50%",
    width = "45vw",
}: ParallaxImageProps) {
    const imgRef = useRef<HTMLImageElement>(null);
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    let animationFrame: number;

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            targetX = (e.clientX / innerWidth - 0.5) * strength;
            targetY = (e.clientY / innerHeight - 0.5) * strength;
        };

        const animate = () => {
            currentX += (targetX - currentX) * calmness;
            currentY += (targetY - currentY) * calmness;
            if (imgRef.current)
                imgRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
            animationFrame = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMouseMove);
        animationFrame = requestAnimationFrame(animate);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrame);
        };
    }, [strength, calmness]);

    return (
        <div
            className="parallax-wrapper"
            style={{ top: positionY, left: positionX, transform: "translate(-50%, -50%)", zIndex: -1 }}
        >
            <img ref={imgRef} src={src} alt="Parallax" className="parallax-img" />

            <style>{`
        .parallax-wrapper {
          position: absolute;
          z-index: 5;
          pointer-events: none;
        }

        .parallax-img {
          width: ${width};
          height: auto;
          transition: transform 0.2s ease-out;
          user-select: none;
        }

        @media (max-width: 768px) {
          .parallax-img {
            width: 80vw;
          }
        }
      `}</style>
        </div>
    );
}
