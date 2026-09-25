import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Compositions from './components/Compositions';
import BookingForm from './components/BookingForm';
import Atmosphere from './components/Atmosphere';
import Footer from './components/Footer';
import AdminPortalModal from './components/AdminPortalModal';
import { FolderLock } from 'lucide-react';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    if ((window.location.pathname.includes('admin') || window.location.hash.includes('admin')) || window.location.pathname.startsWith('/admin')) {
      setIsAdminOpen(true);
    }
  }, []);
  
  // Custom Smooth Scroll Coordinators
  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 selection:bg-[#C5A880]/30 selection:text-[#C5A880] relative overflow-x-hidden">
      
      {/* Absolute Atmospheric Base Grain Overlay */}
      <div className="absolute inset-0 grain-overlay pointer-events-none z-10" />

      {/* Floating Glassmorphic Nav Bar */}
      <Navbar 
        onBookClick={() => scrollToSection('booking-section')}
        onMenuClick={() => scrollToSection('compositions-section')}
        onPhilosophyClick={() => scrollToSection('booking-section')} // scroll to top/intro
        onAtmosphereClick={() => scrollToSection('atmosphere-section')}
      />

      {/* Hero Visual Intro Block */}
      <main>
        <Hero 
          onReserveClick={() => scrollToSection('booking-section')}
          onExploreClick={() => scrollToSection('compositions-section')}
        />

        {/* Section 1 // The Mindset / Philosophy */}
        <Philosophy />

        {/* Section 2 // Curated Nigiri Compositions Menu */}
        <Compositions />

        {/* Section 3 // Material Craft & Sensory Atmosphere */}
        <Atmosphere />

        {/* Section 4 // Interactive Booking Engine and Private Custom Buyout Consultation Portal */}
        <BookingForm />
      </main>

      {/* Architectural Minimal Footer */}
      <Footer />

      {/* Floating VIP Admin Portal Pass Button */}
      <button
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-zinc-950 text-white border border-amber-500/40 hover:border-amber-400 px-4 py-3 rounded-xl shadow-2xl transition-all duration-200 flex items-center gap-2 cursor-pointer font-mono text-xs font-bold uppercase tracking-wider group hover:text-amber-400"
        id="yugen-admin-pass-btn"
      >
        <FolderLock className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
        [ SENSORY PASS ]
      </button>

      {/* Admin Portal Modal */}
      <AdminPortalModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      
    </div>
  );
}

