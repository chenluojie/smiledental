import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Team from './components/Team';
import AppointmentForm from './components/AppointmentForm';
import Footer from './components/Footer';
import AIChatWidget from './components/AIChatWidget';
import AdminDashboard from './components/AdminDashboard';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { TESTIMONIALS } from './constants';

const Content: React.FC = () => {
  const { t, language } = useLanguage();
  const [view, setView] = useState<'site' | 'admin'>('site');

  if (view === 'admin') {
    return <AdminDashboard onBack={() => setView('site')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-primary-100 selection:text-primary-900">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Team />
        
        {/* Testimonials Section */}
        <section id="testimonials" className="bg-primary-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-8">
              {t.testimonials.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {TESTIMONIALS.map((testimonial) => (
                 <div key={testimonial.id} className="bg-primary-700 rounded-lg p-6 shadow-lg">
                   <p className="text-lg text-primary-100 italic">"{testimonial.comment[language]}"</p>
                   <p className="mt-4 font-bold text-white">- {testimonial.name[language]}</p>
                   <div className="mt-2 flex justify-center text-yellow-400">
                     {[...Array(testimonial.rating)].map((_, i) => (
                       <span key={i}>★</span>
                     ))}
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        <AppointmentForm />
      </main>
      <Footer onAdminClick={() => setView('admin')} />
      
      {/* AI Chat Bot */}
      <AIChatWidget />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Content />
    </LanguageProvider>
  );
};

export default App;
