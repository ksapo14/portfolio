import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import {
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Mail,
    MapPin,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis } from 'lenis/react';
import artisanalPreview from './assets/artisanal_restraunt_updated.png';
import curiousIdeasImage from './assets/generated/curious-ideas.webp';
import krishCutout from './assets/generated/krish-cutout.webp';
import principleClarity from './assets/generated/principle-clarity.webp';
import principleFinish from './assets/generated/principle-finish.webp';
import principleUseful from './assets/generated/principle-useful.webp';
import heroWorkbench from './assets/hero-workbench.jpg';
import imagineerPreview from './assets/imagineer.png';
import kairsPreview from './assets/images/kairs.png';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/navbar/Navbar';
import './app.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
    {
        name: 'Artisanal',
        description:
            'A cinematic restaurant experience shaped around appetite, atmosphere, and an editorial sense of pace.',
        services: ['Direction', 'UI design', 'Frontend'],
        image: artisanalPreview,
        imageAlt: 'Artisanal restaurant website homepage',
        url: 'https://artisanal-restraunt.vercel.app/',
        theme: 'terracotta',
        year: '2026',
    },
    {
        name: 'KAIRS',
        description:
            'A focused product story for a wearable knee-support concept, built to make complex health technology feel clear.',
        services: ['Product story', 'Responsive UI', 'Development'],
        image: kairsPreview,
        imageAlt: 'KAIRS product website homepage',
        url: 'https://www.kairs.ai/',
        theme: 'mineral',
        year: '2026',
    },
    {
        name: 'Imagineer',
        description:
            'A live classroom assistant that listens to discussion and turns spoken ideas into visual explanations as they unfold.',
        services: ['Product concept', 'AI experience', 'Frontend'],
        image: imagineerPreview,
        imageAlt: 'Imagineer AI classroom assistant homepage',
        url: 'https://imaginev1.kcsapovadia.chatgpt.site/',
        theme: 'lime',
        year: '2026',
    },
];

const capabilities = [
    {
        title: 'Product interfaces',
        body: 'Responsive React experiences with deliberate hierarchy, interaction, and accessibility.',
        detail: 'React / JavaScript / TypeScript',
        className: 'capability-product',
    },
    {
        title: 'Software systems',
        body: 'Practical backends, APIs, and data layers designed to stay understandable as they grow.',
        detail: 'Python / FastAPI / Django / SQL',
        className: 'capability-systems',
    },
    {
        title: 'Machine learning',
        body: 'Model experiments and AI workflows grounded in iteration, evaluation, and useful outcomes.',
        detail: 'PyTorch / Python',
        className: 'capability-ml',
    },
    {
        title: 'From idea to shipped',
        body: 'I move between product thinking and implementation, helping small teams turn rough concepts into coherent, working experiences.',
        detail: 'Design thinking / Git / Docker',
        className: 'capability-shipped',
    },
];

const toolkit = [
    'React',
    'TypeScript',
    'Python',
    'FastAPI',
    'PyTorch',
    'Django',
    'SQL',
    'Docker',
    'GSAP',
    'Tailwind CSS',
    'C / C++',
    'Git',
    'Tauri',
];

const principles = [
    {
        title: 'Clarity earns attention.',
        body: 'The best interface is not the loudest one. I reduce an idea to the few decisions that help someone understand it, trust it, and move.',
        focus: 'Hierarchy, language, interaction',
    },
    {
        title: 'Useful beats impressive.',
        body: 'Technical ambition matters most when it solves a real problem. I look for the smallest dependable system that can create a meaningful result.',
        focus: 'Systems thinking, iteration, outcomes',
    },
    {
        title: 'Curiosity needs a finish line.',
        body: 'Experimentation is part of my process, but shipping is the goal. I test ideas quickly, learn from the result, and keep the final experience focused.',
        focus: 'Prototyping, feedback, delivery',
    },
];

function usePrefersReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
        window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        );
        const updatePreference = (event) => {
            setPrefersReducedMotion(event.matches);
        };

        mediaQuery.addEventListener('change', updatePreference);
        return () => mediaQuery.removeEventListener('change', updatePreference);
    }, []);

    return prefersReducedMotion;
}

