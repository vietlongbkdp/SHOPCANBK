import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import './App.css';
import theme from './theme';

import { CartProvider } from './context/CartContext';
import { AdminProvider, useAdmin } from './context/AdminContext';

import Header from './components/Header';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Home from './components/Home';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import Contact from './components/Contact';
import Introduction from './components/Introduction';
import Services from './components/Services';
import Products from './components/Products';
import Documents from './components/Documents';
import FloatingContactWidget from './components/FloatingContactWidget';
import CartDrawer from './components/cart/CartDrawer';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import LoadingScreen from './components/LoadingScreen';
import AdminEntryButton from './components/AdminEntryButton';

const isAdminPath = () =>
  window.location.pathname === '/admin' ||
  window.location.pathname.startsWith('/admin/');

function AppContent() {
  const [currentPage, setCurrentPage]     = useState('home');
  const [selectedProduct, setSelected]    = useState(null);
  const [searchTerm, setSearchTerm]       = useState('');
  const [cartOpen, setCartOpen]           = useState(false);
  const [adminMode, setAdminMode]         = useState(() => isAdminPath() ? 'login' : false);
  const { isLoggedIn, loading }           = useAdmin();

  useEffect(() => {
    if (isAdminPath() && !adminMode) setAdminMode('login');
  }, []);

  useEffect(() => {
    if (isAdminPath() && isLoggedIn) setAdminMode('dashboard');
  }, [isLoggedIn]);

  // Show loading screen while fetching from MongoDB
  if (loading) return <LoadingScreen />;

  if (adminMode === 'login')     return <AdminLogin onSuccess={() => setAdminMode('dashboard')} />;
  if (adminMode === 'dashboard') return <AdminDashboard onExitAdmin={() => { setAdminMode(false); window.history.pushState({}, '', '/'); }} />;

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelected(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isAdminPath()) window.history.pushState({}, '', '/');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'introduction': return <Introduction />;
      case 'services':     return <Services />;
      case 'products':     return <Products onProductClick={setSelected} />;
      case 'documents':    return <Documents />;
      case 'contact':      return <Contact />;
      default:
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <Home onProductClick={setSelected} onNavigate={handleNavigate} />
          </>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f5f5f5' }}>
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1200, boxShadow: '0 2px 8px rgba(0,0,0,.12)' }}>
        <Header />
        <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
        onOpenCart={() => setCartOpen(true)}
      />
      </Box>
      <Box sx={{ flex: 1, mt: { xs: "94px", md: "150px" } }}>{renderPage()}</Box>
      <Footer />
      <FloatingContactWidget />
      <AdminEntryButton onClick={() => setAdminMode(isLoggedIn ? 'dashboard' : 'login')} />
      <ProductDetail product={selectedProduct} onClose={() => setSelected(null)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AdminProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AdminProvider>
    </ThemeProvider>
  );
}
