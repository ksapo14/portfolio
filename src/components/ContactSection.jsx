import { useEffect, useRef, useState } from 'react';
import {
    BatteryFull,
    ChevronLeft,
    ExternalLink,
    Mail,
    MessageCircle,
    Phone,
    Send,
    Wifi,
} from 'lucide-react';

const socialApps = {
    instagram: {
        name: 'Instagram',
        handle: '@krish.sapovadia14',
        href: 'https://www.instagram.com/krish.sapovadia14/',
        icon: 'https://cdn.simpleicons.org/instagram/ffffff',
        iconBackground: 'linear-gradient(135deg, #833ab4, #fd1d1d 56%, #fcb045)',
    },
    github: {
        name: 'GitHub',
        handle: '@ksapo14',
        href: 'https://github.com/ksapo14',
        icon: 'https://cdn.simpleicons.org/github/ffffff',
        iconBackground: '#171717',
    },
    linkedin: {
        name: 'LinkedIn',
        handle: 'Krish Sapovadia',
        href: 'https://www.linkedin.com/in/krish-sapovadia-898b0639a/',
        iconBackground: '#0a66c2',
        fallbackText: 'in',
    },
};

const launcherApps = [
    ...Object.entries(socialApps).map(([id, app]) => ({
        id,
        name: app.name,
        icon: app.icon,
        iconBackground: app.iconBackground,
        fallbackText: app.fallbackText,
    })),
    {
        id: 'phone',
        name: 'Phone',
        iconComponent: Phone,
        iconBackground: 'linear-gradient(145deg, #65e86d, #21b937)',
    },
    {
        id: 'email',
        name: 'Email',
        icon: 'https://cdn.simpleicons.org/gmail',
        iconBackground: '#ffffff',
    },
    {
        id: 'messages',
        name: 'Messages',
        iconComponent: MessageCircle,
        iconBackground: 'linear-gradient(145deg, #69ee70, #19ba39)',
    },
];

function PhoneStatusBar({ light = false }) {
    return (
        <div
            className={`pointer-events-none absolute top-[1.25%] right-[7%] left-[7%] z-[6] flex items-center justify-between text-[clamp(0.48rem,0.75vw,0.64rem)] font-semibold ${
                light ? 'text-white' : 'text-black'
            }`}
            aria-hidden="true"
        >
            <span>9:41</span>
            <span className="flex items-center gap-[0.28rem]">
                <span className="flex h-[0.55rem] items-end gap-[1px]">
                    {[35, 55, 75, 100].map((height) => (
                        <span
                            className="w-[2px] rounded-full bg-current"
                            key={height}
                            style={{ height: `${height}%` }}
                        />
                    ))}
                </span>
                <Wifi className="w-[0.72rem]" strokeWidth={2.4} />
                <BatteryFull className="w-[0.86rem]" strokeWidth={2.2} />
            </span>
        </div>
    );
}

function AppIcon({ app, className = '' }) {
    const Icon = app.iconComponent;

    return (
        <span
            className={`relative grid aspect-square place-items-center overflow-hidden rounded-[22%] border border-white/30 shadow-[0_0.38rem_0.9rem_rgb(0_0_0_/_18%),inset_0_1px_0_rgb(255_255_255_/_24%)] ${className}`.trim()}
            style={{ background: app.iconBackground }}
        >
            {app.fallbackText && (
                <span
                    className="absolute inset-0 grid place-items-center text-[2.6em] leading-none font-bold tracking-[-0.08em] text-white [font-family:Arial,sans-serif]"
                    aria-hidden="true"
                >
                    {app.fallbackText}
                </span>
            )}
            {app.icon && (
                <img
                    className="relative z-[1] h-[58%] w-[58%] object-contain"
                    src={app.icon}
                    alt=""
                    aria-hidden="true"
                />
            )}
            {Icon && (
                <Icon
                    className="h-[58%] w-[58%] text-white"
                    fill={app.id === 'messages' ? 'currentColor' : 'none'}
                    strokeWidth={2.2}
                    aria-hidden="true"
                />
            )}
        </span>
    );
}

