import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import './App.css';
import theme from './theme';
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
import News from './components/News';
import FloatingContactWidget from './components/FloatingContactWidget';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'introduction': return <Introduction />;
      case 'services': return <Services />;
      case 'products': return <Products onProductClick={setSelectedProduct} />;
      case 'documents': return <Documents />;
      case 'news': return <News />;
      case 'contact': return <Contact />;
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f5f5f5' }}>
        <Header />
        <Navigation
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onSearch={setSearchTerm}
          searchTerm={searchTerm}
        />
        <Box sx={{ flex: 1 }}>
          {renderPage()}
        </Box>
        <Footer />
        <FloatingContactWidget />
        <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
