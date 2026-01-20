import React, { useState, useEffect } from 'react';
import { CLINIC_INFO } from '../constants';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Appointment } from '../types';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  const { t, language } = useLanguage();
  const [unreadCount, setUnreadCount] = useState(0);

  const checkUnreadAppointments = () => {
    const data = localStorage.getItem('clinic_appointments');
    if (data) {
      const appointments: Appointment[] = JSON.parse(data);
      const pendingCount = appointments.filter(app => app.status === 'pending').length;
      setUnreadCount(pendingCount);
    } else {
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    // Check on mount
    checkUnreadAppointments();

    // Listen for custom update events
    window.addEventListener('clinic-appointments-updated', checkUnreadAppointments);
    
    return () => {
      window.removeEventListener('clinic-appointments-updated', checkUnreadAppointments);
    };
  }, []);

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Clinic Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-wider text-primary-400">{CLINIC_INFO.name}</h3>
            <p className="text-gray-400 text-sm">
              {t.footer.desc}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">{t.footer.contact}</h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start">
                <MapPin className="flex-shrink-0 h-6 w-6 text-primary-400" />
                <span className="ml-3 text-base text-gray-400">{CLINIC_INFO.address[language]}</span>
              </li>
              <li className="flex items-center">
                <Phone className="flex-shrink-0 h-6 w-6 text-primary-400" />
                <span className="ml-3 text-base text-gray-400">{CLINIC_INFO.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="flex-shrink-0 h-6 w-6 text-primary-400" />
                <span className="ml-3 text-base text-gray-400">{CLINIC_INFO.email}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">{t.footer.hours}</h3>
            <div className="mt-4 space-y-2">
              <p className="text-base text-gray-400">{CLINIC_INFO.openingHours[language]}</p>
              <p className="text-base text-gray-400">{t.footer.sunday}</p>
              <p className="text-base text-gray-400 mt-4 text-xs italic">{t.footer.emergency}</p>
            </div>
          </div>

        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {CLINIC_INFO.name}. {t.footer.rights}
          </p>
          <div className="relative">
            <button 
              onClick={onAdminClick}
              className="flex items-center gap-1.5 text-gray-600 hover:text-primary-400 text-xs transition px-2 py-1 rounded hover:bg-gray-800"
            >
              <Lock size={12} /> {t.footer.staffPortal}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] text-white font-bold items-center justify-center">
                    {unreadCount}
                  </span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;