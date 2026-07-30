import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const navItems = [
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

function Navbar({ activeSection = 'home' }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 36);
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setMenuOpen(false);
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <header
            className={`site-header ${scrolled ? 'is-scrolled' : ''} ${
                menuOpen ? 'menu-is-open' : ''
            }`}
        >
            <a className="wordmark" href="#home" aria-label="Krish Sapovadia, home">
                KS<span>.</span>
            </a>

            <nav className="desktop-nav" aria-label="Primary navigation">
                {navItems.map((item) => {
                    const section = item.href.slice(1);

                    return (
                        <a
                            href={item.href}
                            key={item.label}
                            aria-current={
                                activeSection === section ? 'page' : undefined
                            }
                        >
                            {item.label}
                        </a>
                    );
                })}
            </nav>

            <a className="header-availability" href="mailto:kcsapovadia@gmail.com">
                <span>Available to collaborate</span>
                <ArrowUpRight aria-hidden="true" />
            </a>

            <button
                className="menu-toggle"
                type="button"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen((current) => !current)}
            >
                {menuOpen ? 'Close' : 'Menu'}
            </button>

            <nav
                className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
                id="mobile-menu"
                aria-label="Mobile navigation"
            >
                {navItems.map((item) => (
                    <a
                        href={item.href}
                        key={item.label}
                        onClick={() => setMenuOpen(false)}
                    >
                        {item.label}
                    </a>
                ))}
            </nav>
        </header>
    );
}

export default Navbar;
