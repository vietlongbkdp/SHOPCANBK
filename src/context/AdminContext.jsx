import { createContext, useContext, useState, useEffect } from 'react';
import defaultData from '../data.json';

const AdminContext = createContext();
const ADMIN_KEY = 'bk_admin_logged';
const DATA_KEY  = 'bk_site_data';
const PASS_KEY  = 'bk_admin_pass';
const DEFAULT_PASS = 'bachkhoa@2025';

export function AdminProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem(ADMIN_KEY) === 'yes');

  // Load site data from localStorage (fallback to default data.json)
  const [siteData, setSiteData] = useState(() => {
    try {
      const saved = localStorage.getItem(DATA_KEY);
      return saved ? JSON.parse(saved) : defaultData;
    } catch { return defaultData; }
  });

  // Persist siteData changes
  useEffect(() => {
    localStorage.setItem(DATA_KEY, JSON.stringify(siteData));
  }, [siteData]);

  const login = (password) => {
    const savedPass = localStorage.getItem(PASS_KEY) || DEFAULT_PASS;
    if (password === savedPass) {
      sessionStorage.setItem(ADMIN_KEY, 'yes');
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(ADMIN_KEY);
    setIsLoggedIn(false);
  };

  const changePassword = (oldPass, newPass) => {
    const savedPass = localStorage.getItem(PASS_KEY) || DEFAULT_PASS;
    if (oldPass !== savedPass) return false;
    localStorage.setItem(PASS_KEY, newPass);
    return true;
  };

  // Product CRUD
  const addProduct = (product) => {
    const newId = Math.max(...siteData.products.map(p => p.id), 0) + 1;
    setSiteData(prev => ({ ...prev, products: [...prev.products, { ...product, id: newId }] }));
  };

  const updateProduct = (updatedProduct) => {
    setSiteData(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === updatedProduct.id ? updatedProduct : p),
    }));
  };

  const deleteProduct = (id) => {
    setSiteData(prev => ({ ...prev, products: prev.products.filter(p => p.id !== id) }));
  };

  // Company info update
  const updateCompany = (companyInfo) => {
    setSiteData(prev => ({ ...prev, company: { ...prev.company, ...companyInfo } }));
  };

  // Category CRUD
  const addCategory = (cat) => {
    const newId = Math.max(...siteData.categories.map(c => c.id), 0) + 1;
    setSiteData(prev => ({ ...prev, categories: [...prev.categories, { ...cat, id: newId }] }));
  };
  const updateCategory = (cat) => {
    setSiteData(prev => ({ ...prev, categories: prev.categories.map(c => c.id === cat.id ? cat : c) }));
  };
  const deleteCategory = (id) => {
    setSiteData(prev => ({ ...prev, categories: prev.categories.filter(c => c.id !== id) }));
  };

  const resetToDefault = () => {
    localStorage.removeItem(DATA_KEY);
    setSiteData(defaultData);
  };

  return (
    <AdminContext.Provider value={{
      isLoggedIn, login, logout, changePassword,
      siteData, addProduct, updateProduct, deleteProduct,
      updateCompany, addCategory, updateCategory, deleteCategory,
      resetToDefault,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
