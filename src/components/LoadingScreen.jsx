import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

function LoadingScreen({ onComplete, onReveal }) {
    const loaderRef = useRef(null);
    const monogramRef = useRef(null);
    const descriptorRef = useRef(null);
    const progressRef = useRef(null);
    const counterRef = useRef(null);
    const topLineRef = useRef(null);
    const callbacksRef = useRef({ onComplete, onReveal });

    callbacksRef.current = { onComplete, onReveal };

    useLayoutEffect(() => {
        const loader = loaderRef.current;
        const reduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;
        const counter = { value: 0 };

        document.body.classList.add('is-loading');

        const context = gsap.context(() => {
            if (reduceMotion) {
                gsap.set(progressRef.current, { scaleX: 1 });
                counterRef.current.textContent = '100';
                callbacksRef.current.onReveal?.();
                gsap.set(loader, { display: 'none' });
                document.body.classList.remove('is-loading');
                callbacksRef.current.onComplete?.();
                return;
            }

            const timeline = gsap.timeline({
                defaults: { ease: 'power3.out' },
                onComplete: () => {
                    document.body.classList.remove('is-loading');
                    callbacksRef.current.onComplete?.();
                },
            });

            timeline
                .fromTo(
                    topLineRef.current,
                    { autoAlpha: 0, y: -12 },
                    { autoAlpha: 1, y: 0, duration: 0.45 },
                )
                .fromTo(
                    monogramRef.current,
                    { yPercent: 112, rotate: 2 },
                    {
                        yPercent: 0,
                        rotate: 0,
                        duration: 0.82,
                        ease: 'power4.out',
                    },
                    0.08,
                )
                .fromTo(
                    descriptorRef.current,
                    { autoAlpha: 0, y: 14 },
                    { autoAlpha: 1, y: 0, duration: 0.5 },
                    0.42,
                )
                .to(
                    counter,
                    {
                        value: 100,
                        duration: 1.45,
                        ease: 'power2.inOut',
                        onUpdate: () => {
                            counterRef.current.textContent = String(
                                Math.round(counter.value),
                            ).padStart(3, '0');
                        },
                    },
                    0.18,
                )
                .fromTo(
                    progressRef.current,
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: 1.45,
                        ease: 'power2.inOut',
                    },
                    0.18,
                )
                .to(
                    [topLineRef.current, descriptorRef.current],
                    {
                        autoAlpha: 0,
                        y: -10,
                        duration: 0.28,
                        ease: 'power2.in',
                    },
                    1.52,
                )
                .to(
                    monogramRef.current,
                    {
                        yPercent: -115,
                        duration: 0.5,
                        ease: 'power3.in',
                    },
                    1.55,
                )
                .call(() => callbacksRef.current.onReveal?.(), null, 1.72)
                .to(
                    loader,
                    {
                        clipPath: 'inset(0 0 100% 0)',
                        duration: 0.9,
                        ease: 'power4.inOut',
                    },
                    1.72,
                )
                .set(loader, { display: 'none' });
        }, loader);

        return () => {
            context.revert();
            document.body.classList.remove('is-loading');
        };
    }, []);

    return (
        <div
            className="loader"
            ref={loaderRef}
            role="status"
            aria-live="polite"
            aria-label="Loading Krish Sapovadia's portfolio"
        >
            <div className="loader-topline" ref={topLineRef} aria-hidden="true">
                <span>Krish Sapovadia</span>
                <span>Portfolio / 2026</span>
            </div>

            <div className="loader-identity" aria-hidden="true">
                <div className="loader-word-window">
                    <span className="loader-monogram" ref={monogramRef}>
                        KS<span>.</span>
                    </span>
                </div>
                <p ref={descriptorRef}>Software + ML engineer</p>
            </div>

            <div className="loader-progress" aria-hidden="true">
                <span className="loader-count" ref={counterRef}>
                    000
                </span>
                <span className="loader-track">
                    <span ref={progressRef} />
                </span>
                <span>100</span>
            </div>
        </div>
    );
}

export default LoadingScreen;
