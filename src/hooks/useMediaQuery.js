import { useEffect, useState } from 'react';

function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => (
        typeof window === 'undefined' ? false : window.matchMedia(query).matches
    ));

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        const updateMatch = () => setMatches(mediaQuery.matches);

        updateMatch();
        mediaQuery.addEventListener('change', updateMatch);
        return () => mediaQuery.removeEventListener('change', updateMatch);
    }, [query]);

    return matches;
}

export default useMediaQuery;
