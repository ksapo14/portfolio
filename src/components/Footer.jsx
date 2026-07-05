const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/ksapo14' },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/krish-sapovadia-898b0639a/',
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/krish.sapovadia14/',
    },
];

function Footer() {
    return (
        <footer className="site-footer">
            <div className="section-shell footer-inner">
                <a className="wordmark footer-wordmark" href="#home">
                    KS<span>.</span>
                </a>
                <div className="footer-socials">
                    {socialLinks.map((link) => (
                        <a
                            href={link.href}
                            key={link.label}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
                <p>© 2026 Krish Sapovadia</p>
            </div>
        </footer>
    );
}

export default Footer;
