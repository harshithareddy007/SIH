import { useState } from 'react';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import MedicinePage from './components/MedicinePage';
import ConsultationPage from './components/ConsultationPage';
import EmergencyPage from './components/EmergencyPage';
import EducationPage from './components/EducationPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onPageChange={setCurrentPage} />;
      case 'login':
        return <LoginPage onPageChange={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard onPageChange={setCurrentPage} />;
      case 'medicine':
        return <MedicinePage onPageChange={setCurrentPage} />;
      case 'consultation':
        return <ConsultationPage onPageChange={setCurrentPage} />;
      case 'emergency':
        return <EmergencyPage onPageChange={setCurrentPage} />;
      case 'education':
        return <EducationPage onPageChange={setCurrentPage} />;
      default:
        return <LandingPage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}