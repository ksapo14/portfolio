import SocialLinks from './SocialLinks';

function Footer() {
    return (
        <footer className="site-footer">
            <div className="section-shell footer-inner">
                <a className="wordmark footer-wordmark" href="#home">
                    KS<span>.</span>
                </a>
                <SocialLinks className="footer-socials" />
                <p>© 2026 Krish Sapovadia</p>
            </div>
        </footer>
    );
}

export default Footer;
