import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Experience } from '@/sections/Experience';
import { Skills } from '@/sections/Skills';
import { Footer } from '@/sections/Footer';
import { activeResume } from '@/config/variant';

export default function App() {
  useEffect(() => {
    document.title = activeResume.pageTitle;
  }, []);

  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Footer />
      </main>
    </>
  );
}
