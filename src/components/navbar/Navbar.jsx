import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { ChevronDown } from 'lucide-react';

const navItems = ['Home', 'About', 'Work', 'Contact'];

function Navbar({ activeSection = 'home', onActiveSectionChange }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navRef = useRef(null);
    const sliderRef = useRef(null);
    const mobileNavRef = useRef(null);
    const activeIndex = navItems.findIndex(
        (item) => item.toLowerCase() === activeSection,
    );
    const currentIndex = activeIndex === -1 ? selectedIndex : activeIndex;

    const positionSlider = useCallback((index) => {
        const nav = navRef.current;
        const slider = sliderRef.current;
        const target = nav?.querySelectorAll('.navbar-link')[index];

        if (!nav || !slider || !target) {
            return;
        }

        slider.style.width = `${target.offsetWidth}px`;
        slider.style.transform = `translate3d(${target.offsetLeft}px, 0, 0)`;
    }, []);

    useLayoutEffect(() => {
        positionSlider(currentIndex);

        const resizeObserver = new ResizeObserver(() => {
            positionSlider(currentIndex);
        });

        resizeObserver.observe(navRef.current);
        return () => resizeObserver.disconnect();
    }, [currentIndex, positionSlider]);

    useEffect(() => {
        const handlePointerDown = (event) => {
            if (!mobileNavRef.current?.contains(event.target)) {
                setMobileOpen(false);
            }
        };
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setMobileOpen(false);
            }
        };

        document.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleClick = (event, index) => {
        const sectionName = navItems[index].toLowerCase();
        const target = document.getElementById(sectionName);

        setSelectedIndex(index);
        setMobileOpen(false);
        onActiveSectionChange?.(sectionName);
        positionSlider(index);

        if (!target) {
            event.preventDefault();
            return;
        }

        event.preventDefault();
        target.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'auto'
                : 'smooth',
        });
    };

    return (
        <>
            <nav
                aria-label="Primary navigation"
                className="fixed top-[clamp(1rem,2.4vw,1.75rem)] left-1/2 z-20 isolate hidden -translate-x-1/2 items-center rounded-full border border-white/60 bg-[rgb(238_238_238_/_48%)] p-[0.4rem] shadow-[0_0.65rem_2rem_rgb(0_0_0_/_10%),inset_0_1px_0_rgb(255_255_255_/_72%)] backdrop-blur-[18px] backdrop-saturate-[1.55] md:flex"
                onPointerLeave={() => positionSlider(currentIndex)}
                ref={navRef}
            >
                <span
                    className="pointer-events-none absolute top-[0.4rem] left-0 z-[-1] h-[calc(100%-0.8rem)] w-0 rounded-full border border-white/80 bg-[linear-gradient(135deg,rgb(255_255_255_/_78%),rgb(255_255_255_/_34%))] shadow-[0_0.24rem_0.75rem_rgb(0_0_0_/_12%),inset_0_1px_0_rgb(255_255_255_/_85%)] backdrop-blur-[14px] backdrop-saturate-[1.8] [transition:transform_320ms_cubic-bezier(0.22,1,0.36,1),width_320ms_cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                    ref={sliderRef}
                    aria-hidden="true"
                />
                {navItems.map((item, index) => (
                    <a
                        className="navbar-link relative inline-flex min-w-18 items-center justify-center rounded-full border border-white/20 bg-white/10 px-[1.08rem] py-[0.72rem] text-[0.78rem] leading-none font-[570] tracking-[0.025em] text-[#171717] no-underline transition-[color,transform] duration-[180ms] ease-in-out hover:-translate-y-px hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111] motion-reduce:transition-none"
                        href={`#${item.toLowerCase()}`}
                        key={item}
                        onClick={(event) => handleClick(event, index)}
                        onPointerEnter={() => positionSlider(index)}
                        aria-current={index === currentIndex ? 'page' : undefined}
                    >
                        {item}
                    </a>
                ))}
            </nav>

            <nav
                className="fixed top-[max(0.8rem,env(safe-area-inset-top))] right-3 z-[70] md:hidden"
                ref={mobileNavRef}
                aria-label="Mobile navigation"
            >
                <button
                    className="flex min-h-11 items-center gap-2 rounded-full border border-white/70 bg-white/62 px-4 text-[0.75rem] font-semibold tracking-[0.06em] text-[#171717] uppercase shadow-[0_0.55rem_1.5rem_rgb(0_0_0_/_12%)] backdrop-blur-xl"
                    type="button"
                    onClick={() => setMobileOpen((open) => !open)}
                    aria-controls="mobile-navigation-menu"
                    aria-expanded={mobileOpen}
                >
                    Menu
                    <ChevronDown
                        className={`size-4 transition-transform duration-200 ${
                            mobileOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                    />
                </button>
                <div
                    className={`absolute top-[calc(100%+0.55rem)] right-0 w-44 origin-top-right overflow-hidden rounded-2xl border border-white/70 bg-[rgb(244_244_241_/_86%)] p-2 shadow-[0_1rem_2.8rem_rgb(0_0_0_/_16%)] backdrop-blur-2xl transition-[opacity,transform,visibility] duration-200 ${
                        mobileOpen
                            ? 'visible translate-y-0 scale-100 opacity-100'
                            : 'invisible -translate-y-2 scale-95 opacity-0'
                    }`}
                    id="mobile-navigation-menu"
                >
                    {navItems.map((item, index) => (
                        <a
                            className={`flex min-h-11 items-center justify-between rounded-xl px-3 text-[0.82rem] font-semibold text-[#171717] no-underline ${
                                index === currentIndex ? 'bg-white/90' : 'hover:bg-white/55'
                            }`}
                            href={`#${item.toLowerCase()}`}
                            key={item}
                            onClick={(event) => handleClick(event, index)}
                            aria-current={index === currentIndex ? 'page' : undefined}
                        >
                            {item}
                            <span
                                className={`size-1.5 rounded-full ${
                                    index === currentIndex ? 'bg-[#00bf63]' : 'bg-transparent'
                                }`}
                                aria-hidden="true"
                            />
                        </a>
                    ))}
                </div>
            </nav>
        </>
    );
}

export default Navbar;
