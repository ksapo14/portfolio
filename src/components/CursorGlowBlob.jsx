"use client";

import { useEffect, useRef } from "react";

export default function CursorGlowBlob({
    size = 145,
    particleCount = 32,
    color = "168, 85, 247",
    accentColor = "59, 130, 246",
    opacity = 0.78,
    blur = 26,
    stiffness = 0.075,
    damping = 0.86,
    edgeStrength = 1.15,
    ambientStrength = 1,
    zIndex = 0,
    blendMode = "screen",
}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let width = window.innerWidth;
        let height = window.innerHeight;
        let dpr = window.devicePixelRatio || 1;
        let animationId;

        const mouse = {
            x: width / 2,
            y: height / 2,
            active: false,
        };

        const smoothMouse = {
            x: width / 2,
            y: height / 2,
        };

        const particles = Array.from({ length: particleCount }, (_, i) => {
            const angle = (Math.PI * 2 * i) / particleCount;
            const ring = i % 3;
            const ringScale = [0.22, 0.42, 0.62][ring];

            return {
                x: width / 2,
                y: height / 2,
                vx: 0,
                vy: 0,
                angle,
                baseAngle: angle,
                orbit: size * (ringScale + Math.random() * 0.045),
                radius: size * (0.11 + (2 - ring) * 0.018 + Math.random() * 0.028),
                phase: Math.random() * Math.PI * 2,
                speed: 0.55 + ring * 0.12 + Math.random() * 0.22,
            };
        });

        const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
        const lerp = (a, b, t) => a + (b - a) * t;

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = window.devicePixelRatio || 1;

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function getClosestEdgeInfluence(x, y) {
            const range = size * 1.2;

            const edges = [
                {
                    side: "left",
                    amount: clamp((range - x) / range, 0, 1),
                },
                {
                    side: "right",
                    amount: clamp((range - (width - x)) / range, 0, 1),
                },
                {
                    side: "top",
                    amount: clamp((range - y) / range, 0, 1),
                },
                {
                    side: "bottom",
                    amount: clamp((range - (height - y)) / range, 0, 1),
                },
            ];

            return edges.sort((a, b) => b.amount - a.amount)[0];
        }

        function drawParticle(x, y, radius, alpha) {
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

            gradient.addColorStop(0, `rgba(${color}, ${alpha})`);
            gradient.addColorStop(0.42, `rgba(${accentColor}, ${alpha * 0.55})`);
            gradient.addColorStop(1, `rgba(${color}, 0)`);

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        function animate(time) {
            ctx.clearRect(0, 0, width, height);

            const t = time * 0.001;

            // Tiny always-on movement, even when mouse is still
            const idleX =
                Math.sin(t * 0.55) * size * 0.055 * ambientStrength +
                Math.sin(t * 0.21) * size * 0.035 * ambientStrength;

            const idleY =
                Math.cos(t * 0.47) * size * 0.055 * ambientStrength +
                Math.sin(t * 0.18) * size * 0.035 * ambientStrength;

            smoothMouse.x = lerp(smoothMouse.x, mouse.x + idleX, 0.12);
            smoothMouse.y = lerp(smoothMouse.y, mouse.y + idleY, 0.12);

            const edge = getClosestEdgeInfluence(smoothMouse.x, smoothMouse.y);
            const edgeAmount = Math.pow(edge.amount, 1.5) * edgeStrength;

            ctx.globalCompositeOperation = "lighter";
            ctx.filter = `blur(${blur}px)`;

            // Breathing pulse
            const breath =
                1 +
                Math.sin(t * 1.25) * 0.048 * ambientStrength +
                Math.sin(t * 0.68) * 0.032 * ambientStrength;

            // Slow internal rotation
            const rotation = t * 0.32 * ambientStrength;

            for (const particle of particles) {
                const microWobble =
                    Math.sin(t * particle.speed + particle.phase) *
                    size *
                    0.028 *
                    ambientStrength;

                const secondaryWobble =
                    Math.cos(t * particle.speed * 0.7 + particle.phase) *
                    size *
                    0.018 *
                    ambientStrength;

                const livingAngle =
                    particle.baseAngle +
                    rotation +
                    Math.sin(t * 0.9 + particle.phase) * 0.09 * ambientStrength;

                let offsetX =
                    Math.cos(livingAngle) * (particle.orbit * breath + microWobble);

                let offsetY =
                    Math.sin(livingAngle) *
                    (particle.orbit * breath + secondaryWobble);

                // Slight organic distortion so it does not feel perfectly circular
                offsetX += Math.sin(t * 1.5 + particle.phase) * size * 0.01;
                offsetY += Math.cos(t * 1.3 + particle.phase) * size * 0.01;

                let targetX = smoothMouse.x + offsetX;
                let targetY = smoothMouse.y + offsetY;

                const gather = clamp(edgeAmount, 0, 1);

                // Edge gathering / flattening
                if (edge.side === "left" && gather > 0) {
                    targetX = lerp(targetX, -size * 0.2, gather);
                    targetY = lerp(targetY, smoothMouse.y + offsetY * 0.18, gather);
                }

                if (edge.side === "right" && gather > 0) {
                    targetX = lerp(targetX, width + size * 0.2, gather);
                    targetY = lerp(targetY, smoothMouse.y + offsetY * 0.18, gather);
                }

                if (edge.side === "top" && gather > 0) {
                    targetX = lerp(targetX, smoothMouse.x + offsetX * 0.18, gather);
                    targetY = lerp(targetY, -size * 0.2, gather);
                }

                if (edge.side === "bottom" && gather > 0) {
                    targetX = lerp(targetX, smoothMouse.x + offsetX * 0.18, gather);
                    targetY = lerp(targetY, height + size * 0.2, gather);
                }

                particle.vx += (targetX - particle.x) * stiffness;
                particle.vy += (targetY - particle.y) * stiffness;

                particle.vx *= damping;
                particle.vy *= damping;

                particle.x += particle.vx;
                particle.y += particle.vy;

                const radiusPulse =
                    1 +
                    Math.sin(t * 1.8 + particle.phase) * 0.06 * ambientStrength +
                    gather * 0.22;

                drawParticle(
                    particle.x,
                    particle.y,
                    particle.radius * radiusPulse,
                    opacity / particleCount
                );
            }

            // Soft central glow to make it feel more like one living blob
            const coreRadius = size * (0.52 + Math.sin(t * 0.9) * 0.035);
            drawParticle(
                smoothMouse.x,
                smoothMouse.y,
                coreRadius * 1.12,
                opacity * 0.055
            );

            ctx.filter = "none";
            animationId = requestAnimationFrame(animate);
        }

        function handlePointerMove(event) {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
            mouse.active = true;
        }

        resize();

        window.addEventListener("resize", resize);
        window.addEventListener("pointermove", handlePointerMove, {
            passive: true,
        });

        animationId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("pointermove", handlePointerMove);
        };
    }, [
        size,
        particleCount,
        color,
        accentColor,
        opacity,
        blur,
        stiffness,
        damping,
        edgeStrength,
        ambientStrength,
    ]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                inset: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                zIndex,
                mixBlendMode: blendMode,
            }}
        />
    );
}