function App() {
    const siteRef = useRef(null);
    const [activeSection, setActiveSection] = useState('home');
    const [introComplete, setIntroComplete] = useState(false);
    const [introVisible, setIntroVisible] = useState(true);
    const [principleIndex, setPrincipleIndex] = useState(0);
    const reduceMotion = usePrefersReducedMotion();

    useEffect(() => {
        const sections = [...document.querySelectorAll('[data-section]')];
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visible[0]) {
                    setActiveSection(visible[0].target.id);
                }
            },
            {
                rootMargin: '-32% 0px -54%',
                threshold: [0, 0.25, 0.55, 0.8],
            },
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    useGSAP(
        () => {
            if (!introComplete && !reduceMotion) {
                return;
            }

            const scrollProgress = gsap.to('.scroll-progress', {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.15,
                },
            });

            if (reduceMotion) {
                gsap.set(
                    [
                        '.site-header',
                        '.hero-kicker',
                        '.hero-line',
                        '.hero-lede',
                        '.hero-actions',
                        '.hero-context',
                    ],
                    { clearProps: 'all' },
                );
                return () => scrollProgress.kill();
            }

            const introTimeline = gsap.timeline({
                defaults: { ease: 'power4.out' },
            });

            introTimeline
                .fromTo(
                    '.site-header',
                    { autoAlpha: 0, y: -28 },
                    { autoAlpha: 1, y: 0, duration: 0.7 },
                )
                .fromTo(
                    '.hero-kicker',
                    { autoAlpha: 0, y: 16 },
                    { autoAlpha: 1, y: 0, duration: 0.55 },
                    0.08,
                )
                .fromTo(
                    '.hero-line',
                    { yPercent: 112 },
                    {
                        yPercent: 0,
                        duration: 1.05,
                        stagger: 0.1,
                    },
                    0.12,
                )
                .fromTo(
                    ['.hero-lede', '.hero-actions', '.hero-context'],
                    { autoAlpha: 0, y: 24 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.75,
                        stagger: 0.08,
                    },
                    0.38,
                )
                .fromTo(
                    '.hero-media img',
                    { scale: 1.12 },
                    { scale: 1, duration: 1.6 },
                    0,
                );

            gsap.utils.toArray('.reveal-item').forEach((item) => {
                gsap.fromTo(
                    item,
                    { autoAlpha: 0, y: 54 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.9,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 86%',
                            once: true,
                        },
                    },
                );
            });

            const projectCards = gsap.utils.toArray('.project-card');

            projectCards.forEach((card, index) => {
                gsap.set(card, { zIndex: index + 1 });

                gsap.fromTo(
                    card,
                    {
                        autoAlpha: 0,
                        scale: 0.94,
                        y: 96,
                    },
                    {
                        autoAlpha: 1,
                        scale: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power3.out',
                        overwrite: 'auto',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 88%',
                            once: true,
                        },
                    },
                );
            });

            gsap.fromTo(
                '.about-inline-image img',
                { scale: 1.25, yPercent: -10 },
                {
                    scale: 1,
                    yPercent: 10,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.about-heading',
                        start: 'top 88%',
                        end: 'bottom 25%',
                        scrub: 0.8,
                    },
                },
            );

            return () => {
                introTimeline.kill();
                scrollProgress.kill();
            };
        },
        {
            dependencies: [introComplete, reduceMotion],
            revertOnUpdate: true,
            scope: siteRef,
        },
    );

    const changePrinciple = (direction) => {
        setPrincipleIndex(
            (current) =>
                (current + direction + principles.length) % principles.length,
        );
    };

    const activePrinciple = principles[principleIndex];

    return (
        <ReactLenis
            root
            options={{
                anchors: {
                    offset: -88,
                    duration: reduceMotion ? 0 : 1.2,
                },
                autoRaf: true,
                duration: 1.25,
                easing: (time) => 1 - Math.pow(1 - time, 4),
                smoothWheel: !reduceMotion,
                syncTouch: false,
                touchMultiplier: 1.1,
                wheelMultiplier: 0.92,
            }}
        >
            <div className="site" ref={siteRef}>
                {introVisible && (
                    <LoadingScreen
                        onReveal={() => setIntroComplete(true)}
                        onComplete={() => setIntroVisible(false)}
                    />
                )}

                <a className="skip-link" href="#main-content">
                    Skip to content
                </a>

                <div className="scroll-progress" aria-hidden="true" />
                <Navbar activeSection={activeSection} />

                <main
                    className="site-main overflow-x-hidden w-full max-w-full"
                    id="main-content"
                    aria-busy={!introComplete}
                >
                    <section
                        className="hero"
                        id="home"
                        data-section
                        aria-labelledby="hero-title"
                    >
                        <div className="hero-media" aria-hidden="true">
                            <img src={heroWorkbench} alt="" />
                        </div>
                        <div className="hero-wash" aria-hidden="true" />

                        <div className="section-shell hero-content">
                            <p className="hero-kicker">
                                Software + machine learning engineer
                            </p>

                            <h1 className="hero-title max-w-6xl" id="hero-title">
                                <span className="hero-line-window">
                                    <span className="hero-line">Useful systems.</span>
                                </span>
                                <span className="hero-line-window">
                                    <span className="hero-line hero-line-accent">
                                        Better design.
                                    </span>
                                </span>
                            </h1>

                            <p className="hero-lede">
                                I&apos;m Krish Sapovadia, a student engineer in
                                North Carolina building thoughtful web products,
                                dependable software, and practical AI experiments.
                            </p>

                            <div className="hero-actions">
                                <a className="button button-light" href="#work">
                                    Explore selected work
                                    <ArrowDown aria-hidden="true" />
                                </a>
                                <a
                                    className="button button-ghost"
                                    href="mailto:kcsapovadia@gmail.com"
                                >
                                    Start a conversation
                                    <ArrowUpRight aria-hidden="true" />
                                </a>
                            </div>
                        </div>

                        <div className="hero-context section-shell">
                            <span>NCSSM / North Carolina</span>
                            <span>Design-minded engineering</span>
                        </div>
                    </section>

                    <section
                        className="capabilities-section chapter"
                        id="capabilities"
                        data-section
                        aria-labelledby="capabilities-title"
                    >
                        <div className="section-shell">
                            <div className="chapter-heading reveal-item">
                                <p className="chapter-kicker">
                                    Where I do my best work
                                </p>
                                <h2 id="capabilities-title">
                                    One builder,
                                    <br />
                                    multiple layers.
                                </h2>
                                <p>
                                    I combine interface craft with systems thinking,
                                    moving from an early idea to the details that make
                                    it usable.
                                </p>
                            </div>

                            <div className="capability-bento">
                                {capabilities.map((capability) => (
                                    <article
                                        className={`capability-card reveal-item ${capability.className}`}
                                        key={capability.title}
                                    >
                                        <div>
                                            <h3>{capability.title}</h3>
                                            <p>{capability.body}</p>
                                        </div>
                                        <span>{capability.detail}</span>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <div className="toolkit-marquee" aria-label="Technical toolkit">
                            <div className="marquee-track">
                                <div className="marquee-group">
                                    {toolkit.map((tool) => (
                                        <span key={tool}>{tool}</span>
                                    ))}
                                </div>
                                <div className="marquee-group" aria-hidden="true">
                                    {toolkit.map((tool) => (
                                        <span key={tool}>{tool}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section
                        className="work-section chapter"
                        id="work"
                        data-section
                        aria-labelledby="work-title"
                    >
                        <div className="section-shell work-layout">
                            <div className="work-intro">
                                <p className="chapter-kicker">
                                    A focused selection
                                </p>
                                <h2 id="work-title">
                                    Work built
                                    <br />
                                    to be used.
                                </h2>
                                <p>
                                    Product stories and interfaces taken from first
                                    structure through working, responsive builds.
                                </p>
                                <a className="text-link light-link" href="#about">
                                    More about my approach
                                    <ArrowDown aria-hidden="true" />
                                </a>
                            </div>

                            <div className="project-rail">
                                {projects.map((project) => (
                                    <article
                                        className={`project-card project-${project.theme}`}
                                        key={project.name}
                                    >
                                        <a
                                            className="project-link"
                                            href={project.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label={`Open the ${project.name} website`}
                                        >
                                            <div className="project-image">
                                                <img
                                                    src={project.image}
                                                    alt={project.imageAlt}
                                                />
                                                <span className="project-open">
                                                    View live
                                                    <ArrowUpRight aria-hidden="true" />
                                                </span>
                                            </div>

                                            <div className="project-copy">
                                                <div>
                                                    <h3>{project.name}</h3>
                                                    <p>{project.description}</p>
                                                </div>
                                                <div className="project-meta">
                                                    <ul
                                                        aria-label={`${project.name} services`}
                                                    >
                                                        {project.services.map(
                                                            (service) => (
                                                                <li key={service}>
                                                                    {service}
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                    <span>{project.year}</span>
                                                </div>
                                            </div>
                                        </a>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section
                        className="about-section chapter"
                        id="about"
                        data-section
                        aria-labelledby="about-title"
                    >
                        <div className="section-shell">
                            <p className="chapter-kicker reveal-item">
                                The person behind the work
                            </p>

                            <h2
                                className="about-heading reveal-item"
                                id="about-title"
                            >
                                I turn curious
                                <span
                                    className="about-inline-image"
                                    aria-hidden="true"
                                >
                                    <img src={curiousIdeasImage} alt="" />
                                </span>
                                ideas into focused software that people can
                                actually use.
                            </h2>

                            <div className="about-grid">
                                <figure className="about-portrait reveal-item">
                                    <div className="portrait-frame">
                                        <img
                                            src={krishCutout}
                                            alt="Portrait of Krish Sapovadia"
                                        />
                                    </div>
                                    <figcaption>
                                        <MapPin aria-hidden="true" />
                                        North Carolina
                                    </figcaption>
                                </figure>

                                <div className="about-copy reveal-item">
                                    <p className="about-lead">
                                        I&apos;m a student and self-taught developer
                                        who enjoys finding the useful idea inside a
                                        complicated problem.
                                    </p>
                                    <p>
                                        At the North Carolina School of Science and
                                        Mathematics, I&apos;m building depth in
                                        computer science and machine learning. Beyond
                                        class, I work with startups and small
                                        businesses to make digital products clearer,
                                        more dependable, and easier to use.
                                    </p>
                                    <p>
                                        My range spans responsive interfaces, Python
                                        backends, APIs, data, embedded systems, and ML
                                        experimentation. The common thread is simple:
                                        understand the problem, build deliberately,
                                        and finish well.
                                    </p>
                                </div>
                            </div>

                            <div
                                className="principles-carousel reveal-item"
                                aria-live="polite"
                            >
                                <div className="principle-visuals" aria-hidden="true">
                                    <span>
                                        <img src={principleClarity} alt="" />
                                    </span>
                                    <span>
                                        <img src={principleUseful} alt="" />
                                    </span>
                                    <span>
                                        <img src={principleFinish} alt="" />
                                    </span>
                                </div>

                                <div
                                    className="principle-copy"
                                    key={activePrinciple.title}
                                >
                                    <p>What I optimize for</p>
                                    <blockquote>
                                        “{activePrinciple.title}”
                                    </blockquote>
                                    <p>{activePrinciple.body}</p>
                                    <span>{activePrinciple.focus}</span>
                                </div>

                                <div className="carousel-controls">
                                    <button
                                        type="button"
                                        onClick={() => changePrinciple(-1)}
                                        aria-label="Previous principle"
                                    >
                                        <ArrowLeft aria-hidden="true" />
                                    </button>
                                    <span>
                                        {principleIndex + 1} / {principles.length}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => changePrinciple(1)}
                                        aria-label="Next principle"
                                    >
                                        <ArrowRight aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section
                        className="contact-section"
                        id="contact"
                        data-section
                        aria-labelledby="contact-title"
                    >
                        <div className="contact-glow" aria-hidden="true" />
                        <div className="section-shell contact-inner">
                            <div className="contact-top reveal-item">
                                <p className="chapter-kicker">
                                    Open to thoughtful opportunities
                                </p>
                                <span>Have a project, role, or ambitious idea?</span>
                            </div>

                            <h2 className="reveal-item" id="contact-title">
                                Let&apos;s build something
                                <em>worth using.</em>
                            </h2>

                            <div className="contact-bottom reveal-item">
                                <p>
                                    I&apos;m interested in software, ML, and product
                                    work where I can contribute, learn, and ship
                                    meaningful things with a strong team.
                                </p>
                                <a
                                    className="contact-button"
                                    href="mailto:kcsapovadia@gmail.com"
                                >
                                    <Mail aria-hidden="true" />
                                    <span>
                                        Start with an email
                                        <small>kcsapovadia@gmail.com</small>
                                    </span>
                                    <ArrowUpRight aria-hidden="true" />
                                </a>
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </ReactLenis>
    );
}

export default App;
