import { createContext, useContext, useState, useEffect } from 'react';
import defaultData from '../data.json';

const AdminContext  = createContext();
const ADMIN_KEY     = 'bk_admin_logged';
const PASS_KEY      = 'bk_admin_pass';
const DEFAULT_PASS  = 'bachkhoa@2025';

// ── API helpers ──────────────────────────────────────────────
const api = {
  get:    (url)       => fetch(url).then(r => r.json()),
  post:   (url, body) => fetch(url, { method: 'POST',   headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(r => r.json()),
  put:    (url, body) => fetch(url, { method: 'PUT',    headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(r => r.json()),
  delete: (url)       => fetch(url, { method: 'DELETE' }).then(r => r.json()),
};

export function AdminProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem(ADMIN_KEY) === 'yes'
  );

  // siteData: loaded from MongoDB via API, fallback to data.json while loading
  const [siteData, setSiteData]   = useState({
    ...defaultData,
    _loaded: false,   // flag: false = still loading from API
  });
  const [loading, setLoading]     = useState(true);
  const [apiError, setApiError]   = useState(false);

  // ── Load data from MongoDB on mount ──
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [products, categories, company] = await Promise.all([
          api.get('/api/products'),
          api.get('/api/categories'),
          api.get('/api/company'),
        ]);

        if (cancelled) return;

        // If DB is empty (first run), use defaultData as fallback
        setSiteData({
          ...defaultData,
          products:   products.length   ? products   : defaultData.products,
          categories: categories.length ? categories : defaultData.categories,
          company:    Object.keys(company).length > 1 ? company : defaultData.company,
          _loaded: true,
        });
      } catch (err) {
        console.warn('API không khả dụng, dùng data.json:', err.message);
        setApiError(true);
        setSiteData({ ...defaultData, _loaded: true });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // ── Auth ──
  const login = (password) => {
    const saved = localStorage.getItem(PASS_KEY) || DEFAULT_PASS;
    if (password === saved) { sessionStorage.setItem(ADMIN_KEY, 'yes'); setIsLoggedIn(true); return true; }
    return false;
  };
  const logout = () => { sessionStorage.removeItem(ADMIN_KEY); setIsLoggedIn(false); };
  const changePassword = (oldPass, newPass) => {
    const saved = localStorage.getItem(PASS_KEY) || DEFAULT_PASS;
    if (oldPass !== saved) return false;
    localStorage.setItem(PASS_KEY, newPass);
    return true;
  };

  // ── Product CRUD ──
  const addProduct = async (product) => {
    const saved = await api.post('/api/products', product);
    setSiteData(prev => ({ ...prev, products: [...prev.products, saved] }));
  };
  const updateProduct = async (product) => {
    await api.put('/api/products', product);
    setSiteData(prev => ({ ...prev, products: prev.products.map(p => p.id === product.id ? product : p) }));
  };
  const deleteProduct = async (id) => {
    await api.delete(`/api/products?id=${id}`);
    setSiteData(prev => ({ ...prev, products: prev.products.filter(p => p.id !== id) }));
  };

  // ── Company ──
  const updateCompany = async (info) => {
    await api.put('/api/company', info);
    setSiteData(prev => ({ ...prev, company: { ...prev.company, ...info } }));
  };

  // ── Category CRUD ──
  const addCategory = async (cat) => {
    const saved = await api.post('/api/categories', cat);
    setSiteData(prev => ({ ...prev, categories: [...prev.categories, saved] }));
  };
  const updateCategory = async (cat) => {
    await api.put('/api/categories', cat);
    setSiteData(prev => ({ ...prev, categories: prev.categories.map(c => c.id === cat.id ? cat : c) }));
  };
  const deleteCategory = async (id) => {
    await api.delete(`/api/categories?id=${id}`);
    setSiteData(prev => ({ ...prev, categories: prev.categories.filter(c => c.id !== id) }));
  };

  const resetToDefault = async () => {
    // Re-seed from data.json via seed endpoint (requires SEED_KEY)
    setSiteData({ ...defaultData, _loaded: true });
  };

  return (
    <AdminContext.Provider value={{
      isLoggedIn, login, logout, changePassword,
      siteData, loading, apiError,
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
  if (!ctx) throw new Error('useAdmin phải dùng bên trong AdminProvider');
  return ctx;
};
