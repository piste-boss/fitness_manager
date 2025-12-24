import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Dumbbell, Utensils, User, Calendar, Scale } from 'lucide-react';

import Home from './pages/Home';
const ExercisePage = () => <div className="container"><h1>Exercise Record</h1></div>;
const WeightPage = () => <div className="container"><h1>Weight Record</h1></div>;
const CoachPage = () => <div className="container"><h1>AI Coach</h1></div>;
const MenuPage = () => <div className="container"><h1>Menu</h1></div>;
const MealPage = () => <div className="container"><h1>Meal Management</h1></div>;
const RegisterPage = () => <div className="container"><h1>Register</h1></div>;

const Navigation = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // Hide nav on registration pages
  if (location.pathname.startsWith('/register')) return null;

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      maxWidth: '600px',
      margin: '0 auto',
      height: 'calc(var(--nav-height) + var(--safe-area-bottom))',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-start',
      paddingTop: '12px',
      zIndex: 100
    }}>
      <NavItem icon={<HomeIcon size={24} />} label="ホーム" to="/" active={isActive('/')} />
      <NavItem icon={<Calendar size={24} />} label="運動記録" to="/exercise" active={isActive('/exercise')} />
      <NavItem icon={<Utensils size={24} />} label="食事管理" to="/meal" active={isActive('/meal')} />
      <NavItem icon={<Scale size={24} />} label="体重記録" to="/weight" active={isActive('/weight')} />
      <NavItem icon={<Dumbbell size={24} />} label="AIコーチ" to="/coach" active={isActive('/coach')} />
      <NavItem icon={<User size={24} />} label="マイページ" to="/menu" active={isActive('/menu')} />
    </nav>
  );
};

const NavItem = ({ icon, label, to, active }) => {
  const color = active ? 'var(--primary-dark)' : 'var(--text-sub)';
  return (
    <a href={to} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
      color: color,
      fontSize: '10px',
      fontWeight: active ? '700' : '500',
      width: '64px'
    }}>
      {icon}
      <span>{label}</span>
    </a>
  );
};

import Terms from './pages/registration/Terms';
import RegisterForm from './pages/registration/RegisterForm';
import Signature from './pages/registration/Signature';
import Payment from './pages/registration/Payment';
import Complete from './pages/registration/Complete';

// ... (keep creating other pages)

import { RegistrationProvider } from './context/RegistrationContext';

function App() {
  return (
    <Router>
      <RegistrationProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise" element={<ExercisePage />} />
          <Route path="/meal" element={<MealPage />} />
          <Route path="/weight" element={<WeightPage />} />
          <Route path="/coach" element={<CoachPage />} />
          <Route path="/menu" element={<MenuPage />} />

          {/* Registration Flow */}
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/register/terms" element={<Terms />} />
          <Route path="/register/form" element={<RegisterForm />} />
          <Route path="/register/signature" element={<Signature />} />
          <Route path="/register/payment" element={<Payment />} />
          <Route path="/register/complete" element={<Complete />} />
        </Routes>
      </RegistrationProvider>
      <Navigation />
    </Router>
  );
}

export default App;
