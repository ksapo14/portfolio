import { useEffect, useState } from 'react';

function ScrollStatusBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let animationFrame = null;

        const updateProgress = () => {
            const scrollingElement = document.scrollingElement
                ?? document.documentElement;
            const scrollRange = Math.max(
                scrollingElement.scrollHeight - scrollingElement.clientHeight,
                1,
            );
            const nextProgress = Math.min(
                Math.max(scrollingElement.scrollTop / scrollRange, 0),
                1,
            );

            setProgress(nextProgress);
            animationFrame = null;
        };

        const requestUpdate = () => {
            if (animationFrame === null) {
                animationFrame = window.requestAnimationFrame(updateProgress);
            }
        };

        const resizeObserver = new ResizeObserver(requestUpdate);
        resizeObserver.observe(document.documentElement);

        updateProgress();
        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', requestUpdate);
        document.addEventListener('scroll', requestUpdate, {
            capture: true,
            passive: true,
        });

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('scroll', requestUpdate);
            window.removeEventListener('resize', requestUpdate);
            document.removeEventListener('scroll', requestUpdate, {
                capture: true,
            });
            if (animationFrame !== null) {
                window.cancelAnimationFrame(animationFrame);
            }
        };
    }, []);

    const percentage = Math.round(progress * 100);
    const hue = 145 + progress * 105;
    const lightness = 43 + Math.sin(progress * Math.PI) * 8;
    const color = `hsl(${hue} 72% ${lightness}%)`;

    return (
        <div
            className={`fixed top-1/2 right-[clamp(0.7rem,1.6vw,1.5rem)] z-[80] flex -translate-y-1/2 flex-col items-center gap-2 transition-opacity duration-300 max-md:right-1.5 max-md:gap-1 motion-reduce:transition-none ${
                progress > 0.001 ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            role="progressbar"
            aria-label="Page scroll progress"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={percentage}
        >
            <div className="relative h-[min(54vh,24rem)] w-[0.58rem] overflow-hidden rounded-full border border-white/65 bg-black/12 shadow-[0_0.35rem_1.1rem_rgb(0_0_0_/_12%),inset_0_0_0_1px_rgb(0_0_0_/_5%)] backdrop-blur-md max-md:h-[28vh] max-md:w-[0.32rem]">
                <span
                    className="absolute right-0 bottom-0 left-0 rounded-full transition-[height,background-color] duration-100 ease-linear"
                    style={{
                        backgroundColor: color,
                        boxShadow: `0 0 1rem ${color}`,
                        height: `${percentage}%`,
                    }}
                    aria-hidden="true"
                />
            </div>
            <span className="text-[0.62rem] font-semibold tracking-[0.06em] text-black/45 tabular-nums max-md:hidden">
                {percentage}%
            </span>
        </div>
    );
}

export default ScrollStatusBar;
