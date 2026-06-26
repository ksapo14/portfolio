import Navbar from './navbar/Navbar';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import CursorGlowBlob from './components/CursorGlowBlob';
import computers4ChangeImage from './assets/images/computers4change.png';
import kairsImage from './assets/images/kairs.png';
import artisanalImage from './assets/artisanal_restraunt.png';
import krishImage from './assets/krish.jpg';
import './app.css';

const aboutStories = [
    {
        id: 'spark',
        eyebrow: '01 / First Spark',
        title: 'First Spark',
        detail: 'Coding started as a class, but it quickly became the place where ideas felt buildable. Python gave me the first push: small scripts, experiments, and the feeling that I could make something useful from nothing.'
    },
    {
        id: 'people',
        eyebrow: '02 / Building for People',
        title: 'Building for People',
        detail: 'The work became more meaningful when it helped other students. I began building websites and applications for organizations that needed a cleaner way to share their mission, manage ideas, or reach more people.'
    },
    {
        id: 'focus',
        eyebrow: '03 / Current Focus',
        title: 'Current Focus',
        detail: 'Right now I\'m growing as a full-stack developer while exploring the use of LLMs and the integration of native ML algorithms into systems. I like mixing practical interfaces with smarter systems behind the scenes.'
    },
    {
        id: 'drive',
        eyebrow: '04 / What Drives Me',
        title: 'What Drives Me',
        detail: 'The best part of building is taking an idea that sounds impossible at first and breaking it into pieces until it becomes real. I care about useful products, clear design, and learning fast enough to keep improving.'
    }
];

const techStack = [
    'React',
    'JavaScript',
    'TypeScript',
    'Python',
    'Django',
    'Git',
    'PyTorch',
    'SQL',
    'FastAPI',
    'Docker',
    'C/C++',
    'AI Workflows',
];

const contactLinks = [
    {
        label: 'GitHub',
        href: 'https://github.com/ksapo14'
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/krish-sapovadia-898b0639a/'
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/krish.sapovadia14/'
    }
];

gsap.registerPlugin(ScrollToPlugin);

