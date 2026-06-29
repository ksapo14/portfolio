import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

function LoadingScreen() {
    const loaderRef = useRef(null);
    const contentRef = useRef(null);
    const progressRef = useRef(null);

    useLayoutEffect(() => {
        const loader = loaderRef.current;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const duration = reduceMotion ? 0.01 : 1;

        document.body.classList.add('is-loading');

        const context = gsap.context(() => {
            const timeline = gsap.timeline({
                onComplete: () => {
                    document.body.classList.remove('is-loading');
                    window.dispatchEvent(new Event('resize'));
                },
            });

            timeline
                .fromTo(contentRef.current, {
                    autoAlpha: 0,
                    scale: 0.86,
                    y: 18,
                }, {
                    autoAlpha: 1,
                    scale: 1,
                    y: 0,
                    duration: duration * 0.5,
                    ease: 'power3.out',
                })
                .fromTo(progressRef.current, {
                    scaleX: 0,
                }, {
                    scaleX: 1,
                    duration: duration * 0.75,
                    ease: 'power2.inOut',
                }, duration * 0.12)
                .to(contentRef.current, {
                    autoAlpha: 0,
                    y: -16,
                    duration: duration * 0.3,
                    ease: 'power2.in',
                }, duration * 0.8)
                .to(loader, {
                    clipPath: 'inset(0 0 100% 0)',
                    duration: duration * 0.65,
                    ease: 'power4.inOut',
                }, duration)
                .set(loader, {
                    display: 'none',
                });
        }, loader);

        return () => {
            context.revert();
            document.body.classList.remove('is-loading');
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-[200] grid place-items-center bg-[#f5f4f0] text-[#080808] [clip-path:inset(0)]"
            ref={loaderRef}
            role="status"
            aria-label="Loading portfolio"
        >
            <div
                className="flex w-[min(13rem,60vw)] flex-col items-center opacity-0"
                ref={contentRef}
            >
                <span className="mb-3 text-[0.64rem] font-[550] tracking-[0.14em] text-black/60 uppercase">
                    Loading portfolio
                </span>
                <span
                    className="h-0.5 w-full overflow-hidden bg-black/15"
                    aria-hidden="true"
                >
                    <span
                        className="block h-full w-full origin-left scale-x-0 bg-[#00bf63]"
                        ref={progressRef}
                    />
                </span>
            </div>
        </div>
    );
}

export default LoadingScreen;
