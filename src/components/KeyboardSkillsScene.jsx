import { useCallback, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const keyboardRows = [
    [
        { label: '`' }, { label: '1' }, { label: '2' }, { label: '3' },
        { label: '4' }, { label: '5' }, { label: '6' }, { label: '7' },
        { label: '8' }, { label: '9' }, { label: '0' }, { label: '-' },
        { label: '=' }, { label: 'Backspace', width: 1.8 },
    ],
    [
        { label: 'Tab', width: 1.45 }, { label: 'Q' }, { label: 'W' },
        { label: 'E' }, { label: 'R' }, { label: 'T' }, { label: 'Y' },
        { label: 'U' }, { label: 'I' }, { label: 'O' }, { label: 'P' },
        { label: '[' }, { label: ']' }, { label: '\\', width: 1.35 },
    ],
    [
        { label: 'Caps', width: 1.75 }, { label: 'A' }, { label: 'S' },
        { label: 'D' }, { label: 'F' }, { label: 'G' }, { label: 'H' },
        { label: 'J' }, { label: 'K' }, { label: 'L' }, { label: ';' },
        { label: "'" }, { label: 'Enter', width: 2.15 },
    ],
    [
        { label: 'Shift', width: 2.25 }, { label: 'Z' }, { label: 'X' },
        { label: 'C' }, { label: 'V' }, { label: 'B' }, { label: 'N' },
        { label: 'M' }, { label: ',' }, { label: '.' }, { label: '/' },
        { label: 'Shift', width: 2.65 },
    ],
    [
        { label: 'Ctrl', width: 1.35 }, { label: 'Fn' }, { label: 'Alt' },
        { label: '⌘', width: 1.3 }, { label: 'Space', width: 5.8 },
        { label: '⌘', width: 1.3 }, { label: 'Alt' }, { label: '←' },
        { label: '↑' }, { label: '↓' }, { label: '→' },
    ],
];

const skillLetters = ['S', 'K', 'I', 'L', 'L', 'S'];

const skillGroups = [
    {
        id: 'web-design',
        title: 'Web Design',
        skills: [
            'React',
            'JavaScript',
            'TypeScript',
            'HTML / CSS',
            'Tailwind CSS',
            'Responsive Design',
        ],
    },
    {
        id: 'systems-design',
        title: 'Systems Design',
        skills: [
            'Python',
            'FastAPI',
            'Django',
            'SQL',
            'Docker',
            'REST APIs',
        ],
    },
    {
        id: 'embedded-systems',
        title: 'Embedded Systems',
        skills: [
            'C / C++',
            'Microcontrollers',
            'Sensor Integration',
            'Serial Communication',
        ],
    },
    {
        id: 'miscellaneous',
        title: 'Miscellaneous',
        skills: [
            'PyTorch',
            'Machine Learning',
            'Git',
            'AI Workflows',
        ],
    },
];

function KeyboardSkillsScene({
    accordionRef,
    floatingKeyRefs,
    headingRef,
    keyBlocksRef,
    keyboardRef,
    onReveal,
    sceneRef,
    sourceKeyRefs,
}) {
    const [openGroup, setOpenGroup] = useState(skillGroups[0].id);
    const [query, setQuery] = useState('');
    const [searchStatus, setSearchStatus] = useState('idle');
    const [pressedKey, setPressedKey] = useState('');

    const handleVirtualKey = useCallback((label) => {
        if (label === 'Backspace') {
            setQuery((currentQuery) => currentQuery.slice(0, -1));
            setSearchStatus('idle');
            return;
        }

        if (label === 'Enter') {
            if (query.trim().toLowerCase() === 'skills') {
                setSearchStatus('success');
                onReveal?.();
            } else {
                setSearchStatus('error');
            }
            return;
        }

        if (label === 'Space') {
            setQuery((currentQuery) => `${currentQuery} `.slice(0, 12));
            setSearchStatus('idle');
            return;
        }

        if (label.length === 1 && /^[a-z0-9]$/i.test(label)) {
            setQuery((currentQuery) => (
                `${currentQuery}${label.toLowerCase()}`.slice(0, 12)
            ));
            setSearchStatus('idle');
        }
    }, [onReveal, query]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            const keyboard = keyboardRef.current;
            const target = event.target;
            const keyboardBounds = keyboard?.getBoundingClientRect();
            if (
                !keyboard
                || !keyboardBounds
                || searchStatus === 'success'
                || window.getComputedStyle(keyboard).visibility === 'hidden'
                || keyboardBounds.bottom <= 0
                || keyboardBounds.top >= window.innerHeight
                || (
                    target instanceof HTMLElement
                    && target.closest('input, textarea, select, [contenteditable="true"]')
                )
                || event.ctrlKey
                || event.metaKey
                || event.altKey
            ) {
                return;
            }

            let label = '';
            if (event.key === 'Backspace') {
                label = 'Backspace';
            } else if (event.key === 'Enter') {
                label = 'Enter';
            } else if (event.key === ' ') {
                label = 'Space';
            } else if (/^[a-z0-9]$/i.test(event.key)) {
                label = event.key.toUpperCase();
            }

            if (!label) {
                return;
            }

            event.preventDefault();
            setPressedKey(label);
            handleVirtualKey(label);
        };

        const handleKeyUp = () => setPressedKey('');

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleVirtualKey, keyboardRef, searchStatus]);

    return (
        <section
            className="pointer-events-none absolute inset-0 z-[8] overflow-hidden bg-[#f1f0ec] text-[#111]"
            ref={sceneRef}
            aria-label="Skills"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgb(255_255_255_/_95%),rgb(230_231_226_/_92%))]" />

            <div
                className="pointer-events-auto absolute inset-0 flex flex-col items-center justify-center gap-[clamp(0.8rem,2vh,1.5rem)] px-[clamp(1rem,4vw,4rem)]"
                ref={keyboardRef}
            >
                <div className="w-[min(84vw,52rem)]">
                    <label
                        className={`flex items-center rounded-full border bg-white/82 px-[clamp(1rem,2vw,1.6rem)] py-[clamp(0.65rem,1.2vw,0.9rem)] shadow-[0_0.8rem_2.2rem_rgb(35_44_42_/_12%),inset_0_1px_0_rgb(255_255_255_/_90%)] backdrop-blur-xl transition-[border-color,box-shadow] ${
                            searchStatus === 'error'
                                ? 'border-red-400 shadow-[0_0_0_3px_rgb(248_113_113_/_15%)]'
                                : searchStatus === 'success'
                                    ? 'border-black/35'
                                    : 'border-black/12'
                        }`}
                    >
                        <span className="mr-[clamp(0.65rem,1.4vw,1rem)] text-[clamp(0.55rem,0.9vw,0.75rem)] font-semibold tracking-[0.12em] text-black/38 uppercase">
                            Search
                        </span>
                        <span
                            className="flex min-w-0 flex-1 items-center text-[clamp(1rem,2vw,1.6rem)] font-semibold tracking-[0.04em] text-black outline-none [font-family:'Archivo',sans-serif]"
                            role="textbox"
                            tabIndex="0"
                            aria-label="Virtual keyboard search"
                            aria-readonly="true"
                        >
                            <span className={query ? '' : 'text-black/22'}>
                                {query || "type 'skills' to reveal"}
                            </span>
                            <span
                                className="ml-[0.12em] h-[1.05em] w-[0.09em] shrink-0 animate-[search-caret-blink_1s_steps(1)_infinite] bg-black/70"
                                aria-hidden="true"
                            />
                        </span>
                        <span
                            className="ml-3 text-[clamp(0.5rem,0.8vw,0.68rem)] font-medium text-black/32"
                            aria-live="polite"
                        >
                            {searchStatus === 'error'
                                ? 'Type skills'
                                : searchStatus === 'success'
                                    ? 'Opening'
                                    : 'Press Enter'}
                        </span>
                    </label>
                </div>

                <div className="keyboard-deck w-[min(92vw,78rem)] rounded-[clamp(0.8rem,2vw,1.8rem)] border border-black/20 bg-[linear-gradient(145deg,#e3e5e4_0%,#bfc3c2_42%,#929796_100%)] p-[clamp(0.7rem,1.8vw,1.6rem)] shadow-[0_0.2rem_0_rgb(255_255_255_/_65%)_inset,0_-0.35rem_0.7rem_rgb(49_54_53_/_24%)_inset,0_1.2rem_1.4rem_rgb(34_40_39_/_18%),0_3rem_6rem_rgb(27_34_32_/_28%)] [font-family:'Archivo',sans-serif]">
                    <div className="flex flex-col gap-[clamp(0.25rem,0.65vw,0.55rem)] rounded-[clamp(0.45rem,1vw,0.9rem)] border border-black/20 bg-[linear-gradient(180deg,#777c7a_0%,#555a58_100%)] p-[clamp(0.4rem,1vw,0.85rem)] shadow-[inset_0_0.3rem_0.65rem_rgb(0_0_0_/_38%),inset_0_-1px_0_rgb(255_255_255_/_14%),0_1px_0_rgb(255_255_255_/_55%)]">
                        {keyboardRows.map((row, rowIndex) => (
                            <div
                                className="flex h-[clamp(1.55rem,4.5vw,3.8rem)] gap-[clamp(0.18rem,0.45vw,0.4rem)]"
                                key={`keyboard-row-${rowIndex}`}
                            >
                                {row.map((key, keyIndex) => {
                                    const isSkillKey = ['S', 'K', 'I', 'L'].includes(key.label);
                                    return (
                                        <button
                                            className={`qwerty-key grid h-full min-w-0 cursor-pointer place-items-center rounded-[clamp(0.2rem,0.48vw,0.44rem)] border border-black/75 bg-[linear-gradient(155deg,#484c4a_0%,#272a29_42%,#0e0f0f_100%)] px-1 text-[clamp(0.62rem,1.35vw,1.15rem)] font-semibold text-white/92 shadow-[inset_0_1px_0_rgb(255_255_255_/_20%),inset_0_-0.18rem_0_rgb(0_0_0_/_62%),0_0.18rem_0_#080909,0_0.38rem_0.55rem_rgb(0_0_0_/_42%)] transition-[transform,filter,box-shadow] duration-100 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-[0.16rem] active:shadow-[inset_0_2px_4px_rgb(0_0_0_/_55%),0_0.06rem_0_#080909] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-black ${
                                                pressedKey === key.label
                                                    ? 'translate-y-[0.16rem] brightness-125 shadow-[inset_0_2px_5px_rgb(0_0_0_/_58%),0_0.05rem_0_#080909]'
                                                    : ''
                                            }`}
                                            key={`${key.label}-${keyIndex}`}
                                            ref={isSkillKey
                                                ? (element) => {
                                                    sourceKeyRefs.current[key.label] = element;
                                                }
                                                : undefined}
                                            style={{ flex: key.width ?? 1 }}
                                            type="button"
                                            onClick={() => handleVirtualKey(key.label)}
                                            onPointerDown={() => setPressedKey(key.label)}
                                            onPointerUp={() => setPressedKey('')}
                                            onPointerCancel={() => setPressedKey('')}
                                            onPointerLeave={() => setPressedKey('')}
                                            aria-label={key.label === 'Space'
                                                ? 'Space'
                                                : key.label}
                                        >
                                            <span className={`drop-shadow-[0_1px_1px_rgb(0_0_0_/_85%)] ${
                                                key.label.length > 2 ? 'text-[0.72em]' : ''
                                            }`}>
                                                {key.label === 'Space' ? '' : key.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center px-[clamp(1rem,5vw,5rem)] pt-[clamp(4.5rem,11vh,8rem)]">
                <div className="relative flex items-center justify-center">
                    <div
                        className="m-0 flex origin-center items-center justify-center gap-[clamp(0.35rem,1vw,0.9rem)]"
                        ref={keyBlocksRef}
                        aria-hidden="true"
                    >
                        {skillLetters.map((letter, index) => (
                            <span
                                className="floating-skill-key grid aspect-square w-[clamp(2.8rem,7vw,6.5rem)] place-items-center rounded-[clamp(0.4rem,1vw,0.9rem)] border border-white/14 bg-[linear-gradient(145deg,#353837,#111312)] text-[clamp(1.35rem,3.5vw,3.3rem)] leading-none font-bold text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_16%),0_1rem_2.3rem_rgb(21_25_24_/_25%)]"
                                key={`${letter}-${index}`}
                                ref={(element) => {
                                    floatingKeyRefs.current[index] = element;
                                }}
                            >
                                {letter}
                            </span>
                        ))}
                    </div>
                    <h2
                        className="absolute m-0 whitespace-nowrap text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.78] font-bold tracking-[-0.09em] text-[#151716]"
                        ref={headingRef}
                    >
                        SKILLS
                    </h2>
                </div>

                <div
                    className="pointer-events-auto mt-[clamp(2rem,7vh,5.5rem)] w-[min(90vw,56rem)]"
                    ref={accordionRef}
                >
                    {skillGroups.map((group, index) => {
                        const isOpen = openGroup === group.id;
                        const panelId = `${group.id}-panel`;
                        return (
                            <article
                                className="border-b border-black/18 first:border-t"
                                key={group.id}
                            >
                                <button
                                    className="flex w-full items-center justify-between gap-6 border-0 bg-transparent px-[clamp(0.25rem,1vw,0.8rem)] py-[clamp(0.9rem,1.8vw,1.35rem)] text-left text-[clamp(1.05rem,2vw,1.65rem)] font-semibold tracking-[-0.035em] text-[#171918]"
                                    type="button"
                                    aria-controls={panelId}
                                    aria-expanded={isOpen}
                                    onClick={() => setOpenGroup(group.id)}
                                >
                                    <span className="flex items-center gap-[clamp(0.75rem,1.5vw,1.2rem)]">
                                        <span className="text-[0.55em] font-semibold tracking-[0.08em] text-black/35">
                                            0{index + 1}
                                        </span>
                                        {group.title}
                                    </span>
                                    <ChevronDown
                                        className={`size-[1.1em] transition-transform duration-300 ${
                                            isOpen ? 'rotate-180' : ''
                                        }`}
                                        aria-hidden="true"
                                    />
                                </button>
                                <div
                                    className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                                        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                                    }`}
                                    id={panelId}
                                >
                                    <div className="overflow-hidden">
                                        <ul className="m-0 flex list-none flex-wrap gap-2 px-[clamp(0.25rem,1vw,0.8rem)] pb-[clamp(1rem,2vw,1.5rem)]">
                                            {group.skills.map((skill) => (
                                                <li
                                                    className="rounded-full border border-black/12 bg-white/65 px-[clamp(0.7rem,1.4vw,1.1rem)] py-[clamp(0.35rem,0.7vw,0.55rem)] text-[clamp(0.7rem,1vw,0.9rem)] font-medium text-black/72 shadow-[inset_0_1px_0_rgb(255_255_255_/_80%)]"
                                                    key={skill}
                                                >
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default KeyboardSkillsScene;
