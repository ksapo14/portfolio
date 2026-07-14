import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { ReactLenis } from 'lenis/react';
import {
    motion as Motion,
    useReducedMotion,
    useScroll,
    useSpring,
} from 'motion/react';
import artisanalPreview from './assets/artisanal_restraunt-optimized.jpg';
import heroWorkbench from './assets/hero-workbench.jpg';
import kairsPreview from './assets/images/kairs.png';
import krishImage from './assets/krish.jpg';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/navbar/Navbar';

const projects = [
    {
        name: 'Artisanal',
        number: '01',
        description: 'A cinematic restaurant website built around atmosphere, clear navigation, and an editorial sense of pace.',
        details: ['Web design', 'Frontend development', '2026'],
        image: artisanalPreview,
        imageAlt: 'Artisanal restaurant website homepage',
        url: 'https://artisanal-restraunt.vercel.app/',
        theme: 'warm',
    },
    {
        name: 'KAIRS',
        number: '02',
        description: 'A clean product website that introduces a wearable knee-support concept with direct, accessible storytelling.',
        details: ['Product website', 'Responsive UI', '2026'],
        image: kairsPreview,
        imageAlt: 'KAIRS product website homepage',
        url: 'https://www.kairs.ai/',
        theme: 'cool',
    },
];

const capabilities = [
    {
        number: '01',
        title: 'Product interfaces',
        body: 'Responsive React experiences with a strong focus on hierarchy, interaction, and usability.',
    },
    {
        number: '02',
        title: 'Software systems',
        body: 'Python backends, REST APIs, SQL, and practical system design for useful products.',
    },
    {
        number: '03',
        title: 'Machine learning',
        body: 'Model experimentation and AI workflows using Python, PyTorch, and data-driven iteration.',
    },
];

const toolGroups = [
    ['Languages', 'JavaScript, TypeScript, Python, C / C++, SQL'],
    ['Frontend', 'React, HTML, CSS, Tailwind CSS'],
    ['Backend', 'FastAPI, Django, REST APIs, Docker'],
    ['ML + tools', 'PyTorch, Git, AI workflows, embedded systems'],
];

