import { useState } from 'react';
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

// Cart
import CartDrawer from './components/cart/CartDrawer';

// Admin
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [adminMode, setAdminMode] = useState(false); // 'login' | 'dashboard' | false
  const { isLoggedIn } = useAdmin();

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdmin = () => {
    if (isLoggedIn) setAdminMode('dashboard');
    else setAdminMode('login');
  };

  // Admin screens take over the whole page
  if (adminMode === 'login') {
    return <AdminLogin onSuccess={() => setAdminMode('dashboard')} />;
  }
  if (adminMode === 'dashboard') {
    return <AdminDashboard onExitAdmin={() => setAdminMode(false)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'introduction': return <Introduction />;
      case 'services':     return <Services />;
      case 'products':     return <Products onProductClick={setSelectedProduct} />;
      case 'documents':    return <Documents />;
      case 'contact':      return <Contact />;
      case 'home':
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
        onOpenAdmin={handleOpenAdmin}
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
