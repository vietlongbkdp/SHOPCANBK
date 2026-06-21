import { useEffect } from 'react';

/**
 * Dynamically injects JSON-LD structured data into <head>
 */
export default function useSchemaOrg(schema) {
  useEffect(() => {
    if (!schema) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'dynamic-schema-org';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('dynamic-schema-org');
      if (el) el.remove();
    };
  }, [JSON.stringify(schema)]);
}