function Reveal({ children, className = '', delay = 0 }) {
    const reduceMotion = useReducedMotion();

    return (
        <Motion.div
            className={className}
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{
                duration: 0.72,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </Motion.div>
    );
}

function App() {
    const [activeSection, setActiveSection] = useState('home');
    const [introComplete, setIntroComplete] = useState(false);
    const [introVisible, setIntroVisible] = useState(true);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, {
        stiffness: 140,
        damping: 28,
        mass: 0.35,
    });

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
                rootMargin: '-30% 0px -55%',
                threshold: [0, 0.2, 0.5, 0.8],
            },
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    return (
        <ReactLenis
            root
            options={{
                anchors: {
                    offset: -96,
                    duration: reduceMotion ? 0 : 1.25,
                },
                autoRaf: true,
                duration: 1.45,
                easing: (time) => 1 - Math.pow(1 - time, 4),
                smoothWheel: !reduceMotion,
                syncTouch: false,
                touchMultiplier: 1.15,
                wheelMultiplier: 0.95,
            }}
        >
            {introVisible && (
                <LoadingScreen
                    onReveal={() => setIntroComplete(true)}
                    onComplete={() => setIntroVisible(false)}
                />
            )}
            <a className="skip-link" href="#main-content">
                Skip to content
            </a>
            <Motion.div
                className="scroll-progress"
                style={{ scaleX: progress }}
                aria-hidden="true"
            />
            <Navbar activeSection={activeSection} />

            <main id="main-content" aria-busy={!introComplete}>
                <section
                    className="hero section-shell"
                    id="home"
                    data-section
                    aria-labelledby="hero-title"
                >
                    <div className="hero-grid">
                        <div className="hero-intro">
                            <Motion.p
                                className="eyebrow hero-eyebrow"
                                initial={false}
                                animate={
                                    introComplete || reduceMotion
                                        ? { opacity: 1, y: 0 }
                                        : { opacity: 0, y: 12 }
                                }
                                transition={{ duration: 0.5, delay: 0.08 }}
                            >
                                Software + ML engineer
                            </Motion.p>
                            <Motion.h1
                                id="hero-title"
                                initial={false}
                                animate={
                                    introComplete || reduceMotion
                                        ? { opacity: 1, y: 0 }
                                        : { opacity: 0, y: 34 }
                                }
                                transition={{
                                    duration: 0.85,
                                    delay: 0.14,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                I build useful
                                <span>digital products.</span>
                            </Motion.h1>
                        </div>

                        <Motion.div
                            className="hero-art-wrap"
                            initial={false}
                            animate={
                                introComplete || reduceMotion
                                    ? { opacity: 1, scale: 1, y: 0 }
                                    : { opacity: 0, scale: 0.94, y: 28 }
                            }
                            transition={{
                                duration: 0.85,
                                delay: 0.28,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <img
                                className="hero-art"
                                src={heroWorkbench}
                                alt="A developer workbench with a laptop, microcontroller, keyboard, and machine-learning sketches"
                            />
                            <span className="hero-art-caption">
                                Built from curiosity
                                <small>Software / ML / systems</small>
                            </span>
                        </Motion.div>

                        <Motion.div
                            className="hero-summary"
                            initial={false}
                            animate={
                                introComplete || reduceMotion
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 18 }
                            }
                            transition={{ duration: 0.65, delay: 0.45 }}
                        >
                            <p>
                                Student developer at NCSSM working across web
                                engineering, software systems, and machine learning.
                            </p>
                            <a className="text-link" href="#work">
                                Selected work
                                <ArrowDown aria-hidden="true" />
                            </a>
                        </Motion.div>
                    </div>

                    <div className="hero-rule" aria-hidden="true">
                        <span>Portfolio / 2026</span>
                        <span>Scroll to explore</span>
                    </div>
                </section>

                <section
                    className="work-section"
                    id="work"
                    data-section
                    aria-labelledby="work-title"
                >
                    <div className="section-shell">
                        <Reveal className="section-heading work-heading">
                            <p className="eyebrow">Selected work</p>
                            <h2 id="work-title">
                                Built with purpose,
                                <em>not decoration.</em>
                            </h2>
                            <p>
                                A small selection of digital experiences designed
                                and developed from concept through launch.
                            </p>
                        </Reveal>

                        <div className="project-list">
                            {projects.map((project, index) => (
                                <Reveal
                                    className={`project project-${project.theme}`}
                                    delay={index * 0.08}
                                    key={project.name}
                                >
                                    <a
                                        className="project-visual"
                                        href={project.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={`Visit ${project.name} website`}
                                    >
                                        <img
                                            src={project.image}
                                            alt={project.imageAlt}
                                        />
                                        <span className="project-open">
                                            View live
                                            <ArrowUpRight aria-hidden="true" />
                                        </span>
                                    </a>
                                    <div className="project-copy">
                                        <div className="project-title-row">
                                            <span>{project.number}</span>
                                            <h3>{project.name}</h3>
                                        </div>
                                        <p>{project.description}</p>
                                        <ul aria-label={`${project.name} project details`}>
                                            {project.details.map((detail) => (
                                                <li key={detail}>{detail}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    className="about-section section-shell"
                    id="about"
                    data-section
                    aria-labelledby="about-title"
                >
                    <Reveal className="about-lead">
                        <p className="eyebrow">About</p>
                        <h2 id="about-title">
                            Curious by nature.
                            <em>Practical by default.</em>
                        </h2>
                    </Reveal>

                    <div className="about-grid">
                        <Reveal className="about-sticky">
                            <figure>
                                <img
                                    src={krishImage}
                                    alt="Portrait of Krish Sapovadia"
                                />
                                <figcaption>
                                    <MapPin aria-hidden="true" />
                                    North Carolina
                                </figcaption>
                            </figure>
                        </Reveal>

                        <div className="about-content">
                            <Reveal>
                                <p className="about-statement">
                                    I&apos;m Krish, a student and self-taught
                                    developer who likes turning complex ideas into
                                    focused, dependable software.
                                </p>
                                <p className="about-body">
                                    I study at the North Carolina School of Science
                                    and Mathematics, where I continue to build depth
                                    in computer science and machine learning. I also
                                    work with startups and small businesses to make
                                    digital products clearer, more useful, and easier
                                    to use.
                                </p>
                            </Reveal>

                            <div className="capability-list">
                                {capabilities.map((item, index) => (
                                    <Reveal
                                        className="capability"
                                        delay={index * 0.06}
                                        key={item.title}
                                    >
                                        <span>{item.number}</span>
                                        <div>
                                            <h3>{item.title}</h3>
                                            <p>{item.body}</p>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Reveal className="toolkit">
                        <p className="eyebrow">Toolkit</p>
                        <div className="tool-grid">
                            {toolGroups.map(([title, tools]) => (
                                <div key={title}>
                                    <h3>{title}</h3>
                                    <p>{tools}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </section>

                <section
                    className="contact-section"
                    id="contact"
                    data-section
                    aria-labelledby="contact-title"
                >
                    <div className="section-shell contact-inner">
                        <Reveal>
                            <p className="eyebrow">Start a conversation</p>
                            <h2 id="contact-title">
                                Have something
                                <em>worth building?</em>
                            </h2>
                        </Reveal>

                        <Reveal className="contact-bottom" delay={0.08}>
                            <p>
                                I&apos;m interested in software, ML, and product
                                opportunities where I can contribute, learn, and
                                ship meaningful work.
                            </p>
                            <a
                                className="contact-button"
                                href="mailto:kcsapovadia@gmail.com"
                            >
                                <Mail aria-hidden="true" />
                                kcsapovadia@gmail.com
                                <ArrowUpRight aria-hidden="true" />
                            </a>
                        </Reveal>
                    </div>
                </section>
            </main>

            <Footer />
        </ReactLenis>
    );
}

export default App;
