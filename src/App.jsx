import Navbar from './navbar/Navbar';
import { useEffect, useRef, useState } from 'react';
import './app.css'

function App() {
    const bgGridRef = useRef(null);
    const gridContainerRef = useRef(null);
    const mouseFollowRef = useRef(null);
    const kairsRef = useRef(null);
    const comp4changeRef = useRef(null);
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
            kairsRef.current
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
        const mouseFollowImage = mouseFollowImageRef.current;

        function showWebImage(e) {
            const kairsImage = "src/assets/images/kairs.png";

            const img1 = new Image();
            img1.src = kairsImage;
            // Show the image and set its source depending on the hovered element
            mouseFollowImage.style.display = "block";
            mouseFollowImage.style.width = `${img1.width / 10}px`;
            mouseFollowImage.style.height = `${img1.height / 10}px`;

            if (e.target === comp4change) {
                mouseFollowImage.style.backgroundImage = "url('src/assets/images/computers4change.png')";
            } else if (e.target === kairs) {
                mouseFollowImage.style.backgroundImage = "url('src/assets/images/kairs.png')";
            }

            // Position the image at the mouse cursor
            mouseFollowImage.style.position = "fixed";
            mouseFollowImage.style.pointerEvents = "none";
            mouseFollowImage.style.left = `${e.clientX - 100}px`; // Center the image
            mouseFollowImage.style.top = `${e.clientY - 100}px`;
        }

        // Update image position as mouse moves over the project cards
        [comp4change, kairs].forEach(el => {
            el.addEventListener('mousemove', showWebImage);
            el.addEventListener('click', () => window.open((el === comp4change ? 'https://computers4change.org' : 'https://kairs.ai'), '_blank'));
            el.addEventListener('mouseleave', () => {
                mouseFollowImage.style.backgroundImage = '';
                mouseFollowImage.style.display = 'none';
            });
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

            [comp4change, kairs].forEach(el => {
                el.removeEventListener('mousemove', showWebImage);
                el.removeEventListener('mouseleave', () => {
                    mouseFollowImage.style.backgroundImage = '';
                    mouseFollowImage.style.display = 'none';
                });
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
                        <h2 ref={subTitle1Ref} className="scroll-animate fade-up">Full Stack Developer</h2>
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
                                    <p>
                                        I'm a high School student with a passion for bringing ideas to life through technology. My love 
                                        for coding started when I took a introductory python class. Since then, I've been on a journey
                                        to learn and grow as a developer, exploring various programming languages and frameworks. While
                                        this was interesting yet I wanted to do more, so I started building my own projects. I started to
                                        help student organizations and clubs with their websites and applications and eventuall took the
                                        leap to start my own projects. I love the challenge of solving problems and creating solutions that 
                                        make a difference. Whether it's building a web application, automating tasks, or exploring new 
                                        technologies, I'm always eager to learn and take on new challenges.
                                    </p>
                                    <div className="skills-section">
                                        <h3>Tech Stack</h3>
                                        <div className="skills-grid">
                                            <span className="skill-tag">React</span>
                                            <span className="skill-tag">Node.js</span>
                                            <span className="skill-tag">JavaScript</span>
                                            <span className="skill-tag">TypeScript</span>
                                            <span className="skill-tag">Python</span>
                                            <span className="skill-tag">Django</span>
                                            <span className="skill-tag">Git</span>
                                            <span className="skill-tag">PyTorch</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="about-image-container">
                                <div ref={aboutImageRef} className="about-image scroll-animate scale-up delay-2">
                                    <div className="profile-placeholder">
                                        <div className="profile-icon">👨‍💻</div>
                                    </div>
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