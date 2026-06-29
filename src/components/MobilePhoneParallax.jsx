import {
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import {
    ChevronDown,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import krishImage from '../assets/krish.jpg';
import artisanalIcon from '../assets/favicon_artisanal.jpg';
import kairsIcon from '../assets/kairs_favicon.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 'artisanal',
        name: 'Artisanal',
        url: 'https://artisanal-restraunt.vercel.app/',
        icon: artisanalIcon,
    },
    {
        id: 'kairs',
        name: 'KAIRS',
        url: 'https://www.kairs.ai/',
        icon: kairsIcon,
    },
];

const skillGroups = [
    ['Web Design', ['React', 'JavaScript', 'TypeScript', 'HTML / CSS', 'Tailwind CSS']],
    ['Systems Design', ['Python', 'FastAPI', 'Django', 'SQL', 'Docker']],
    ['Embedded Systems', ['C / C++', 'Microcontrollers', 'Sensor Integration']],
    ['Miscellaneous', ['PyTorch', 'Machine Learning', 'Git', 'AI Workflows']],
];

function MobileProjects() {
    return (
        <div className="flex h-full flex-col bg-[linear-gradient(160deg,#eef3f3,#cbd9da)] px-5 pt-14 pb-8">
            <p className="m-0 text-[0.6rem] font-semibold tracking-[0.14em] text-black/38 uppercase">
                Selected work
            </p>
            <h2 className="mt-2 mb-0 text-[2.35rem] leading-none font-bold tracking-[-0.075em]">
                Projects
            </h2>
            <div className="mt-9 grid grid-cols-3 gap-3">
                {projects.map((item) => (
                    <a
                        className="flex min-w-0 flex-col items-center text-black no-underline"
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visit ${item.name}`}
                    >
                        <img
                            className="aspect-square w-[min(100%,3.75rem)] rounded-[24%] border border-white/70 object-cover shadow-[0_0.7rem_1.25rem_rgb(40_56_58_/_18%)]"
                            src={item.icon}
                            alt=""
                        />
                        <span className="mt-2 text-xs font-semibold">
                            {item.name}
                        </span>
                    </a>
                ))}
            </div>
            <p className="mt-auto mb-0 text-center text-[0.62rem] leading-relaxed text-black/40">
                Tap an app to visit the live site.
            </p>
        </div>
    );
}

function MobileSkills() {
    const [query, setQuery] = useState('');
    const [revealStage, setRevealStage] = useState('input');
    const [openGroup, setOpenGroup] = useState(0);
    const timeoutRef = useRef(null);

    const revealSkills = (event) => {
        event.preventDefault();
        if (query.trim().toLowerCase() !== 'skills') return;

        setRevealStage('blocks');
        timeoutRef.current = window.setTimeout(() => {
            setRevealStage('heading');
        }, 520);
    };

    useEffect(() => () => {
        if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current);
        }
    }, []);

    if (revealStage !== 'input') {
        return (
            <div className="h-full overflow-y-auto bg-[#f1f0ec] px-5 pt-16 pb-10">
                <div className="flex min-h-20 items-center justify-center">
                    {revealStage === 'blocks' ? (
                        <div className="flex animate-[mobile-skill-blocks_520ms_ease_forwards] gap-1.5">
                            {'SKILLS'.split('').map((letter, index) => (
                                <span
                                    className="grid aspect-square w-10 place-items-center rounded-lg bg-[#171918] text-lg font-bold text-white shadow-lg"
                                    key={`${letter}-${index}`}
                                >
                                    {letter}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <h2 className="m-0 animate-[mobile-heading-in_420ms_ease-out] text-[3.7rem] leading-none font-black tracking-[-0.09em]">
                            SKILLS
                        </h2>
                    )}
                </div>

                {revealStage === 'heading' && (
                    <div className="mt-7">
                        {skillGroups.map(([title, skills], index) => {
                            const isOpen = openGroup === index;
                            return (
                                <article className="border-b border-black/18" key={title}>
                                    <button
                                        className="flex min-h-14 w-full items-center justify-between border-0 bg-transparent py-3 text-left text-[1.4rem] font-semibold tracking-[-0.04em]"
                                        type="button"
                                        onClick={() => setOpenGroup(index)}
                                        aria-expanded={isOpen}
                                    >
                                        {title}
                                        <ChevronDown
                                            className={`size-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                    {isOpen && (
                                        <ul className="m-0 flex list-none flex-wrap gap-2 p-0 pb-4">
                                            {skills.map((skill) => (
                                                <li
                                                    className="rounded-full border border-black/12 bg-white/70 px-3 py-2 text-[0.9rem] font-medium"
                                                    key={skill}
                                                >
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col justify-center bg-[#f1f0ec] px-5 py-12">
            <form className="w-full" onSubmit={revealSkills}>
                <label className="sr-only" htmlFor="mobile-skills-search">
                    Type skills to reveal skills
                </label>
                <div className="flex min-h-14 items-center rounded-full border border-black/12 bg-white/85 px-5 shadow-[0_1rem_2.4rem_rgb(0_0_0_/_13%)]">
                    <input
                        className="min-w-0 flex-1 border-0 bg-transparent font-['Archivo',sans-serif] text-base font-semibold text-black outline-none placeholder:text-black/38"
                        id="mobile-skills-search"
                        type="text"
                        value={query}
                        onChange={(event) => setQuery(event.target.value.slice(0, 10))}
                        placeholder="type 'skills' to reveal"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        enterKeyHint="go"
                    />
                    <button
                        className="ml-2 rounded-full border-0 bg-black px-4 py-2 text-xs font-bold text-white"
                        type="submit"
                    >
                        Enter
                    </button>
                </div>
            </form>
        </div>
    );
}

function MobilePhoneParallax({ onSectionChange }) {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const phoneRef = useRef(null);
    const introRef = useRef(null);
    const aboutRef = useRef(null);
    const projectsRef = useRef(null);
    const skillsRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const context = gsap.context(() => {
            if (reduceMotion) {
                gsap.set([titleRef.current, introRef.current, aboutRef.current, projectsRef.current], {
                    autoAlpha: 0,
                });
                gsap.set(phoneRef.current, { autoAlpha: 1, clearProps: 'transform' });
                gsap.set(skillsRef.current, { autoAlpha: 1, yPercent: 0 });
                onSectionChange?.('work');
                return;
            }

            gsap.set(phoneRef.current, {
                autoAlpha: 0.75,
                rotationY: -12,
                rotationZ: -4,
                scale: 0.58,
                yPercent: -5,
            });
            gsap.set([aboutRef.current, projectsRef.current, skillsRef.current], {
                autoAlpha: 0,
                yPercent: 10,
            });

            const hold = { progress: 0 };
            gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.75,
                    invalidateOnRefresh: true,
                    onUpdate: ({ progress }) => {
                        if (progress > 0.45) onSectionChange?.('work');
                        else if (progress > 0.2) onSectionChange?.('about');
                        else onSectionChange?.('home');
                    },
                },
            })
                .to(titleRef.current, {
                    autoAlpha: 0,
                    yPercent: -12,
                    duration: 0.22,
                }, 0)
                .to(phoneRef.current, {
                    autoAlpha: 1,
                    rotationY: 0,
                    rotationZ: 0,
                    scale: 1,
                    yPercent: 0,
                    duration: 0.75,
                    ease: 'power2.inOut',
                }, 0)
                .to(introRef.current, {
                    autoAlpha: 0,
                    yPercent: -8,
                    duration: 0.18,
                }, 0.68)
                .to(aboutRef.current, {
                    autoAlpha: 1,
                    yPercent: 0,
                    duration: 0.2,
                }, 0.78)
                .to(aboutRef.current, {
                    autoAlpha: 0,
                    yPercent: -8,
                    duration: 0.18,
                }, 1.18)
                .to(projectsRef.current, {
                    autoAlpha: 1,
                    yPercent: 0,
                    duration: 0.2,
                }, 1.28)
                .to(projectsRef.current, {
                    autoAlpha: 0,
                    yPercent: -8,
                    duration: 0.18,
                }, 1.72)
                .to(skillsRef.current, {
                    autoAlpha: 1,
                    yPercent: 0,
                    duration: 0.22,
                }, 1.82)
                .to(hold, {
                    progress: 1,
                    duration: 0.7,
                }, 2.04);
        }, section);

        return () => context.revert();
    }, [onSectionChange]);

    return (
        <section
            className="relative h-[520svh] bg-[#f1f0ec]"
            id="home"
            ref={sectionRef}
        >
            <span className="absolute top-[27%]" id="about" aria-hidden="true" />
            <span className="absolute top-[49%]" id="work" aria-hidden="true" />
            <span className="absolute top-[78%]" id="skills" aria-hidden="true" />

            <div className="sticky top-0 grid h-svh place-items-center overflow-hidden px-3 pt-[max(4.5rem,env(safe-area-inset-top))] pb-10 [perspective:1200px]">
                <h1
                    className="absolute right-0 bottom-[4.25rem] left-0 m-0 whitespace-nowrap text-center font-['Archivo',sans-serif] text-[clamp(2.4rem,11.5vw,3.4rem)] leading-none font-bold tracking-[-0.075em]"
                    ref={titleRef}
                >
                    Krish Sapovadia
                </h1>

                <div
                    className="relative z-[2] aspect-[9/18.7] w-[min(84vw,42svh,22rem)] rounded-[2.65rem] border-[0.55rem] border-[#151716] bg-[#151716] p-[0.18rem] shadow-[0_2.5rem_5rem_rgb(0_0_0_/_28%)]"
                    ref={phoneRef}
                >
                    <div className="relative h-full overflow-hidden rounded-[2rem] bg-[#f8f8f5]">
                        <div className="absolute top-[1.2%] left-1/2 z-30 h-[3.2%] w-[31%] -translate-x-1/2 rounded-full bg-black" />

                        <div
                            className="absolute inset-0 flex flex-col justify-between bg-[#f9f8f4] p-6 pt-12"
                            ref={introRef}
                        >
                            <div className="flex justify-between text-[0.58rem] font-semibold tracking-[0.12em] uppercase">
                                <span>Portfolio</span>
                                <span>2026</span>
                            </div>
                            <h2 className="m-0 text-[2.3rem] leading-[0.9] font-bold tracking-[-0.065em]">
                                AI/ML &amp;
                                <span className="block font-medium">Software Engineer</span>
                            </h2>
                            <p className="m-0 text-[0.58rem] font-semibold tracking-[0.1em] uppercase">
                                Scroll to explore
                            </p>
                        </div>

                        <div
                            className="absolute inset-0 overflow-y-auto bg-[#f9f8f4] px-5 pt-12 pb-8"
                            ref={aboutRef}
                        >
                            <h2 className="m-0 text-[3.6rem] leading-none font-bold tracking-[-0.075em]">
                                Hey!
                            </h2>
                            <div className="mt-5 flex flex-col gap-5">
                                <img
                                    className="aspect-[4/5] w-[72%] self-center rounded-xl object-cover object-top grayscale"
                                    src={krishImage}
                                    alt="Portrait of Krish Sapovadia"
                                />
                                <p className="m-0 text-[clamp(0.92rem,3.8vw,1.05rem)] leading-[1.55] font-medium text-black/75">
                                    My name is Krish. I&apos;m an aspiring developer from North Carolina and a student at NCSSM. I&apos;m mostly self taught, with a strong focus on machine learning and modern system design. I work with startups and small businesses to build useful, appealing systems.
                                </p>
                            </div>
                        </div>

                        <div className="absolute inset-0" ref={projectsRef}>
                            <MobileProjects />
                        </div>

                        <div className="absolute inset-0" ref={skillsRef}>
                            <MobileSkills />
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-[max(0.8rem,env(safe-area-inset-bottom))] left-1/2 flex -translate-x-1/2 items-center gap-2 text-[0.64rem] font-semibold tracking-[0.11em] uppercase">
                    Scroll down
                    <ChevronDown className="size-4 animate-[scroll-nudge_1.4s_ease-in-out_infinite]" />
                </div>
            </div>
        </section>
    );
}

export default MobilePhoneParallax;
