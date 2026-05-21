import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import './App.css';
import theme from './theme';

// Contexts
import { CartProvider } from './context/CartContext';
import { AdminProvider, useAdmin } from './context/AdminContext';

// Components
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

// Detect /admin path
const isAdminPath = () =>
  window.location.pathname === '/admin' ||
  window.location.pathname.startsWith('/admin/');

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartOpen, setCartOpen] = useState(false);

  // Admin mode: false | 'login' | 'dashboard'
  const [adminMode, setAdminMode] = useState(() => isAdminPath() ? 'login' : false);
  const { isLoggedIn } = useAdmin();

  // When navigating to /admin directly, show admin
  useEffect(() => {
    if (isAdminPath() && !adminMode) setAdminMode('login');
  }, []);

  // If already logged in and visiting /admin, go straight to dashboard
  useEffect(() => {
    if (isAdminPath() && isLoggedIn) setAdminMode('dashboard');
  }, [isLoggedIn]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Clear /admin path when going back to site
    if (isAdminPath()) window.history.pushState({}, '', '/');
  };

  const exitAdmin = () => {
    setAdminMode(false);
    window.history.pushState({}, '', '/');
  };

  // Admin screens take over whole page
  if (adminMode === 'login') {
    return <AdminLogin onSuccess={() => setAdminMode('dashboard')} />;
  }
  if (adminMode === 'dashboard') {
    return <AdminDashboard onExitAdmin={exitAdmin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'introduction': return <Introduction />;
      case 'services':     return <Services />;
      case 'products':     return <Products onProductClick={setSelectedProduct} />;
      case 'documents':    return <Documents />;
      case 'contact':      return <Contact />;
      default:
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <Home onProductClick={setSelectedProduct} onNavigate={handleNavigate} />
          </>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f5f5f5' }}>
      <Header />
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
        onOpenCart={() => setCartOpen(true)}
      />
      <Box sx={{ flex: 1 }}>{renderPage()}</Box>
      <Footer />
      <FloatingContactWidget />
      <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </Box>
  );
}

function App() {
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

export default App;
