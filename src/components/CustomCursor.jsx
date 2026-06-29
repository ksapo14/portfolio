import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CustomCursor.css';

const interactiveSelector = [
    'a',
    'button',
    'input',
    'select',
    'textarea',
    '[role="button"]',
    '.name-letter',
].join(',');

function CustomCursor() {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

        if (!finePointer.matches) {
            return undefined;
        }

        document.body.classList.add('has-custom-cursor');
        gsap.set(cursor, {
            xPercent: -50,
            yPercent: -50,
        });

        const moveX = gsap.quickTo(cursor, 'x', {
            duration: 0.16,
            ease: 'power3.out',
        });
        const moveY = gsap.quickTo(cursor, 'y', {
            duration: 0.16,
            ease: 'power3.out',
        });

        const handlePointerMove = (event) => {
            moveX(event.clientX);
            moveY(event.clientY);
            cursor.classList.add('is-visible');
            cursor.classList.toggle(
                'is-expanded',
                Boolean(event.target.closest(interactiveSelector)),
            );
        };

        const handlePointerLeave = () => {
            cursor.classList.remove('is-visible', 'is-expanded');
        };

        window.addEventListener('pointermove', handlePointerMove);
        document.documentElement.addEventListener('pointerleave', handlePointerLeave);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
            document.body.classList.remove('has-custom-cursor');
            gsap.killTweensOf(cursor);
        };
    }, []);

    return (
        <div
            className="custom-cursor pointer-events-none fixed top-0 left-0 z-[100] size-[0.55rem] rounded-full border border-transparent bg-black opacity-0 [transition:width_180ms_cubic-bezier(0.22,1,0.36,1),height_180ms_cubic-bezier(0.22,1,0.36,1),border-color_180ms_ease,background-color_180ms_ease,opacity_140ms_ease] [will-change:transform,width,height] [&.is-visible]:opacity-100 [&.is-expanded]:size-8 [&.is-expanded]:border-black/60 [&.is-expanded]:bg-black/15 [&.is-expanded]:backdrop-blur-[2px] motion-reduce:[transition:opacity_140ms_ease]"
            ref={cursorRef}
            aria-hidden="true"
        />
    );
}

export default CustomCursor;
