import React, { useState } from 'react';
import { DOCTORS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { Doctor } from '../types';
import { X, GraduationCap, FileText, Calendar } from 'lucide-react';

const Team: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleBookVisit = (e: React.MouseEvent, doctorName: string) => {
    e.preventDefault();
    setSelectedDoctor(null); // Close modal if open
    
    // Dispatch custom event to update the appointment form
    window.dispatchEvent(new CustomEvent('clinic-select-doctor', { 
      detail: { doctor: doctorName } 
    }));
    
    // Smooth scroll to form
    const element = document.getElementById('appointment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openProfile = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div id="doctors" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {t.team.title}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            {t.team.subtitle}
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DOCTORS.map((doctor) => (
            <li key={doctor.id} className="col-span-1 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow divide-y divide-gray-200 border border-gray-100 overflow-hidden group">
              <div className="w-full flex items-center justify-between p-6 space-x-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-gray-900 text-lg font-bold truncate">{doctor.name[language]}</h3>
                    <span className="flex-shrink-0 inline-block px-2 py-0.5 text-secondary-800 text-xs font-medium bg-secondary-100 rounded-full">
                      {doctor.experience[language]}
                    </span>
                  </div>
                  <p className="mt-1 text-primary-600 text-sm font-semibold truncate">{doctor.title[language]}</p>
                  <p className="mt-3 text-gray-500 text-sm h-10 line-clamp-2">{doctor.specialty[language]}</p>
                </div>
                <img className="w-24 h-24 bg-gray-300 rounded-full flex-shrink-0 object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform" src={doctor.image} alt={doctor.name[language]} />
              </div>
              <div className="flex divide-x divide-gray-200">
                <button 
                  onClick={() => openProfile(doctor)}
                  className="flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  {t.team.viewProfile}
                </button>
                <button 
                  onClick={(e) => handleBookVisit(e, doctor.name[language])}
                  className="flex-1 inline-flex items-center justify-center py-4 text-sm text-primary-600 font-bold hover:bg-primary-50 transition-colors"
                >
                  {t.team.bookVisit}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" 
            onClick={() => setSelectedDoctor(null)}
          />
          <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">{t.team.viewProfile}</h3>
              <button 
                onClick={() => setSelectedDoctor(null)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <img 
                  src={selectedDoctor.image} 
                  alt={selectedDoctor.name[language]} 
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover shadow-lg border-4 border-white"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedDoctor.name[language]}</h2>
                    <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-bold rounded-md">
                      {selectedDoctor.experience[language]}
                    </span>
                  </div>
                  <p className="text-primary-600 font-bold mb-2">{selectedDoctor.title[language]}</p>
                  <p className="text-gray-500 text-sm">{selectedDoctor.specialty[language]}</p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-secondary-50 text-secondary-700 rounded-full text-xs font-medium border border-secondary-100">
                      <Calendar size={12} /> 可预约
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <section>
                  <div className="flex items-center gap-2 mb-3 text-gray-900">
                    <GraduationCap className="text-primary-600" size={20} />
                    <h4 className="font-bold">{t.team.education}</h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed pl-7">
                    {selectedDoctor.education[language]}
                  </p>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-3 text-gray-900">
                    <FileText className="text-primary-600" size={20} />
                    <h4 className="font-bold">{t.team.bio}</h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed pl-7">
                    {selectedDoctor.bio[language]}
                  </p>
                </section>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t bg-gray-50">
              <button 
                onClick={(e) => handleBookVisit(e, selectedDoctor.name[language])}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {t.team.bookVisit}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;