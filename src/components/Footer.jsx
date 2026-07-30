import SocialLinks from './SocialLinks';

function Footer() {
    return (
        <footer className="site-footer">
            <div className="section-shell footer-inner">
                <a className="wordmark footer-wordmark" href="#home">
                    KS<span>.</span>
                </a>
                <p>
                    Designed and engineered by Krish
                    <span>North Carolina / 2026</span>
                </p>
                <SocialLinks className="footer-socials" />
                <a className="back-to-top" href="#home">
                    Back to top
                </a>
            </div>
        </footer>
    );
}

export default Footer;
