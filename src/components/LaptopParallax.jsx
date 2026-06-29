import { useLayoutEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import krishImage from '../assets/krish.jpg';
import KeyboardSkillsScene from './KeyboardSkillsScene';
import ProjectDesktop from './ProjectDesktop';
import './LaptopParallax.css';

gsap.registerPlugin(ScrollTrigger);

function LaptopParallax({ onSectionChange }) {
    const name = 'Krish Sapovadia';
    const keyboardRows = [13, 13, 12, 11, 8];
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const laptopRef = useRef(null);
    const screenRef = useRef(null);
    const introPageRef = useRef(null);
    const aboutPageRef = useRef(null);
    const projectsPageRef = useRef(null);
    const baseRef = useRef(null);
    const scrollHintRef = useRef(null);
    const skillsSceneRef = useRef(null);
    const keyboardSceneRef = useRef(null);
    const skillsAccordionRef = useRef(null);
    const skillsHeadingRef = useRef(null);
    const skillsKeyBlocksRef = useRef(null);
    const sourceKeyRefs = useRef({});
    const floatingKeyRefs = useRef([]);
    const revealTimelineRef = useRef(null);

    const revealSkills = () => {
        revealTimelineRef.current?.play();
    };

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const title = titleRef.current;
        const laptop = laptopRef.current;
        const screen = screenRef.current;
        const introPage = introPageRef.current;
        const aboutPage = aboutPageRef.current;
        const projectsPage = projectsPageRef.current;
        const base = baseRef.current;
        const scrollHint = scrollHintRef.current;
        const skillsScene = skillsSceneRef.current;
        const keyboardScene = keyboardSceneRef.current;
        const skillsAccordion = skillsAccordionRef.current;
        const skillsHeading = skillsHeadingRef.current;
        const skillsKeyBlocks = skillsKeyBlocksRef.current;
        const floatingKeys = floatingKeyRefs.current;
        const movingKeys = floatingKeys.slice(0, 4);
        const duplicateKeys = floatingKeys.slice(4);
        const liftedSourceKeys = ['S', 'K', 'I', 'L'].map(
            (letter) => sourceKeyRefs.current[letter],
        );

        const context = gsap.context(() => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                gsap.set([
                    title,
                    scrollHint,
                    laptop,
                    introPage,
                    aboutPage,
                    projectsPage,
                    keyboardScene,
                ], {
                    autoAlpha: 0,
                });
                gsap.set(skillsScene, {
                    autoAlpha: 1,
                    yPercent: 0,
                });
                gsap.set([skillsAccordion, ...floatingKeys], {
                    autoAlpha: 1,
                    clearProps: 'transform',
                });
                gsap.set(skillsKeyBlocks, {
                    autoAlpha: 0,
                });
                gsap.set(skillsHeading, {
                    autoAlpha: 1,
                    clearProps: 'transform',
                });
                onSectionChange?.('work');
                return;
            }

            gsap.set(laptop, {
                rotationX: -14,
                rotationY: 24,
                rotationZ: -3,
                scale: window.innerWidth <= 600 ? 0.52 : 0.34,
                yPercent: -28,
            });
            gsap.set(aboutPage, {
                autoAlpha: 0,
                yPercent: 8,
            });
            gsap.set(projectsPage, {
                autoAlpha: 0,
                yPercent: 8,
            });
            gsap.set(skillsScene, {
                autoAlpha: 0,
                yPercent: 100,
            });
            gsap.set(skillsAccordion, {
                autoAlpha: 0,
                y: 38,
            });
            gsap.set(floatingKeys, {
                autoAlpha: 0,
                transformOrigin: 'center center',
            });
            gsap.set(skillsHeading, {
                autoAlpha: 0,
                scale: 0.94,
                y: 12,
            });

            const timeline = gsap.timeline({
                onUpdate() {
                    const time = this.time();
                    laptop.classList.toggle(
                        'is-entered',
                        time >= 0.999 && time < 1.72,
                    );
                },
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1,
                    invalidateOnRefresh: true,
                    onUpdate: ({ progress }) => {
                        if (progress > 0.44) {
                            onSectionChange?.('work');
                        } else if (progress > 0.06) {
                            onSectionChange?.('about');
                        } else {
                            onSectionChange?.('home');
                        }
                    },
                },
            });

            timeline
                .to(title, {
                    autoAlpha: 0,
                    yPercent: -16,
                    duration: 0.2,
                    ease: 'power2.in',
                }, 0)
                .to(scrollHint, {
                    autoAlpha: 0,
                    duration: 0.14,
                }, 0)
                .to(laptop, {
                    rotationX: 0,
                    rotationY: 0,
                    rotationZ: 0,
                    scale: 1,
                    yPercent: 0,
                    duration: 1,
                    ease: 'power2.inOut',
                    force3D: false,
                }, 0)
                .to(base, {
                    autoAlpha: 0,
                    rotationX: 92,
                    scaleY: 0.2,
                    duration: 0.28,
                    ease: 'power2.in',
                }, 0.48)
                .to(screen, {
                    borderRadius: '0.35rem',
                    duration: 0.25,
                }, 0.75)
                .to(introPage, {
                    autoAlpha: 0,
                    yPercent: -8,
                    duration: 0.16,
                    ease: 'power2.in',
                }, 0.74)
                .to(aboutPage, {
                    autoAlpha: 1,
                    yPercent: 0,
                    duration: 0.2,
                    ease: 'power2.out',
                }, 0.82)
                .to(aboutPage, {
                    autoAlpha: 0,
                    yPercent: -8,
                    duration: 0.16,
                    ease: 'power2.in',
                }, 1.18)
                .to(projectsPage, {
                    autoAlpha: 1,
                    yPercent: 0,
                    duration: 0.22,
                    ease: 'power2.out',
                }, 1.28)
                .to(projectsPage, {
                    autoAlpha: 0,
                    yPercent: -100,
                    duration: 0.56,
                    ease: 'none',
                    force3D: false,
                }, 1.72)
                .to(skillsScene, {
                    autoAlpha: 1,
                    yPercent: 0,
                    duration: 0.56,
                    ease: 'none',
                }, 1.72)
                .to({ progress: 0 }, {
                    progress: 1,
                    duration: 0.72,
                    ease: 'none',
                }, 2.28);

            revealTimelineRef.current = gsap.timeline({
                paused: true,
            })
                .to(liftedSourceKeys, {
                    background: 'linear-gradient(145deg, #f8f8f5, #cfd2cf)',
                    borderColor: 'rgb(255 255 255 / 72%)',
                    color: '#111312',
                    y: -5,
                    duration: 0.14,
                    stagger: 0.08,
                    ease: 'back.out(2)',
                }, 0)
                .fromTo(movingKeys, {
                    immediateRender: false,
                    autoAlpha: 1,
                    x: (index, target) => {
                        const letter = target.textContent.trim();
                        const source = sourceKeyRefs.current[letter];
                        if (!source) return 0;

                        const sourceRect = source.getBoundingClientRect();
                        const targetRect = target.getBoundingClientRect();
                        return (
                            sourceRect.left + sourceRect.width / 2
                            - targetRect.left - targetRect.width / 2
                        );
                    },
                    y: (index, target) => {
                        const letter = target.textContent.trim();
                        const source = sourceKeyRefs.current[letter];
                        if (!source) return 0;

                        const sourceRect = source.getBoundingClientRect();
                        const targetRect = target.getBoundingClientRect();
                        return (
                            sourceRect.top + sourceRect.height / 2
                            - targetRect.top - targetRect.height / 2
                        );
                    },
                    scale: (index, target) => {
                        const letter = target.textContent.trim();
                        const source = sourceKeyRefs.current[letter];
                        if (!source) return 1;

                        return source.offsetWidth / target.offsetWidth;
                    },
                    rotationX: 18,
                    rotationZ: (index) => (index - 2.5) * 2.5,
                }, {
                    immediateRender: false,
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotationX: 0,
                    rotationZ: 0,
                    duration: 0.68,
                    stagger: 0.055,
                    ease: 'power3.inOut',
                }, 0.42)
                .to(liftedSourceKeys, {
                    autoAlpha: 0,
                    y: -18,
                    duration: 0.2,
                    stagger: 0.055,
                    ease: 'power2.in',
                }, 0.42)
                .to(keyboardScene, {
                    autoAlpha: 0,
                    y: 45,
                    duration: 0.38,
                    ease: 'power2.in',
                }, 0.68)
                .fromTo(duplicateKeys, {
                    immediateRender: false,
                    autoAlpha: 0,
                    scale: 0.72,
                    y: 18,
                }, {
                    immediateRender: false,
                    autoAlpha: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    stagger: 0.1,
                    ease: 'back.out(1.8)',
                }, 1.18)
                .to(skillsKeyBlocks, {
                    autoAlpha: 0,
                    scale: 0.9,
                    y: -10,
                    duration: 0.36,
                    ease: 'power2.inOut',
                }, 1.55)
                .to(skillsHeading, {
                    autoAlpha: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.44,
                    ease: 'power3.out',
                }, 1.62)
                .to(skillsAccordion, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.34,
                    ease: 'power3.out',
                }, 1.92);
        }, section);

        return () => {
            revealTimelineRef.current = null;
            laptop.classList.remove('is-entered');
            context.revert();
        };
    }, [onSectionChange]);

    return (
        <section
            className="laptop-scroll relative h-[700vh] bg-[#f1f0ec] motion-reduce:h-svh"
            id="home"
            ref={sectionRef}
        >
            <span
                className="pointer-events-none absolute top-[29%]"
                id="about"
                aria-hidden="true"
            />
            <span
                className="pointer-events-none absolute top-[43%]"
                id="work"
                aria-hidden="true"
            />
            <span
                className="pointer-events-none absolute top-[69%]"
                id="skills"
                aria-hidden="true"
            />
            <div className="laptop-stage sticky top-0 grid h-svh place-items-center overflow-hidden">
                <h1
                    className="absolute right-0 bottom-[clamp(1.5rem,5vw,5rem)] left-0 z-[4] mx-auto h-max w-max select-none whitespace-nowrap text-center font-['Archivo',sans-serif] text-[clamp(4rem,13vw,12rem)] leading-[0.88] font-bold tracking-[-0.07em] text-black [-webkit-tap-highlight-color:transparent] [will-change:transform,opacity]"
                    aria-label={name}
                    ref={titleRef}
                >
                    {[...name].map((character, index) => (
                        <span
                            aria-hidden="true"
                            className={
                                character === ' '
                                    ? 'name-space inline-block'
                                    : "name-letter inline-block origin-bottom [font-variation-settings:'wdth'_100,'wght'_700] [transition:transform_220ms_cubic-bezier(0.2,0.8,0.2,1),font-variation-settings_220ms_cubic-bezier(0.2,0.8,0.2,1)] hover:relative hover:z-[1] hover:scale-x-[1.2] hover:[font-variation-settings:'wdth'_125,'wght'_300] motion-reduce:transition-none"
                            }
                            key={`${character}-${index}`}
                        >
                            {character === ' ' ? '\u00A0' : character}
                        </span>
                    ))}
                </h1>

                <div
                    className="absolute bottom-[1rem] left-1/2 z-[5] flex -translate-x-1/2 items-center gap-[0.5rem] whitespace-nowrap text-[0.68rem] font-semibold tracking-[0.12em] text-[#111] uppercase motion-reduce:hidden"
                    ref={scrollHintRef}
                >
                    <span>Scroll down</span>
                    <ChevronDown
                        className="size-[1rem] animate-[scroll-nudge_1.4s_ease-in-out_infinite] motion-reduce:animate-none"
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />
                </div>

                <div
                    className="laptop relative aspect-[16/10] w-[min(88vw,140.8vh)] max-[600px]:w-[88vw]"
                    ref={laptopRef}
                >
                    <div className="laptop-lid absolute inset-0 rounded-[clamp(0.8rem,1.4vw,1.25rem)] p-[clamp(0.5rem,1vw,0.85rem)]">
                        <div
                            className="absolute top-[0.28rem] left-1/2 z-[2] aspect-square w-[0.27rem] -translate-x-1/2 rounded-full bg-[#090909] shadow-[inset_0_0_0_1px_#333]"
                            aria-hidden="true"
                        />
                        <div
                            className="laptop-screen relative h-full w-full overflow-hidden rounded-[clamp(0.38rem,0.7vw,0.65rem)] bg-[#f9f8f4] text-[#111]"
                            ref={screenRef}
                        >
                            <div
                                className="absolute inset-0 z-[1] flex h-full flex-col justify-between p-[clamp(1rem,3.2vw,2.75rem)]"
                                ref={introPageRef}
                            >
                                <div className="flex items-center justify-between gap-4 text-[clamp(0.42rem,0.8vw,0.72rem)] font-semibold tracking-[0.12em] uppercase">
                                    <span>Portfolio</span>
                                    <span>2026</span>
                                </div>
                                <h2 className="m-0 max-w-[88%] text-[clamp(1.75rem,5vw,4.2rem)] leading-[0.88] tracking-[-0.065em] [font-variation-settings:'wdth'_112,'wght'_750] max-[600px]:max-w-[92%] max-[600px]:text-[clamp(1.45rem,8.5vw,2.6rem)]">
                                    Aspiring AI/ML
                                    <span className="block [font-variation-settings:'wdth'_104,'wght'_540]">
                                        &amp; Software Engineer
                                    </span>
                                </h2>
                                <div className="flex items-center justify-between gap-4 text-[clamp(0.42rem,0.8vw,0.72rem)] font-semibold tracking-[0.12em] uppercase">
                                    <span>Designer &amp; Developer</span>
                                    <span>Scroll to explore</span>
                                </div>
                            </div>
                            <div
                                className="absolute inset-0 z-[2] grid grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] gap-[clamp(0.75rem,3vw,3.5rem)] p-[clamp(1rem,3.2vw,2.75rem)]"
                                ref={aboutPageRef}
                            >
                                <div className="flex min-h-0 flex-col items-center justify-center gap-[clamp(0.8rem,2vw,2rem)] px-[clamp(0.5rem,1.5vw,1.5rem)] py-[clamp(1rem,3vw,3rem)]">
                                    <h2 className="m-0 shrink-0 text-center text-[clamp(3rem,9vw,8.5rem)] leading-[0.78] font-bold tracking-[-0.075em]">
                                        Hey!
                                    </h2>
                                    <img
                                        className="aspect-[4/5] w-[66%] min-w-0 rounded-[clamp(0.35rem,0.8vw,0.8rem)] object-cover object-top grayscale"
                                        src={krishImage}
                                        alt="Portrait of Krish Sapovadia"
                                    />
                                </div>
                                <div className="flex min-w-0 items-center justify-center">
                                    <p className="m-0 max-w-[70%] text-[clamp(0.7rem,1.45vw,1.4rem)] leading-[1.48] font-[560] tracking-[-0.025em] text-[#242424]">
                                        My name is Krish. I am an aspiring developer from North Carolina, currently a student at the North Carolina School of Science and Math. I&apos;m mostly self taught with a strong aptitude in machine learning algorithms and modern system design concepts. I am working with SaaS startups and small businesses to create appealing and functional systems they can use to expand and deliver impact.
                                    </p>
                                </div>
                            </div>
                            <div
                                className="absolute inset-0 z-[3]"
                                ref={projectsPageRef}
                            >
                                <ProjectDesktop />
                            </div>
                        </div>
                    </div>

                    <div
                        className="laptop-hinge absolute top-[calc(100%-0.28rem)] left-[13%] z-[-1] h-[0.7rem] w-[74%] rounded-b-full"
                        aria-hidden="true"
                    />
                    <div
                        className="laptop-base absolute top-[calc(100%-0.2rem)] left-[-6%] z-[-2] h-[58%] w-[112%] overflow-hidden rounded-[0.35rem_0.35rem_1.15rem_1.15rem] border border-black/20"
                        ref={baseRef}
                        aria-hidden="true"
                    >
                        <div className="laptop-speaker laptop-speaker-left absolute top-[9%] left-[5%] h-[42%] w-[8%] opacity-50" />
                        <div className="laptop-keyboard absolute top-[8%] right-[15%] left-[15%] flex h-[44%] flex-col gap-[4.5%] rounded-[0.3rem] bg-[rgb(40_40_40_/_12%)] p-[1.2%] shadow-[inset_0_1px_2px_rgb(0_0_0_/_18%)]">
                            {keyboardRows.map((keyCount, rowIndex) => (
                                <div
                                    className="keyboard-row flex flex-1 gap-[0.65%]"
                                    key={`row-${rowIndex}`}
                                >
                                    {Array.from({ length: keyCount }, (_, keyIndex) => (
                                        <span
                                            className="laptop-key min-w-0 flex-1 rounded-[0.12rem]"
                                            key={`key-${rowIndex}-${keyIndex}`}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="laptop-speaker laptop-speaker-right absolute top-[9%] right-[5%] h-[42%] w-[8%] opacity-50" />
                        <div className="laptop-trackpad absolute bottom-[7%] left-[36.5%] h-[34%] w-[27%] rounded-[0.42rem] border border-[rgb(65_65_65_/_42%)]" />
                        <div className="absolute bottom-[-1px] left-[43%] h-[3.5%] w-[14%] rounded-t-full bg-[rgb(65_65_65_/_52%)]" />
                    </div>
                </div>

                <KeyboardSkillsScene
                    accordionRef={skillsAccordionRef}
                    floatingKeyRefs={floatingKeyRefs}
                    headingRef={skillsHeadingRef}
                    keyBlocksRef={skillsKeyBlocksRef}
                    keyboardRef={keyboardSceneRef}
                    onReveal={revealSkills}
                    sceneRef={skillsSceneRef}
                    sourceKeyRefs={sourceKeyRefs}
                />
            </div>
        </section>
    );
}

export default LaptopParallax;