function App() {
    const cursorDotRef = useRef(null);
    const kairsRef = useRef(null);
    const comp4changeRef = useRef(null);
    const artisanalRef = useRef(null);
    const loadingRef = useRef(null);
    const mouseFollowImageRef = useRef(null);

    // New refs for scroll animations
    const mainTitleRef = useRef(null);
    const subTitle1Ref = useRef(null);
    const subTitle2Ref = useRef(null);
    const projectsTitleRef = useRef(null);
    const aboutTitleRef = useRef(null);
    const aboutContentRef = useRef(null);
    const aboutImageRef = useRef(null);
    const contactTitleRef = useRef(null);
    const contactContentRef = useRef(null);
    const navbarRef = useRef(null);

    const [contentLoaded, setContentLoaded] = useState(false);
    const [activeAboutStory, setActiveAboutStory] = useState(aboutStories[0].id);
    const [profileImageReady, setProfileImageReady] = useState(true);

    const activeStory = aboutStories.find((story) => story.id === activeAboutStory) ?? aboutStories[0];

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) return;

        gsap.to(window, {
            duration: 0.85,
            ease: 'power3.out',
            overwrite: 'auto',
            scrollTo: {
                y: section,
                offsetY: sectionId === 'home' ? 0 : 16,
                autoKill: true
            }
        });
    };

    // Scroll Animation Hook
    useEffect(() => {
        if (!contentLoaded) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                } else {
                    entry.target.classList.remove('animate-in');
                }
            });
        }, observerOptions);

        // Elements to observe
        const elementsToAnimate = [
            mainTitleRef.current,
            subTitle1Ref.current,
            subTitle2Ref.current,
            projectsTitleRef.current,
            aboutTitleRef.current,
            aboutContentRef.current,
            aboutImageRef.current,
            contactTitleRef.current,
            contactContentRef.current,
            comp4changeRef.current,
            kairsRef.current,
            artisanalRef.current
        ].filter(Boolean);

        elementsToAnimate.forEach((el) => {
            observer.observe(el);
        });

        // Navbar scroll effect
        const handleScroll = () => {
            const navbar = document.querySelector('nav');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, [contentLoaded]);

    // Loading effect
    useEffect(() => {
        const loadingScreen = loadingRef.current;

        const timer = setTimeout(() => {
            setContentLoaded(true);
        }, 1000);

        loadingScreen.style.animation = 'loadingDone 1s forwards';

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!contentLoaded) return;

        const cursorDot = cursorDotRef.current;
        if (!cursorDot) return;

        let animationFrame = null;
        const current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const target = { x: current.x, y: current.y };

        const updateCursor = () => {
            current.x += (target.x - current.x) * 0.35;
            current.y += (target.y - current.y) * 0.35;
            cursorDot.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
            animationFrame = requestAnimationFrame(updateCursor);
        };

        const handlePointerMove = (event) => {
            target.x = event.clientX;
            target.y = event.clientY;
            cursorDot.classList.add('visible');
        };

        const handlePointerLeave = () => {
            cursorDot.classList.remove('visible');
        };

        window.addEventListener('pointermove', handlePointerMove, { passive: true });
        document.addEventListener('mouseleave', handlePointerLeave);
        animationFrame = requestAnimationFrame(updateCursor);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('mouseleave', handlePointerLeave);

            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [contentLoaded]);

    // Project preview cursor effect
    useEffect(() => {
        if (!contentLoaded) return; // Don't run if content isn't loaded yet

        const comp4change = comp4changeRef.current;
        const kairs = kairsRef.current;
        const artisanal = artisanalRef.current;
        const mouseFollowImage = mouseFollowImageRef.current;
        const projects = [
            {
                element: comp4change,
                url: 'https://computers4change.org',
                preview: computers4ChangeImage
            },
            {
                element: kairs,
                url: 'https://kairs.ai',
                preview: kairsImage
            },
            {
                element: artisanal,
                url: 'https://artisanal-restraunt.vercel.app/',
                preview: artisanalImage
            }
        ].filter((project) => project.element);

        function showWebImage(e) {
            const project = projects.find(({ element }) => element === e.currentTarget);
            if (!project) return;

            mouseFollowImage.style.display = "block";
            mouseFollowImage.style.width = "320px";
            mouseFollowImage.style.height = "190px";
            mouseFollowImage.style.backgroundImage = `url('${project.preview}')`;
            mouseFollowImage.style.position = "fixed";
            mouseFollowImage.style.pointerEvents = "none";
            mouseFollowImage.style.left = `${e.clientX - 160}px`;
            mouseFollowImage.style.top = `${e.clientY - 95}px`;
        }

        function hideWebImage() {
            mouseFollowImage.style.backgroundImage = '';
            mouseFollowImage.style.display = 'none';
        }

        function openProject(e) {
            const project = projects.find(({ element }) => element === e.currentTarget);
            if (project) {
                window.open(project.url, '_blank');
            }
        }

        projects.forEach(({ element }) => {
            element.addEventListener('mousemove', showWebImage);
            element.addEventListener('mouseleave', hideWebImage);
            element.addEventListener('click', openProject);
        });

        // Cleanup
        return () => {
            projects.forEach(({ element }) => {
                element.removeEventListener('mousemove', showWebImage);
                element.removeEventListener('mouseleave', hideWebImage);
                element.removeEventListener('click', openProject);
            });
        };
    }, [contentLoaded]); // This effect depends on contentLoaded

    function handleContactSubmit(e) {
        e.preventDefault();
    }

    return (
        <>
            {contentLoaded ? (
                <>
                    <Navbar ref={navbarRef} onNavigate={scrollToSection} />
                    <main className="site-flow">
                        <div className="ambient-backdrop" aria-hidden="true"></div>
                        <div className="cursor-dot" ref={cursorDotRef} aria-hidden="true"></div>
                        <CursorGlowBlob
                            size={270}
                            particleCount={34}
                            color="255, 94, 89"
                            accentColor="255, 146, 122"
                            opacity={1.38}
                            blur={36}
                            stiffness={0.08}
                            damping={0.82}
                            edgeStrength={1.2}
                            ambientStrength={1.18}
                            zIndex={0}
                            blendMode="screen"
                        />

                        <section className="page hero" id='home'>
                            <h2 ref={subTitle1Ref} className="scroll-animate fade-up">Aspiring AI/ML and Software Engineer</h2>
                            <h1 ref={mainTitleRef} className='mainTitle scroll-animate scale-up'>Krish Sapovadia</h1>
                            <h2 ref={subTitle2Ref} className="scroll-animate fade-up delay-1">Taking students ideas and making them realities.</h2>
                            <div className="circle"></div>
                            <div className="circle"></div>
                        </section>

                        <section className="page about" id='about'>
                            <div className="about-container">
                                <div className="about-text">
                                    <h1 ref={aboutTitleRef} className="scroll-animate slide-left">About Me</h1>
                                    <div ref={aboutContentRef} className="about-content scroll-animate fade-up delay-1">
                                        <p className="about-lede">
                                            I am a high school student building software that helps ideas move from sketch to shipped. I care about clean interfaces, useful tools, and learning the systems behind the products I want to create.
                                        </p>
                                        <div className="about-story-grid">
                                            <div className="about-story-list" aria-label="About story chapters">
                                                {aboutStories.map((story) => (
                                                    <button
                                                        key={story.id}
                                                        type="button"
                                                        className={`about-story-card ${activeAboutStory === story.id ? 'active' : ''}`}
                                                        onClick={() => setActiveAboutStory(story.id)}
                                                        aria-pressed={activeAboutStory === story.id}
                                                    >
                                                        <strong>{story.title}</strong>
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="about-story-detail" aria-live="polite">
                                                <span>{activeStory.eyebrow}</span>
                                                <h3>{activeStory.title}</h3>
                                                <p>{activeStory.detail}</p>
                                            </div>
                                        </div>
                                        <div className="skills-section">
                                            <h3>Tech Stack</h3>
                                            <ul className="skills-list">
                                                {techStack.map((skill) => (
                                                    <li
                                                        key={skill}
                                                        className="skill-tag"
                                                        tabIndex="0"
                                                    >
                                                        {skill}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="about-side">
                                    <div ref={aboutImageRef} className="about-image scroll-animate scale-up delay-2">
                                        {profileImageReady ? (
                                            <img
                                                src={krishImage}
                                                alt="Krish Sapovadia"
                                                onError={() => setProfileImageReady(false)}
                                            />
                                        ) : (
                                            <div className="profile-placeholder">
                                                <div className="profile-initials">KS</div>
                                                <p>Profile photo ready</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="page projects" id='projects'>
                            <h1 ref={projectsTitleRef} className="scroll-animate slide-left">Projects</h1>
                            <button className='project-card scroll-animate slide-right delay-1' ref={comp4changeRef}>
                                <h1>Computers4Change - Tech Recycling for All</h1>
                            </button>
                            <button className='project-card scroll-animate slide-right delay-2' ref={kairsRef}>
                                <h1>Kairs - The AI Based Knee Brace</h1>
                            </button>
                            <button className='project-card scroll-animate slide-right delay-3' ref={artisanalRef}>
                                <h1>Artisanal Restraunt</h1>
                            </button>
                            <div className="mouse-follow-image" ref={mouseFollowImageRef}></div>
                        </section>

                        <section className="page contact" id='contact'>
                            <div className="contact-container">
                                <div className="contact-copy">
                                    <span className="contact-eyebrow">Open to collaborate</span>
                                    <h1 ref={contactTitleRef} className="scroll-animate slide-left">Contact</h1>
                                    <p>
                                        Have an idea, project, or internship opportunity? Send the details and I will get back to you.
                                    </p>
                                    <div className="contact-details" aria-label="Contact details">
                                        <p>Email: kcsapovadia@gmail.com</p>
                                        <p>Phone: 704-677-2939</p>
                                    </div>
                                    <div className="contact-links" aria-label="Direct contact links">
                                        {contactLinks.map((link) => (
                                            link.href ? (
                                                <a
                                                    key={link.label}
                                                    href={link.href}
                                                    target={link.href.startsWith('http') ? '_blank' : undefined}
                                                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                                                >
                                                    {link.label}
                                                </a>
                                            ) : (
                                                <button key={link.label} type="button" disabled>
                                                    {link.label}
                                                </button>
                                            )
                                        ))}
                                    </div>
                                </div>

                                <form ref={contactContentRef} className="contact-form scroll-animate fade-up delay-1" onSubmit={handleContactSubmit}>
                                    <div className="form-row">
                                        <label htmlFor="contact-name">
                                            Name
                                            <input id="contact-name" name="name" type="text" autoComplete="name" required />
                                        </label>
                                        <label htmlFor="contact-email">
                                            Email
                                            <input id="contact-email" name="email" type="email" autoComplete="email" required />
                                        </label>
                                    </div>

                                    <div className="form-row">
                                        <label htmlFor="contact-subject">
                                            Subject
                                            <input id="contact-subject" name="subject" type="text" required />
                                        </label>
                                        <label htmlFor="contact-type">
                                            Type
                                            <select id="contact-type" name="type" defaultValue="project">
                                                <option value="project">Project</option>
                                                <option value="internship">Internship</option>
                                                <option value="collaboration">Collaboration</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </label>
                                    </div>

                                    <label htmlFor="contact-message">
                                        Message
                                        <textarea id="contact-message" name="message" rows="6" required />
                                    </label>

                                    <button type="submit" className="contact-submit">Send Message</button>
                                </form>
                            </div>
                        </section>
                    </main>
                </>
            ) : (
                <div className="loading-screen" ref={loadingRef}>
                    <h1>Loading...</h1>
                </div>
            )}
        </>
    );
}

export default App;
