import React, { useState, useEffect, useRef } from 'react';
import { AppointmentStatus, Appointment } from '../types';
import { SERVICES, DOCTORS } from '../constants';
import { Calendar, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AppointmentForm: React.FC = () => {
  const { t, language } = useLanguage();
  const [status, setStatus] = useState<AppointmentStatus>(AppointmentStatus.IDLE);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    service: '',
    doctor: '',
    notes: ''
  });
  const [isHighlighted, setIsHighlighted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  
  const statusRef = useRef(status);
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    const highlightForm = () => {
      setIsHighlighted(true);
      setTimeout(() => setIsHighlighted(false), 2000);
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const handleDoctorSelection = (event: any) => {
      const selectedDoctor = event.detail.doctor;
      setFormData(prev => ({ ...prev, doctor: selectedDoctor }));
      setStatus(AppointmentStatus.IDLE);
      highlightForm();
    };

    const handleGeneralBookNow = () => {
      if (statusRef.current === AppointmentStatus.SUCCESS) {
        setFormData({ name: '', phone: '', date: '', service: '', doctor: '', notes: '' });
      }
      setStatus(AppointmentStatus.IDLE);
      highlightForm();
    };

    window.addEventListener('clinic-select-doctor', handleDoctorSelection);
    window.addEventListener('clinic-book-now', handleGeneralBookNow);
    
    return () => {
      window.removeEventListener('clinic-select-doctor', handleDoctorSelection);
      window.removeEventListener('clinic-book-now', handleGeneralBookNow);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(AppointmentStatus.SUBMITTING);

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const existingData = localStorage.getItem('clinic_appointments');
    const appointments = existingData ? JSON.parse(existingData) : [];
    appointments.unshift(newAppointment);
    localStorage.setItem('clinic_appointments', JSON.stringify(appointments));

    // Notify other components that appointments have changed
    window.dispatchEvent(new CustomEvent('clinic-appointments-updated'));

    setTimeout(() => {
      setStatus(AppointmentStatus.SUCCESS);
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (status === AppointmentStatus.SUCCESS) {
    return (
      <div id="appointment" ref={formRef} className="bg-primary-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8 text-center border-2 border-green-500 animate-in fade-in zoom-in duration-300">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">{t.appointment.successTitle}</h2>
          <p className="mt-2 text-gray-500">
            {t.appointment.successMsg(formData.name, formData.date, formData.phone)}
          </p>
          <button
            onClick={() => {
              setFormData({ name: '', phone: '', date: '', service: '', doctor: '', notes: '' });
              setStatus(AppointmentStatus.IDLE);
            }}
            className="mt-6 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200"
          >
            {t.appointment.bookAnother}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="appointment" ref={formRef} className="bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden lg:py-24">
      <div className="relative max-w-xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {t.appointment.title}
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            {t.appointment.subtitle}
          </p>
        </div>
        
        <div className="mt-12">
          <form 
            onSubmit={handleSubmit} 
            className={`grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 transition-all duration-500 p-4 rounded-2xl ${isHighlighted ? 'ring-4 ring-primary-400 bg-primary-50 shadow-2xl scale-[1.02]' : ''}`}
          >
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t.appointment.form.name}</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 border rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{t.appointment.form.phone}</label>
              <div className="mt-1">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 border rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">{t.appointment.form.date}</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="date"
                  id="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="py-3 pl-10 block w-full focus:ring-primary-500 focus:border-primary-500 border-gray-300 border rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="service" className="block text-sm font-medium text-gray-700">{t.appointment.form.service}</label>
              <div className="mt-1">
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 border rounded-md bg-white"
                >
                  <option value="">{t.appointment.form.servicePlaceholder}</option>
                  {SERVICES.map(s => <option key={s.id} value={s.title[language]}>{s.title[language]}</option>)}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">{t.appointment.form.doctor}</label>
              <div className="mt-1">
                 <select
                  id="doctor"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className={`py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 border rounded-md bg-white transition-all ${isHighlighted && formData.doctor ? 'ring-2 ring-primary-600 border-primary-600' : ''}`}
                >
                  <option value="">{t.appointment.form.doctorAny}</option>
                  {DOCTORS.map(d => <option key={d.id} value={d.name[language]}>{d.name[language]} ({d.specialty[language]})</option>)}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">{t.appointment.form.notes}</label>
              <div className="mt-1">
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border border-gray-300 rounded-md"
                ></textarea>
              </div>
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === AppointmentStatus.SUBMITTING}
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-95"
              >
                {status === AppointmentStatus.SUBMITTING ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t.appointment.form.processing}
                  </span>
                ) : (
                  t.appointment.form.submit
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;