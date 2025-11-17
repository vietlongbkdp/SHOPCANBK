import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import './App.css';
import theme from './theme';
import Header from './components/Header';
import Navigation from './components/Navigation';
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
import data from './data.json';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = data.products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === parseInt(selectedCategory);
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    // If a product is selected, render the current page and overlay ProductDetail
    if (selectedProduct) {
      let pageContent = null;
      switch (currentPage) {
        case 'introduction':
          pageContent = <Introduction />;
          break;
        case 'services':
          pageContent = <Services />;
          break;
        case 'products':
          pageContent = <Products onProductClick={setSelectedProduct} />;
          break;
        case 'documents':
          pageContent = <Documents />;
          break;
        case 'news':
          pageContent = <News />;
          break;
        case 'contact':
          pageContent = <Contact />;
          break;
        case 'home':
        default:
          pageContent = (
            <Home onProductClick={setSelectedProduct} />
          );
      }

      return (
        <>
          {pageContent}
          <ProductDetail 
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        </>
      );
    }

    switch (currentPage) {
      case 'introduction':
        return <Introduction />;
      case 'services':
        return <Services />;
      case 'products':
        return <Products onProductClick={setSelectedProduct} />;
      case 'documents':
        return <Documents />;
      case 'news':
        return <News />;
      case 'contact':
        return <Contact />;
      case 'home':
      default:
        return <Home onProductClick={setSelectedProduct} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
      </Box>
    </ThemeProvider>
  );
}

export default App;
