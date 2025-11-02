import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

export function SEOHead({
  title = 'LUXE - Premium Fashion & Lifestyle',
  description = 'Your destination for premium fashion and lifestyle products. Quality, style, and elegance in every piece.',
  keywords = 'fashion, luxury, ecommerce, clothing, accessories, lifestyle, premium, shopping',
  ogImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=630&fit=crop',
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.name = name;
        document.head.appendChild(element);
      }
      element.content = content;
    };

    const updateOGTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'LUXE');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('theme-color', '#2563EB');

    // Open Graph tags
    updateOGTag('og:title', title);
    updateOGTag('og:description', description);
    updateOGTag('og:image', ogImage);
    updateOGTag('og:type', 'website');
    updateOGTag('og:site_name', 'LUXE');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
  }, [title, description, keywords, ogImage]);

  return null;
}
