import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'vi'],
 
  // Used when no locale matches
  defaultLocale: 'vi',
  
  // Custom domains or pathnames can be configured here if needed
  pathnames: {
    '/': '/',
    '/products': {
      en: '/products',
      vi: '/san-pham'
    },
    '/products/[id]': {
      en: '/products/[id]',
      vi: '/san-pham/[id]'
    },
    '/news': {
      en: '/news',
      vi: '/tin-thi-truong'
    },
    '/news/[id]': {
      en: '/news/[id]',
      vi: '/tin-thi-truong/[id]'
    },
    '/contact': {
      en: '/contact',
      vi: '/lien-he'
    }
  }
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
