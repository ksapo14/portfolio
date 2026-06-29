import { useState } from 'react';
import ContactSection from './components/ContactSection';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import HomeLogo from './components/HomeLogo';
import LaptopParallax from './components/LaptopParallax';
import LoadingScreen from './components/LoadingScreen';
import MobilePhoneParallax from './components/MobilePhoneParallax';
import ScrollStatusBar from './components/ScrollStatusBar';
import Navbar from './components/navbar/Navbar';
import useMediaQuery from './hooks/useMediaQuery';

function App() {
    const [activeSection, setActiveSection] = useState('home');
    const isMobile = useMediaQuery('(max-width: 767px)');

    return (
        <main>
            <LoadingScreen />
            <CustomCursor />
            <HomeLogo />
            <ScrollStatusBar />
            <Navbar
                activeSection={activeSection}
                onActiveSectionChange={setActiveSection}
            />
            {isMobile
                ? <MobilePhoneParallax onSectionChange={setActiveSection} />
                : <LaptopParallax onSectionChange={setActiveSection} />}
            <ContactSection onSectionChange={setActiveSection} />
            <Footer />
        </main>
    );
}

export default App;
