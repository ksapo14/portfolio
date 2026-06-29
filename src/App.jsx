import { useState } from 'react';
import ContactSection from './components/ContactSection';
import CustomCursor from './components/CustomCursor';
import HomeLogo from './components/HomeLogo';
import LaptopParallax from './components/LaptopParallax';
import LoadingScreen from './components/LoadingScreen';
import ScrollStatusBar from './components/ScrollStatusBar';
import Navbar from './components/navbar/Navbar';

function App() {
    const [activeSection, setActiveSection] = useState('home');

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
            <LaptopParallax onSectionChange={setActiveSection} />
            <ContactSection onSectionChange={setActiveSection} />
        </main>
    );
}

export default App;
