import logo from '../assets/logo_nobg.png';

function HomeLogo() {
    return (
        <a
            className="fixed top-[clamp(1rem,2.4vw,1.75rem)] left-[clamp(1rem,2.4vw,1.75rem)] z-30 block aspect-[3/1] w-[clamp(6.5rem,9vw,9rem)] overflow-hidden rounded-sm leading-none transition-transform duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#111] max-md:top-[max(0.9rem,env(safe-area-inset-top))] max-md:left-3 max-md:w-[5.75rem] motion-reduce:transition-none"
            href="#home"
            aria-label="Back to home"
        >
            <img
                className="pointer-events-none absolute -top-[141%] -left-[18.8%] h-auto w-[130%] max-w-none"
                src={logo}
                alt="KS"
            />
        </a>
    );
}

export default HomeLogo;
