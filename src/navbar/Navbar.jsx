import './navbar.css';
import { useRef, useEffect } from 'react';

function Navbar({ onNavigate }) {
    const navbarRef = useRef(null);

    const handleNavClick = (event, sectionId) => {
        event.preventDefault();
        onNavigate(sectionId);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (navbarRef.current) {
                if (window.scrollY > 100) {
                    navbarRef.current.classList.add('scrolled');
                } else {
                    navbarRef.current.classList.remove('scrolled');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav ref={navbarRef}>
            <a href="#home" onClick={(event) => handleNavClick(event, 'home')}>Home</a>
            <a href="#about" onClick={(event) => handleNavClick(event, 'about')}>About</a>
            <a href="#projects" onClick={(event) => handleNavClick(event, 'projects')}>Projects</a>
            <a href="#contact" onClick={(event) => handleNavClick(event, 'contact')}>Contact</a>
        </nav>
    );
}

export default Navbar;
