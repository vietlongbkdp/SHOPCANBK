import { createContext, useContext, useState, useEffect } from 'react';
import defaultData from '../data.json';

const AdminContext = createContext();
const ADMIN_KEY   = 'bk_admin_logged';
const DATA_KEY    = 'bk_site_data';
const PASS_KEY    = 'bk_admin_pass';
const DATA_VER    = 'bk_data_v3';          // bump this to force reset on structure change
const DEFAULT_PASS = 'bachkhoa@2025';

function loadSiteData() {
  try {
    // Version check — if outdated, reset to default
    if (localStorage.getItem('bk_data_version') !== DATA_VER) {
      localStorage.removeItem(DATA_KEY);
      localStorage.setItem('bk_data_version', DATA_VER);
      return defaultData;
    }
    const saved = localStorage.getItem(DATA_KEY);
    if (!saved) return defaultData;
    const parsed = JSON.parse(saved);
    // Merge: always ensure all top-level keys from defaultData exist
    return {
      ...defaultData,
      ...parsed,
      company:    { ...defaultData.company,    ...(parsed.company    || {}) },
      categories: parsed.categories?.length  ? parsed.categories  : defaultData.categories,
      products:   parsed.products?.length    ? parsed.products    : defaultData.products,
      services:   parsed.services?.length    ? parsed.services    : defaultData.services,
      stats:      parsed.stats?.length       ? parsed.stats       : defaultData.stats,
      news:       parsed.news?.length        ? parsed.news        : defaultData.news,
    };
  } catch {
    return defaultData;
  }
}

export function AdminProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem(ADMIN_KEY) === 'yes'
  );

  const [siteData, setSiteData] = useState(loadSiteData);

  useEffect(() => {
    localStorage.setItem(DATA_KEY, JSON.stringify(siteData));
  }, [siteData]);

  const login = (password) => {
    const saved = localStorage.getItem(PASS_KEY) || DEFAULT_PASS;
    if (password === saved) {
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
    const saved = localStorage.getItem(PASS_KEY) || DEFAULT_PASS;
    if (oldPass !== saved) return false;
    localStorage.setItem(PASS_KEY, newPass);
    return true;
  };

  // ── Product CRUD ──
  const addProduct = (product) => {
    const newId = Math.max(0, ...siteData.products.map((p) => p.id)) + 1;
    setSiteData((prev) => ({ ...prev, products: [...prev.products, { ...product, id: newId }] }));
  };
  const updateProduct = (updated) =>
    setSiteData((prev) => ({ ...prev, products: prev.products.map((p) => (p.id === updated.id ? updated : p)) }));
  const deleteProduct = (id) =>
    setSiteData((prev) => ({ ...prev, products: prev.products.filter((p) => p.id !== id) }));

  // ── Company ──
  const updateCompany = (info) =>
    setSiteData((prev) => ({ ...prev, company: { ...prev.company, ...info } }));

  // ── Category CRUD ──
  const addCategory = (cat) => {
    const newId = Math.max(0, ...siteData.categories.map((c) => c.id)) + 1;
    setSiteData((prev) => ({ ...prev, categories: [...prev.categories, { ...cat, id: newId }] }));
  };
  const updateCategory = (cat) =>
    setSiteData((prev) => ({ ...prev, categories: prev.categories.map((c) => (c.id === cat.id ? cat : c)) }));
  const deleteCategory = (id) =>
    setSiteData((prev) => ({ ...prev, categories: prev.categories.filter((c) => c.id !== id) }));

  const resetToDefault = () => {
    localStorage.removeItem(DATA_KEY);
    localStorage.setItem('bk_data_version', DATA_VER);
    setSiteData(defaultData);
  };

  return (
    <AdminContext.Provider value={{
      isLoggedIn, login, logout, changePassword,
      siteData,
      addProduct, updateProduct, deleteProduct,
      updateCompany,
      addCategory, updateCategory, deleteCategory,
      resetToDefault,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider');
  return ctx;
};
