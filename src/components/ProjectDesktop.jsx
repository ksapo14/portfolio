import { useEffect, useRef, useState } from 'react';
import {
    ExternalLink,
    Image as ImageIcon,
    Maximize2,
    Minimize2,
    Minus,
    X,
} from 'lucide-react';
import artisanalPreview from '../assets/artisanal_restraunt.png';
import artisanalIcon from '../assets/favicon_artisanal.jpg';
import kairsPreview from '../assets/images/kairs.png';
import kairsIcon from '../assets/kairs_favicon.png';

const projectApps = [
    {
        id: 'artisanal',
        name: 'Artisanal Restaurant',
        shortName: 'Artisanal',
        url: 'https://artisanal-restraunt.vercel.app/',
        iconImage: artisanalIcon,
        previewImage: artisanalPreview,
    },
    {
        id: 'kairs',
        name: 'KAIRS',
        shortName: 'KAIRS',
        url: 'https://www.kairs.ai/',
        iconImage: kairsIcon,
        previewImage: kairsPreview,
    },
];

const MIN_WIDTH = 42;
const MIN_HEIGHT = 38;
const DESKTOP_BOTTOM = 87;

function clamp(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
}

function ProjectWindow({
    app,
    windowState,
    zIndex,
    desktopRef,
    onClose,
    onFocus,
    onGeometryChange,
    onMaximize,
    onMinimize,
}) {
    const [previewMode, setPreviewMode] = useState('live');
    const [frameStatus, setFrameStatus] = useState('loading');

    useEffect(() => {
        if (previewMode !== 'live' || frameStatus !== 'loading') {
            return undefined;
        }

        const timeout = window.setTimeout(() => {
            setFrameStatus('failed');
        }, 8000);

        return () => window.clearTimeout(timeout);
    }, [frameStatus, previewMode]);

    const beginPointerAction = (event, action) => {
        if (windowState.maximized || event.button !== 0) {
            return;
        }

        const desktop = desktopRef.current;
        if (!desktop) {
            return;
        }

        event.preventDefault();
        const pointerTarget = event.currentTarget;
        pointerTarget.setPointerCapture(event.pointerId);
        onFocus();

        const bounds = desktop.getBoundingClientRect();
        const startX = event.clientX;
        const startY = event.clientY;
        const startGeometry = windowState.geometry;

        const handlePointerMove = (pointerEvent) => {
            const deltaX = ((pointerEvent.clientX - startX) / bounds.width) * 100;
            const deltaY = ((pointerEvent.clientY - startY) / bounds.height) * 100;

            if (action === 'move') {
                onGeometryChange({
                    ...startGeometry,
                    x: clamp(
                        startGeometry.x + deltaX,
                        0,
                        100 - startGeometry.width,
                    ),
                    y: clamp(
                        startGeometry.y + deltaY,
                        0,
                        DESKTOP_BOTTOM - startGeometry.height,
                    ),
                });
                return;
            }

            onGeometryChange({
                ...startGeometry,
                width: clamp(
                    startGeometry.width + deltaX,
                    MIN_WIDTH,
                    100 - startGeometry.x,
                ),
                height: clamp(
                    startGeometry.height + deltaY,
                    MIN_HEIGHT,
                    DESKTOP_BOTTOM - startGeometry.y,
                ),
            });
        };

        const finishPointerAction = () => {
            pointerTarget.removeEventListener('pointermove', handlePointerMove);
            pointerTarget.removeEventListener('pointerup', finishPointerAction);
            pointerTarget.removeEventListener('pointercancel', finishPointerAction);
        };

        pointerTarget.addEventListener('pointermove', handlePointerMove);
        pointerTarget.addEventListener('pointerup', finishPointerAction);
        pointerTarget.addEventListener('pointercancel', finishPointerAction);
    };

    const style = windowState.maximized
        ? {
            inset: '2.5% 2.5% 14% 2.5%',
            zIndex,
        }
        : {
            left: `${windowState.geometry.x}%`,
            top: `${windowState.geometry.y}%`,
            width: `${windowState.geometry.width}%`,
            height: `${windowState.geometry.height}%`,
            zIndex,
        };

    return (
        <section
            className={`absolute min-h-0 flex-col overflow-hidden rounded-[clamp(0.35rem,0.75vw,0.75rem)] border border-white/80 bg-[#f7f7f4] shadow-[0_1.2rem_3.5rem_rgb(37_45_56_/_24%)] ${
                windowState.minimized ? 'hidden' : 'flex'
            }`}
            style={style}
            onPointerDown={onFocus}
            aria-label={`${app.name} preview window`}
        >
            <header
                className="flex h-[clamp(1.65rem,3.2vw,2.8rem)] shrink-0 touch-none items-center gap-[clamp(0.35rem,0.7vw,0.7rem)] border-b border-black/10 bg-white/88 px-[clamp(0.45rem,0.9vw,0.85rem)] backdrop-blur-xl"
                onPointerDown={(event) => {
                    if (!event.target.closest('button, a')) {
                        beginPointerAction(event, 'move');
                    }
                }}
            >
                <div className="flex shrink-0 items-center gap-[clamp(0.2rem,0.45vw,0.42rem)]">
                    <button
                        className="grid size-[clamp(0.58rem,1vw,0.88rem)] place-items-center rounded-full bg-[#ff5f57] text-transparent transition-colors hover:text-black/65 focus-visible:text-black/65 focus-visible:outline-1 focus-visible:outline-offset-1"
                        type="button"
                        onClick={onClose}
                        aria-label={`Close ${app.name}`}
                    >
                        <X className="size-[65%]" strokeWidth={2.5} />
                    </button>
                    <button
                        className="grid size-[clamp(0.58rem,1vw,0.88rem)] place-items-center rounded-full bg-[#febc2e] text-transparent transition-colors hover:text-black/65 focus-visible:text-black/65 focus-visible:outline-1 focus-visible:outline-offset-1"
                        type="button"
                        onClick={onMinimize}
                        aria-label={`Minimize ${app.name}`}
                    >
                        <Minus className="size-[68%]" strokeWidth={2.5} />
                    </button>
                    <button
                        className="grid size-[clamp(0.58rem,1vw,0.88rem)] place-items-center rounded-full bg-[#28c840] text-transparent transition-colors hover:text-black/65 focus-visible:text-black/65 focus-visible:outline-1 focus-visible:outline-offset-1"
                        type="button"
                        onClick={onMaximize}
                        aria-label={windowState.maximized
                            ? `Restore ${app.name}`
                            : `Maximize ${app.name}`}
                    >
                        {windowState.maximized
                            ? <Minimize2 className="size-[58%]" strokeWidth={2.5} />
                            : <Maximize2 className="size-[55%]" strokeWidth={2.5} />}
                    </button>
                </div>

                <div className="flex min-w-0 flex-1 items-center justify-center">
                    <span className="max-w-full truncate rounded-full border border-black/8 bg-black/[0.035] px-[clamp(0.5rem,1.5vw,1.4rem)] py-[0.2rem] text-[clamp(0.42rem,0.72vw,0.66rem)] font-medium text-black/55">
                        {app.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </span>
                </div>

                <div className="flex shrink-0 items-center gap-[clamp(0.22rem,0.5vw,0.45rem)]">
                    <button
                        className="grid size-[clamp(1rem,1.7vw,1.45rem)] place-items-center rounded-md text-black/48 transition-colors hover:bg-black/5 hover:text-black focus-visible:outline-1"
                        type="button"
                        onClick={() => {
                            setPreviewMode((mode) => (
                                mode === 'live' ? 'snapshot' : 'live'
                            ));
                            if (previewMode === 'snapshot') {
                                setFrameStatus('loading');
                            }
                        }}
                        aria-label={previewMode === 'live'
                            ? `Show ${app.name} snapshot`
                            : `Show ${app.name} live preview`}
                    >
                        <ImageIcon className="size-[65%]" />
                    </button>
                    <a
                        className="grid size-[clamp(1rem,1.7vw,1.45rem)] place-items-center rounded-md text-black/48 transition-colors hover:bg-black/5 hover:text-black focus-visible:outline-1"
                        href={app.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${app.name} in a new tab`}
                    >
                        <ExternalLink className="size-[65%]" />
                    </a>
                </div>
            </header>

            <div className="relative min-h-0 flex-1 overflow-hidden bg-[#ecece7]">
                <img
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    src={app.previewImage}
                    alt=""
                    aria-hidden="true"
                />

                {previewMode === 'live' && frameStatus !== 'failed' && (
                    <iframe
                        className={`absolute inset-0 h-full w-full border-0 bg-white transition-opacity duration-300 ${
                            frameStatus === 'ready' ? 'opacity-100' : 'opacity-0'
                        }`}
                        src={app.url}
                        title={`${app.name} live website preview`}
                        sandbox="allow-forms allow-popups allow-presentation allow-same-origin allow-scripts"
                        referrerPolicy="strict-origin-when-cross-origin"
                        onLoad={() => setFrameStatus('ready')}
                        onError={() => setFrameStatus('failed')}
                    />
                )}

                {previewMode === 'live' && frameStatus === 'loading' && (
                    <div className="pointer-events-none absolute inset-0 grid place-items-center bg-white/74 backdrop-blur-sm">
                        <span className="rounded-full bg-white/90 px-3 py-1.5 text-[clamp(0.45rem,0.8vw,0.7rem)] font-semibold tracking-[0.08em] text-black/55 uppercase shadow-sm">
                            Loading preview
                        </span>
                    </div>
                )}

                {previewMode === 'live' && frameStatus === 'failed' && (
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-black/72 px-[clamp(0.55rem,1.2vw,1rem)] py-[clamp(0.4rem,0.8vw,0.7rem)] text-white backdrop-blur-md">
                        <span className="text-[clamp(0.45rem,0.8vw,0.7rem)] font-medium">
                            Live preview unavailable
                        </span>
                        <a
                            className="rounded-full bg-white px-3 py-1 text-[clamp(0.45rem,0.75vw,0.66rem)] font-semibold text-black no-underline"
                            href={app.url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Open site
                        </a>
                    </div>
                )}
            </div>

            {!windowState.maximized && (
                <button
                    className="absolute right-0 bottom-0 z-[2] size-[clamp(1rem,2vw,1.8rem)] touch-none cursor-nwse-resize border-0 bg-transparent after:absolute after:right-[22%] after:bottom-[22%] after:size-[42%] after:border-r after:border-b after:border-black/35"
                    type="button"
                    onPointerDown={(event) => beginPointerAction(event, 'resize')}
                    aria-label={`Resize ${app.name} window`}
                />
            )}
        </section>
    );
}

function ProjectDesktop() {
    const desktopRef = useRef(null);
    const [windows, setWindows] = useState({});
    const [zOrder, setZOrder] = useState([]);

    const bringToFront = (appId) => {
        setZOrder((currentOrder) => [
            ...currentOrder.filter((id) => id !== appId),
            appId,
        ]);
    };

    const updateWindow = (appId, updater) => {
        setWindows((currentWindows) => ({
            ...currentWindows,
            [appId]: updater(currentWindows[appId]),
        }));
    };

    const openApp = (app, appIndex) => {
        setWindows((currentWindows) => {
            const existingWindow = currentWindows[app.id];

            if (existingWindow?.open) {
                return {
                    ...currentWindows,
                    [app.id]: {
                        ...existingWindow,
                        minimized: false,
                    },
                };
            }

            const offset = appIndex * 4;
            return {
                ...currentWindows,
                [app.id]: {
                    open: true,
                    minimized: false,
                    maximized: false,
                    geometry: {
                        x: 12 + offset,
                        y: 7 + offset,
                        width: 72,
                        height: 68,
                    },
                },
            };
        });
        bringToFront(app.id);
    };

    return (
        <div
            className="relative h-full w-full overflow-hidden bg-[#edf1f1] text-[#172022]"
            ref={desktopRef}
        >
            <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 1200 750"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <defs>
                    <linearGradient id="desktop-sky" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#f8faf9" />
                        <stop offset="1" stopColor="#dfe8e8" />
                    </linearGradient>
                    <linearGradient id="mountain-back" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#b8c9ca" stopOpacity="0.28" />
                        <stop offset="1" stopColor="#8fa5a8" stopOpacity="0.12" />
                    </linearGradient>
                    <linearGradient id="mountain-front" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="#9caeb0" stopOpacity="0.2" />
                        <stop offset="1" stopColor="#c6d1d1" stopOpacity="0.32" />
                    </linearGradient>
                </defs>
                <rect width="1200" height="750" fill="url(#desktop-sky)" />
                <path
                    d="M0 550 165 360l80 95 150-250 170 245 120-145 175 235 118-135 222 180v165H0Z"
                    fill="url(#mountain-back)"
                />
                <path
                    d="M0 620 215 425l115 125 145-180 170 205 165-170 155 165 95-75 140 115v140H0Z"
                    fill="url(#mountain-front)"
                />
            </svg>

            <div
                className="pointer-events-none absolute inset-0 grid place-items-center pb-[8%]"
                aria-hidden="true"
            >
                <span className="text-[clamp(3rem,12vw,11rem)] leading-none font-bold tracking-[-0.075em] text-[#34484b]/[0.075] uppercase">
                    Projects
                </span>
            </div>

            {projectApps.map((app) => {
                const windowState = windows[app.id];
                if (!windowState?.open) {
                    return null;
                }

                return (
                    <ProjectWindow
                        app={app}
                        desktopRef={desktopRef}
                        key={app.id}
                        windowState={windowState}
                        zIndex={10 + zOrder.indexOf(app.id)}
                        onClose={() => {
                            updateWindow(app.id, (currentWindow) => ({
                                ...currentWindow,
                                open: false,
                                minimized: false,
                            }));
                            setZOrder((currentOrder) => (
                                currentOrder.filter((id) => id !== app.id)
                            ));
                        }}
                        onFocus={() => bringToFront(app.id)}
                        onGeometryChange={(geometry) => {
                            updateWindow(app.id, (currentWindow) => ({
                                ...currentWindow,
                                geometry,
                            }));
                        }}
                        onMaximize={() => {
                            updateWindow(app.id, (currentWindow) => ({
                                ...currentWindow,
                                maximized: !currentWindow.maximized,
                            }));
                            bringToFront(app.id);
                        }}
                        onMinimize={() => {
                            updateWindow(app.id, (currentWindow) => ({
                                ...currentWindow,
                                minimized: true,
                            }));
                        }}
                    />
                );
            })}

            <nav
                className="absolute bottom-[clamp(0.4rem,1.4vw,1.2rem)] left-1/2 z-[100] flex -translate-x-1/2 items-end gap-[clamp(0.45rem,0.9vw,0.8rem)] rounded-[clamp(0.75rem,1.4vw,1.25rem)] border border-white/75 bg-white/55 px-[clamp(0.55rem,1.1vw,0.95rem)] py-[clamp(0.4rem,0.8vw,0.7rem)] shadow-[0_0.7rem_2rem_rgb(45_60_64_/_16%),inset_0_1px_0_rgb(255_255_255_/_85%)] backdrop-blur-xl"
                aria-label="Project applications"
            >
                {projectApps.map((app, index) => {
                    const windowState = windows[app.id];
                    return (
                        <button
                            className="group relative flex flex-col items-center border-0 bg-transparent p-0"
                            key={app.id}
                            type="button"
                            onClick={() => openApp(app, index)}
                            aria-label={`Open ${app.name}`}
                        >
                            <span className="absolute -top-[clamp(1.45rem,2.5vw,2.2rem)] left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-black/78 px-2 py-1 text-[clamp(0.42rem,0.68vw,0.6rem)] font-medium text-white group-hover:block">
                                {app.shortName}
                            </span>
                            <img
                                className="aspect-square w-[clamp(1.8rem,3.5vw,3.25rem)] rounded-[22%] border border-white/70 bg-white object-cover shadow-[0_0.3rem_0.8rem_rgb(0_0_0_/_18%)] transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-105"
                                src={app.iconImage}
                                alt=""
                            />
                            <span
                                className={`mt-[clamp(0.18rem,0.35vw,0.3rem)] size-[clamp(0.2rem,0.35vw,0.3rem)] rounded-full bg-black/45 transition-opacity ${
                                    windowState?.open ? 'opacity-100' : 'opacity-0'
                                }`}
                                aria-hidden="true"
                            />
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}

export default ProjectDesktop;
