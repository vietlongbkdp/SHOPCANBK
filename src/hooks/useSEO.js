import { useEffect } from 'react';

/**
 * Dynamically updates page SEO meta tags
 * @param {Object} seo - SEO config object
 */
export default function useSEO({ title, description, ogTitle, ogDescription, ogImage, ogUrl, canonical, type = 'website' }) {
  useEffect(() => {
    // Title
    if (title) {
      document.title = title;
    }

    const setMeta = (selector, value) => {
      if (!value) return;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const attr = selector.includes('[name=') ? 'name' : 'property';
        const val = selector.match(/["']([^"']+)["']/)?.[1];
        if (attr && val) el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    const setLink = (rel, href) => {
      if (!href) return;
      let el = document.querySelector('link[rel="' + rel + '"]');
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Meta description
    setMeta('meta[name="description"]', description);

    // Open Graph
    setMeta('meta[property="og:title"]', ogTitle || title);
    setMeta('meta[property="og:description"]', ogDescription || description);
    setMeta('meta[property="og:image"]', ogImage);
    setMeta('meta[property="og:url"]', ogUrl || canonical);
    setMeta('meta[property="og:type"]', type);

    // Twitter Card
    setMeta('meta[name="twitter:title"]', ogTitle || title);
    setMeta('meta[name="twitter:description"]', ogDescription || description);
    setMeta('meta[name="twitter:image"]', ogImage);

    // Canonical
    setLink('canonical', canonical);

    // Cleanup: restore defaults when component unmounts
    return () => {
      document.title = 'Cân Điện Tử Bách Khoa – Sửa Chữa & Mua Bán Cân Tại Huế & Đà Nẵng';
      setMeta('meta[name="description"]', 'Cân Điện Tử Bách Khoa – Chuyên sửa chữa, bảo trì tận nơi, kiểm định và mua bán cân điện tử tại Huế và Đà Nẵng. Cân bàn, cân ghế, cân tiểu ly, cân sàn, cân tính tiền chính hãng. Gọi ngay: 0913 331 916.');
      setMeta('meta[property="og:type"]', 'website');
      setLink('canonical', 'https://candientubk.com/');
    };
  }, [title, description, ogTitle, ogDescription, ogImage, ogUrl, canonical, type]);
}
