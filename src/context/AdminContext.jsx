import { createContext, useContext, useState } from 'react';
import defaultData from '../data.json';

const AdminContext = createContext();
const ADMIN_KEY    = 'bk_admin_logged';
const PASS_KEY     = 'bk_admin_pass';
const LOCAL_KEY    = 'bk_local_edits'; // unsaved local changes
const DEFAULT_PASS = 'bachkhoa@2025';

export function AdminProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem(ADMIN_KEY) === 'yes'
  );

  // Load: use defaultData (bundled, instant) — no fetch needed
  // Merge with any unsaved local edits
  const [siteData, setSiteData] = useState(() => {
    try {
      const local = localStorage.getItem(LOCAL_KEY);
      if (local) return { ...defaultData, ...JSON.parse(local) };
    } catch {}
    return defaultData;
  });

  const [saving, setSaving]     = useState(false);
  const [saveMsg, setSaveMsg]   = useState(null); // { type, text }

  // ── Auth ──
  const login = (pw) => {
    if (pw === (localStorage.getItem(PASS_KEY) || DEFAULT_PASS)) {
      sessionStorage.setItem(ADMIN_KEY, 'yes');
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };
  const logout = () => { sessionStorage.removeItem(ADMIN_KEY); setIsLoggedIn(false); };
  const changePassword = (oldPw, newPw) => {
    if (oldPw !== (localStorage.getItem(PASS_KEY) || DEFAULT_PASS)) return false;
    localStorage.setItem(PASS_KEY, newPw);
    return true;
  };

  // ── Local state update helper ──
  const update = (fn) => {
    setSiteData(prev => {
      const next = fn(prev);
      // Save locally so edits survive page refresh before publishing
      localStorage.setItem(LOCAL_KEY, JSON.stringify({
        products:   next.products,
        categories: next.categories,
        company:    next.company,
      }));
      return next;
    });
  };

  // ── Product CRUD ──
  const addProduct = (p) => update(prev => ({
    ...prev, products: [...prev.products, { ...p, id: Math.max(0, ...prev.products.map(x => x.id)) + 1 }],
  }));
  const updateProduct = (p) => update(prev => ({
    ...prev, products: prev.products.map(x => x.id === p.id ? p : x),
  }));
  const deleteProduct = (id) => update(prev => ({
    ...prev, products: prev.products.filter(x => x.id !== id),
  }));

  // ── Company ──
  const updateCompany = (info) => update(prev => ({
    ...prev, company: { ...prev.company, ...info },
  }));

  // ── Category CRUD ──
  const addCategory = (c) => update(prev => ({
    ...prev, categories: [...prev.categories, { ...c, id: Math.max(0, ...prev.categories.map(x => x.id)) + 1 }],
  }));
  const updateCategory = (c) => update(prev => ({
    ...prev, categories: prev.categories.map(x => x.id === c.id ? c : x),
  }));
  const deleteCategory = (id) => update(prev => ({
    ...prev, categories: prev.categories.filter(x => x.id !== id),
  }));

  // ── Publish to GitHub → triggers Vercel redeploy ──
  const publishToGitHub = async () => {
    setSaving(true);
    setSaveMsg(null);
    try {
      const payload = {
        ...defaultData,
        products:   siteData.products,
        categories: siteData.categories,
        company:    siteData.company,
        stats:      siteData.stats,
        services:   siteData.services,
        news:       siteData.news,
      };
      const res = await fetch('/api/save-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Clear local cache after successful publish
      localStorage.removeItem(LOCAL_KEY);
      setSaveMsg({ type: 'success', text: '✅ Đã lưu lên GitHub! Website sẽ cập nhật sau ~1 phút.' });
    } catch (err) {
      setSaveMsg({ type: 'error', text: `❌ Lỗi: ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  const resetToDefault = () => {
    localStorage.removeItem(LOCAL_KEY);
    setSiteData(defaultData);
  };

  // Có thay đổi chưa publish không?
  const hasUnsaved = Boolean(localStorage.getItem(LOCAL_KEY));

  return (
    <AdminContext.Provider value={{
      isLoggedIn, login, logout, changePassword,
      siteData, loading: false, // always instant now
      saving, saveMsg, hasUnsaved,
      publishToGitHub,
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
