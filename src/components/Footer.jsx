const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
];

function Footer() {
    return (
        <footer className="site-footer relative min-h-[72vh] overflow-hidden bg-[#0d0e0e] px-[clamp(1.25rem,5vw,5rem)] pt-[clamp(3rem,7vw,6rem)] text-[#d1d1cf] max-sm:min-h-[92svh]">
            <div className="relative z-[2] grid gap-12 border-t border-white/15 pt-[clamp(1.5rem,3vw,2.5rem)] sm:grid-cols-[1.2fr_0.8fr_1fr]">
                <div>
                    <p className="m-0 text-[clamp(1rem,1.6vw,1.3rem)] font-semibold tracking-[-0.025em] text-white">
                        © Krish Sapovadia 2026
                    </p>
                    <p className="mt-3 max-w-xs text-[0.78rem] leading-relaxed text-white/42">
                        Developer focused on useful interfaces, intelligent systems, and thoughtful digital experiences.
                    </p>
                </div>

                <nav aria-label="Footer navigation">
                    <p className="m-0 mb-4 text-[0.62rem] font-semibold tracking-[0.14em] text-white/35 uppercase">
                        Quick links
                    </p>
                    <ul className="m-0 grid list-none gap-2 p-0">
                        {quickLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    className="text-[0.85rem] font-medium text-white/68 no-underline transition-colors hover:text-white"
                                    href={link.href}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div>
                    <p className="m-0 mb-4 text-[0.62rem] font-semibold tracking-[0.14em] text-white/35 uppercase">
                        Contact
                    </p>
                    <div className="grid gap-2">
                        <a
                            className="w-fit text-[0.85rem] font-medium text-white/68 no-underline transition-colors hover:text-white"
                            href="mailto:kcsapovadia@gmail.com"
                        >
                            kcsapovadia@gmail.com
                        </a>
                        <a
                            className="w-fit text-[0.85rem] font-medium text-white/68 no-underline transition-colors hover:text-white"
                            href="tel:+17046772939"
                        >
                            +1 704-677-2939
                        </a>
                    </div>
                </div>
            </div>

            <div
                className="pointer-events-none absolute right-0 bottom-[-0.2em] left-0 z-[1] select-none text-center font-['Archivo',sans-serif] text-[clamp(8rem,29vw,28rem)] leading-[0.62] font-black tracking-[-0.095em] text-[#deded9]/[0.075]"
                aria-hidden="true"
            >
                KRISH
            </div>
        </footer>
    );
}

export default Footer;
