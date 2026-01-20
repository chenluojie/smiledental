import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Appointment } from '../types';
import { LogOut, Trash2, CheckCircle, AlertCircle, Phone, Calendar, User } from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loadAppointments = () => {
    const data = localStorage.getItem('clinic_appointments');
    if (data) {
      setAppointments(JSON.parse(data));
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Incorrect password. (Try "admin")');
    }
  };

  const updateStatus = (id: string) => {
    const updated = appointments.map(app => 
      app.id === id ? { ...app, status: (app.status === 'pending' ? 'contacted' : 'pending') as any } : app
    );
    setAppointments(updated);
    localStorage.setItem('clinic_appointments', JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('clinic-appointments-updated'));
  };

  const deleteAppointment = (id: string) => {
    if (confirm('Are you sure you want to delete this appointment?')) {
      const filtered = appointments.filter(app => app.id !== id);
      setAppointments(filtered);
      localStorage.setItem('clinic_appointments', JSON.stringify(filtered));
      window.dispatchEvent(new CustomEvent('clinic-appointments-updated'));
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">{t.admin.loginTitle}</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.admin.password}</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="Password"
              />
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition font-bold">
              {t.admin.login}
            </button>
            <button type="button" onClick={onBack} className="w-full text-gray-500 text-sm hover:underline">
              {t.admin.back}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900">{t.admin.title}</h1>
          <div className="flex gap-4">
            <button 
              onClick={onBack} 
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <LogOut size={16} /> {t.admin.back}
            </button>
          </div>
        </div>

        {appointments.length === 0 ? (
          <div className="text-center bg-white rounded-lg p-12 shadow">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">{t.admin.noAppointments}</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.admin.table.patient}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.admin.table.contact}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.admin.table.date}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.admin.table.service}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.admin.table.status}</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t.admin.table.actions}</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-primary-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{app.name}</div>
                            {app.notes && <div className="text-xs text-gray-400 truncate max-w-[150px]">{app.notes}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-2">
                           <Phone size={14} className="text-gray-400" /> {app.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-2">
                          <Calendar size={14} className="text-gray-400" /> {app.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-secondary-100 text-secondary-800">
                          {app.service}
                        </span>
                        <div className="text-[10px] text-gray-400 mt-1">{app.doctor || 'Any Doctor'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => updateStatus(app.id)}
                          className={`px-3 py-1 text-xs font-bold rounded-full border transition-colors ${
                            app.status === 'contacted' 
                              ? 'bg-green-100 text-green-800 border-green-200' 
                              : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                          }`}
                        >
                          {app.status === 'contacted' ? t.admin.status.contacted : t.admin.status.pending}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => deleteAppointment(app.id)}
                          className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;