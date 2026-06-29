import logo from '../assets/logo_nobg.png';

function BrandMark({ className = '' }) {
    return (
        <span
            className={`relative block aspect-[48/16.6] overflow-hidden ${className}`.trim()}
        >
            <img
                className="pointer-events-none absolute -top-[145.5%] -left-[16.7%] h-auto w-[138.4%] max-w-none"
                src={logo}
                alt=""
            />
        </span>
    );
}

export default BrandMark;
