import React from 'react';
import Hero from './Hero';
import StatsSection from './StatsSection';
import Features from './Features';
import Methodology from './Methodology';
import SpecialNeedsSection from './SpecialNeedsSection';
import CounselingSection from './CounselingSection';
import Testimonials from './Testimonials';
import Courses from './Courses';
import CreativeGallery from './CreativeGallery';
import AuthSection from './AuthSection';
import { Language } from '../App';

interface HomeProps {
    isDark: boolean;
    lang: Language;
}

const Home: React.FC<HomeProps> = ({ isDark, lang }) => {
    return (
        <div className="relative z-10">
            <Hero isDark={isDark} lang={lang} />

            <div className="relative z-10">
                <StatsSection lang={lang} />

                <section id="technology" aria-labelledby="technology-heading">
                    <Features lang={lang} />
                </section>

                <section id="methodology" aria-labelledby="methodology-heading">
                    <Methodology lang={lang} />
                </section>

                <section id="special-needs" aria-labelledby="special-needs-heading">
                    <SpecialNeedsSection lang={lang} />
                </section>

                <section id="testimonials" aria-labelledby="testimonials-heading">
                    <Testimonials lang={lang} />
                </section>

                <section id="counseling" aria-labelledby="counseling-heading">
                    <CounselingSection lang={lang} />
                </section>

                <section id="courses" aria-labelledby="courses-heading">
                    <Courses lang={lang} />
                </section>

                <section id="creative-gallery">
                    <CreativeGallery lang={lang} />
                </section>

                <AuthSection lang={lang} />
            </div>
        </div>
    );
};

export default Home;
