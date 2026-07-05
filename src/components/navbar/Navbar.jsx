import { useEffect, useState } from 'react';

const navItems = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

function Navbar({ activeSection = 'home' }) {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const closeMenu = (event) => {
            if (event.key === 'Escape') {
                setMenuOpen(false);
            }
        };

        window.addEventListener('keydown', closeMenu);
        return () => window.removeEventListener('keydown', closeMenu);
    }, []);

    return (
        <header className="site-header">
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

            <a className="header-email" href="mailto:kcsapovadia@gmail.com">
                Email me
            </a>

            <button
                className="menu-toggle"
                type="button"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen((current) => !current)}
            >
                <span>{menuOpen ? 'Close' : 'Menu'}</span>
            </button>

            <nav
                className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
                id="mobile-menu"
                aria-label="Mobile navigation"
            >
                {navItems.map((item, index) => (
                    <a
                        href={item.href}
                        key={item.label}
                        onClick={() => setMenuOpen(false)}
                    >
                        <span>0{index + 1}</span>
                        {item.label}
                    </a>
                ))}
            </nav>
        </header>
    );
}

export default Navbar;