function PhoneHome({ onOpenApp }) {
    return (
        <div className="relative h-full overflow-hidden bg-[radial-gradient(circle_at_18%_14%,#a8d6ec_0,transparent_36%),radial-gradient(circle_at_82%_78%,#eec9dd_0,transparent_42%),linear-gradient(145deg,#e5edf1,#a8bac8)] px-[8%] pt-[14%] pb-[11%]">
            <PhoneStatusBar />
            <div
                className="pointer-events-none absolute -top-[8%] -right-[25%] size-[72%] rounded-full border-[2.8rem] border-white/18 blur-[1px]"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -bottom-[10%] -left-[28%] size-[68%] rounded-full border-[2.4rem] border-white/14"
                aria-hidden="true"
            />

            <div className="relative z-[1] mb-[11%] text-center text-black/72">
                <p className="m-0 text-[clamp(0.58rem,0.9vw,0.76rem)] font-medium">
                    Krish&apos;s Phone
                </p>
                <p className="m-0 mt-[1%] text-[clamp(1.55rem,3.2vw,2.6rem)] leading-none font-light tracking-[-0.055em]">
                    9:41
                </p>
            </div>

            <div className="relative z-[1] grid grid-cols-3 gap-x-[9%] gap-y-[8%]">
                {launcherApps.map((app) => (
                    <button
                        className="group flex min-w-0 flex-col items-center border-0 bg-transparent p-0"
                        key={app.id}
                        type="button"
                        onClick={() => onOpenApp(app.id)}
                    >
                        <AppIcon
                            app={app}
                            className="w-full transition-transform duration-150 group-hover:-translate-y-0.5 group-active:scale-95"
                        />
                        <span className="mt-[8%] max-w-full truncate text-[clamp(0.46rem,0.72vw,0.62rem)] font-medium text-black/74">
                            {app.name}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}

function SocialAppScreen({ app }) {
    return (
        <div className="flex h-full flex-col bg-[#f4f4f2] px-[8%] pt-[15%] pb-[11%]">
            <PhoneStatusBar />
            <div className="flex items-center gap-[5%] border-b border-black/8 pb-[5%]">
                <AppIcon
                    app={app}
                    className="w-[19%]"
                />
                <div className="min-w-0">
                    <p className="m-0 text-[clamp(0.8rem,1.25vw,1.05rem)] font-bold tracking-[-0.025em]">
                        {app.name}
                    </p>
                    <p className="m-0 mt-0.5 truncate text-[clamp(0.52rem,0.82vw,0.7rem)] text-black/42">
                        {app.handle}
                    </p>
                </div>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center text-center">
                <AppIcon
                    app={app}
                    className="mb-[7%] w-[32%]"
                />
                <h3 className="m-0 text-[clamp(1.25rem,2.3vw,1.9rem)] tracking-[-0.05em]">
                    Find me on {app.name}
                </h3>
                <p className="mt-[3%] mb-[8%] text-[clamp(0.58rem,0.9vw,0.76rem)] text-black/45">
                    {app.handle}
                </p>
                <a
                    className="inline-flex items-center gap-2 rounded-full bg-black px-[8%] py-[3.5%] text-[clamp(0.58rem,0.9vw,0.76rem)] font-semibold text-white no-underline transition-transform hover:scale-[1.03]"
                    href={app.href}
                    target="_blank"
                    rel="noreferrer"
                >
                    Open profile
                    <ExternalLink className="w-[1em]" />
                </a>
            </div>
        </div>
    );
}

function ContactDetailScreen({ type }) {
    const isEmail = type === 'email';
    const detail = isEmail ? 'kcsapovadia@gmail.com' : '+1 704-677-2939';
    const href = isEmail
        ? 'mailto:kcsapovadia@gmail.com'
        : 'tel:+17046772939';
    const Icon = isEmail ? Mail : Phone;

    return (
        <div className="flex h-full flex-col bg-[linear-gradient(180deg,#f8faf9,#e7ece9)] px-[8%] pt-[15%] pb-[11%]">
            <PhoneStatusBar />
            <p className="m-0 text-center text-[clamp(0.62rem,0.95vw,0.8rem)] font-semibold text-black/44">
                {isEmail ? 'Email' : 'Phone'}
            </p>
            <div className="flex flex-1 flex-col items-center justify-center text-center">
                <span className={`mb-[8%] grid aspect-square w-[32%] place-items-center rounded-[26%] text-white shadow-xl ${
                    isEmail ? 'bg-[#dd4b3e]' : 'bg-[#24c843]'
                }`}>
                    <Icon className="w-[48%]" strokeWidth={2.1} />
                </span>
                <p className="m-0 text-[clamp(0.55rem,0.85vw,0.72rem)] font-semibold tracking-[0.1em] text-black/35 uppercase">
                    {isEmail ? 'Email @' : 'Phone @'}
                </p>
                <p className="mt-[3%] mb-[9%] max-w-full break-all text-[clamp(0.78rem,1.35vw,1.1rem)] font-semibold tracking-[-0.025em]">
                    {detail}
                </p>
                <a
                    className={`rounded-full px-[9%] py-[3.5%] text-[clamp(0.58rem,0.9vw,0.76rem)] font-semibold text-white no-underline transition-transform hover:scale-[1.03] ${
                        isEmail ? 'bg-[#dd4b3e]' : 'bg-[#24c843]'
                    }`}
                    href={href}
                >
                    {isEmail ? 'Write email' : 'Call now'}
                </a>
            </div>
        </div>
    );
}

function ContactSection({ onSectionChange }) {
    const sectionRef = useRef(null);
    const phoneRef = useRef(null);
    const headingRef = useRef(null);
    const minimizeTimeoutRef = useRef(null);
    const [activeApp, setActiveApp] = useState('home');
    const [isMinimizing, setIsMinimizing] = useState(false);

    const openApp = (appId) => {
        setIsMinimizing(false);
        setActiveApp(appId);
    };

    const returnHome = () => {
        if (activeApp === 'home' || isMinimizing) {
            return;
        }

        setIsMinimizing(true);
        minimizeTimeoutRef.current = window.setTimeout(() => {
            setActiveApp('home');
            setIsMinimizing(false);
            minimizeTimeoutRef.current = null;
        }, 280);
    };

    useEffect(() => () => {
        if (minimizeTimeoutRef.current !== null) {
            window.clearTimeout(minimizeTimeoutRef.current);
        }
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        const phone = phoneRef.current;
        const heading = headingRef.current;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let animationFrame = null;
        let wasActive = false;

        const updateContact = () => {
            const bounds = section.getBoundingClientRect();
            const scrollDistance = Math.max(
                section.offsetHeight - window.innerHeight,
                1,
            );
            const progress = Math.min(
                Math.max(-bounds.top / scrollDistance, 0),
                1,
            );
            const isActive = (
                bounds.top <= window.innerHeight * 0.65
                && bounds.bottom > 0
            );

            if (isActive && !wasActive) {
                onSectionChange?.('contact');
            } else if (!isActive && wasActive && bounds.top > 0) {
                onSectionChange?.('work');
            }
            wasActive = isActive;

            if (reduceMotion || progress > 0.995) {
                phone.style.opacity = '1';
                phone.style.transform = 'none';
            } else {
                const easedProgress = progress * progress * (3 - 2 * progress);
                const translateY = (1 - easedProgress) * 90;
                const rotationY = (1 - easedProgress) * -12;
                const rotationZ = (1 - easedProgress) * -4;
                const scale = 0.78 + easedProgress * 0.22;

                phone.style.opacity = String(easedProgress);
                phone.style.transform = `translate3d(0, ${translateY}px, 0) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg) scale(${scale})`;
            }
            heading.style.opacity = String(1 - progress * 0.96);
            animationFrame = null;
        };

        const requestUpdate = () => {
            if (animationFrame === null) {
                animationFrame = window.requestAnimationFrame(updateContact);
            }
        };

        phone.style.willChange = reduceMotion ? 'auto' : 'transform, opacity';
        updateContact();
        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', requestUpdate);

        return () => {
            window.removeEventListener('scroll', requestUpdate);
            window.removeEventListener('resize', requestUpdate);
            if (animationFrame !== null) {
                window.cancelAnimationFrame(animationFrame);
            }
            phone.style.removeProperty('opacity');
            phone.style.removeProperty('transform');
            phone.style.removeProperty('will-change');
            heading.style.removeProperty('opacity');
        };
    }, [onSectionChange]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const name = String(formData.get('name')).trim();
        const email = String(formData.get('email')).trim();
        const message = String(formData.get('message')).trim();
        const subject = `Portfolio message from ${name}`;
        const body = [
            `Name: ${name}`,
            `Email: ${email}`,
            '',
            message,
        ].join('\n');

        window.location.href = `mailto:kcsapovadia@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <section
            className="relative h-[220vh] bg-[#dce5e1] max-md:h-[190svh]"
            id="contact"
            ref={sectionRef}
        >
            <div className="sticky top-0 grid h-svh place-items-center overflow-hidden px-4 [perspective:1600px]">
                <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgb(255_255_255_/_95%),transparent_48%),linear-gradient(180deg,#edf2ef,#ccd9d4)]"
                    aria-hidden="true"
                />
                <span
                    className="pointer-events-none absolute bottom-[4vh] left-1/2 -translate-x-1/2 text-[clamp(4rem,17vw,16rem)] leading-none font-bold tracking-[-0.08em] text-[#294037] uppercase"
                    ref={headingRef}
                    aria-hidden="true"
                >
                    Contact
                </span>

                <div
                    className="contact-phone relative z-[1] aspect-[9/18.7] w-[min(82vw,42vh,23rem)] rounded-[clamp(2.1rem,3.6vw,3.2rem)] border-[clamp(0.46rem,0.78vw,0.66rem)] border-[#161817] bg-[#161817] p-[clamp(0.18rem,0.35vw,0.3rem)] shadow-[0_3rem_6rem_rgb(38_51_46_/_30%),inset_0_0_0_1px_rgb(255_255_255_/_12%)] max-md:w-[min(88vw,44svh)]"
                    ref={phoneRef}
                >
                    <div className="relative h-full overflow-hidden rounded-[clamp(1.75rem,3.2vw,2.7rem)] bg-[#f6f6f4]">
                        <div
                            className="absolute top-[1.1%] left-1/2 z-30 h-[3.2%] w-[31%] -translate-x-1/2 rounded-full bg-black"
                            aria-hidden="true"
                        />

                        <PhoneHome onOpenApp={openApp} />

                        {activeApp !== 'home' && (
                            <div
                                className={`absolute inset-0 z-10 overflow-hidden ${
                                    isMinimizing
                                        ? 'animate-[phone-app-minimize_280ms_cubic-bezier(0.4,0,1,1)_forwards]'
                                        : ''
                                }`}
                            >
                                {socialApps[activeApp] && (
                                    <SocialAppScreen app={socialApps[activeApp]} />
                                )}

                                {(activeApp === 'phone' || activeApp === 'email') && (
                                    <ContactDetailScreen type={activeApp} />
                                )}

                                {activeApp === 'messages' && (
                                    <form
                                        className="flex h-full flex-col bg-[#f6f6f4]"
                                        onSubmit={handleSubmit}
                                    >
                                        <PhoneStatusBar />
                            <div className="shrink-0 border-b border-black/8 bg-white/88 px-[6%] pt-[7.5%] pb-[3.5%] backdrop-blur-xl">
                                <div className="mb-[3%] flex items-center justify-center">
                                    <span className="text-[clamp(0.52rem,0.8vw,0.7rem)] font-semibold text-black/45">
                                        Messages
                                    </span>
                                </div>
                                <div className="grid gap-[0.4rem]">
                                    <label className="rounded-[0.65rem] bg-black/[0.04] px-[4%] py-[2.5%]">
                                        <span className="mb-[1%] block text-[clamp(0.56rem,0.9vw,0.75rem)] font-medium text-black/38">
                                            Name
                                        </span>
                                        <input
                                            className="w-full min-w-0 border-0 bg-transparent p-0 text-[clamp(0.72rem,1.15vw,0.98rem)] font-semibold text-black outline-none placeholder:text-black/24"
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            placeholder="Your name"
                                            required
                                        />
                                    </label>
                                    <label className="rounded-[0.65rem] bg-black/[0.04] px-[4%] py-[2.5%]">
                                        <span className="mb-[1%] block text-[clamp(0.56rem,0.9vw,0.75rem)] font-medium text-black/38">
                                            Email
                                        </span>
                                        <input
                                            className="w-full min-w-0 border-0 bg-transparent p-0 text-[clamp(0.72rem,1.15vw,0.98rem)] font-semibold text-black outline-none placeholder:text-black/24"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="flex min-h-0 flex-1 flex-col justify-end gap-[4%] px-[5%] py-[5%]">
                                <div className="ml-auto max-w-[74%] rounded-[1.1rem_1.1rem_0.25rem_1.1rem] bg-[#1687ff] px-[5%] py-[3%] text-[clamp(0.68rem,1.15vw,0.98rem)] leading-[1.35] font-medium text-white shadow-sm">
                                    Let&apos;s talk! Type out your message with any questions and I&apos;ll get back to you ASAP.
                                </div>
                            </div>

                            <div className="shrink-0 px-[4%] pb-[6%]">
                                <div className="flex items-end gap-[2.5%] rounded-[1.35rem] border border-black/14 bg-white px-[4%] py-[2.5%] shadow-[inset_0_1px_2px_rgb(0_0_0_/_4%)]">
                                    <textarea
                                        className="max-h-28 min-h-[2.75rem] min-w-0 flex-1 resize-none border-0 bg-transparent py-[1.5%] text-[clamp(0.72rem,1.1vw,0.95rem)] leading-[1.4] font-medium text-black outline-none placeholder:text-black/28"
                                        name="message"
                                        rows="3"
                                        placeholder="Message"
                                        aria-label="Message"
                                        required
                                        onKeyDown={(event) => {
                                            if (
                                                event.key === 'Enter'
                                                && !event.shiftKey
                                                && !event.nativeEvent.isComposing
                                            ) {
                                                event.preventDefault();
                                                event.currentTarget.form?.requestSubmit();
                                            }
                                        }}
                                    />
                                    <button
                                        className="grid aspect-square w-[12%] shrink-0 place-items-center rounded-full border-0 bg-[#1687ff] text-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1687ff]"
                                        type="submit"
                                        aria-label="Send message by email"
                                    >
                                        <Send className="w-[48%]" fill="currentColor" />
                                    </button>
                                </div>
                            </div>
                                    </form>
                                )}
                            </div>
                        )}

                        {activeApp !== 'home' && (
                            <button
                                className="absolute top-[6.6%] left-[5.5%] z-40 grid aspect-square w-[9%] place-items-center rounded-full border-0 bg-white/68 text-black/70 shadow-[0_0.25rem_0.75rem_rgb(0_0_0_/_10%)] backdrop-blur-md transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                type="button"
                                onClick={returnHome}
                                disabled={isMinimizing}
                                aria-label={`Close ${activeApp} and return home`}
                            >
                                <ChevronLeft className="w-[58%]" strokeWidth={2.3} />
                            </button>
                        )}

                        <button
                            className={`absolute bottom-[1.15%] left-1/2 z-20 h-[0.65%] w-[32%] -translate-x-1/2 rounded-full border-0 p-0 transition-[width,background-color] hover:w-[35%] focus-visible:outline-2 focus-visible:outline-offset-2 ${
                                activeApp === 'home'
                                    ? 'bg-black/58 focus-visible:outline-black'
                                    : 'bg-black/72 focus-visible:outline-black'
                            }`}
                            type="button"
                            onClick={returnHome}
                            aria-label="Return to phone home screen"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;
