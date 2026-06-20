import Navbar from './navbar/Navbar';
import { useEffect, useRef, useState } from 'react';
import computers4ChangeImage from './assets/images/computers4change.png';
import kairsImage from './assets/images/kairs.png';
import artisanalImage from './assets/artisanal_restraunt.png';
import './app.css'

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
        detail: 'Right now I am growing as a full-stack developer while exploring ML with tools like PyTorch. I like projects that mix practical interfaces with smarter systems behind the scenes.'
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
    'Node.js',
    'JavaScript',
    'TypeScript',
    'Python',
    'Django',
    'Git',
    'PyTorch'
];

function App() {
    const bgGridRef = useRef(null);
    const gridContainerRef = useRef(null);
    const mouseFollowRef = useRef(null);
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
    const navbarRef = useRef(null);

    const [contentLoaded, setContentLoaded] = useState(false);
    const [activeAboutStory, setActiveAboutStory] = useState(aboutStories[0].id);
    const [profileImageReady, setProfileImageReady] = useState(true);

    const activeStory = aboutStories.find((story) => story.id === activeAboutStory) ?? aboutStories[0];

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

        // Parallax effect for grid background
        const handleParallax = () => {
            const scrolled = window.pageYOffset;
            const gridContainer = gridContainerRef.current;
            if (gridContainer) {
                gridContainer.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        };

        window.addEventListener('scroll', handleParallax);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleParallax);
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

    // Mouse animation effect - separate useEffect that runs after content loads
    useEffect(() => {
        if (!contentLoaded) return; // Don't run if content isn't loaded yet

        const gridContainer = gridContainerRef.current;
        const mouseFollow = mouseFollowRef.current;

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

        function handleMouseMove(e) {
            if (gridContainer) {
                const rect = gridContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Update CSS custom properties for the light effect
                gridContainer.style.setProperty('--mouse-x', `${x}px`);
                gridContainer.style.setProperty('--mouse-y', `${y}px`);
            }

            // Update mouse follow element
            if (mouseFollow) {
                const followRect = mouseFollow.getBoundingClientRect();
                const halfWidth = followRect.width / 2;
                const halfHeight = followRect.height / 2;
                mouseFollow.style.transform = `translate(${e.clientX - halfWidth}px, ${e.clientY - halfHeight}px)`;
            }
        }

        // Add global mouse move listener for mouse follow
        document.addEventListener('mousemove', handleMouseMove);

        // Cleanup
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);

            projects.forEach(({ element }) => {
                element.removeEventListener('mousemove', showWebImage);
                element.removeEventListener('mouseleave', hideWebImage);
                element.removeEventListener('click', openProject);
            });
        };
    }, [contentLoaded]); // This effect depends on contentLoaded

    return (
        <>
            {contentLoaded ? (
                <>
                    <Navbar ref={navbarRef} />
                    <section className="page" id='home'>
                        <div className="grid-container accent-light" ref={gridContainerRef}>
                            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" ref={bgGridRef}>
                                <defs>
                                    <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                                        <rect width="80" height="80" fill="transparent" />
                                        <path d="M 80 0 L 0 0 0 80" fill="none" stroke="hsla(0, 0%, 95%, 0.1)" strokeWidth="1" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid)" />
                            </svg>
                        </div>
                        <h2 ref={subTitle1Ref} className="scroll-animate fade-up">Aspiring Sowftware Developer & ML Engineer</h2>
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
                                            src="/src/assets/images/profile.jpg"
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
                    <div className="mousefollow" ref={mouseFollowRef}></div>
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
