# Mandala Broadband

React + Vite website for Mandala Broadband in Surat. The frontend uses React Router, TypeScript, Tailwind CSS, Framer Motion and Lucide icons. Enquiries are sent using EmailJS directly from the browser. No Next.js runtime or dependency is used.

## Development

Use Node.js 22.12 or newer. Run `npm install`, then `npm run dev`.

- Website: http://localhost:3000
- `npm run typecheck` checks frontend and server TypeScript.

Configure `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` and `VITE_EMAILJS_PUBLIC_KEY` in `.env.local`. See [EmailJS setup](docs/emailjs-setup.md) for the exact template settings. Restart Vite after changing environment variables. Old SMTP settings are no longer used. Success means EmailJS accepted the request, not guaranteed inbox delivery.

All `VITE_` variables are public frontend configuration. EmailJS's public key is intended for browser use. Never add passwords or private API keys. `VITE_SITE_URL` sets your domain and optional `VITE_ANALYTICS_ID` enables Plausible. Analytics is disabled by default.

## Production

Set `VITE_SITE_URL` and the three EmailJS settings before running `npm run build`. This produces `dist/` with HTML for all ten public routes, route-specific metadata, a sitemap, robots.txt, assets and a 404 page. The build also checks TypeScript. `npm start` optionally serves the static website on port 3000. Set `PORT` and `HOST` for your host as needed. HTTPS should be provided by your hosting platform or reverse proxy.

For static hosting, upload `dist/`; no separate enquiry backend is needed. Direct visits to public routes need to serve their generated `index.html` files. Unknown paths should serve `404.html` with a 404 response.

### Vercel

`vercel.json` explicitly selects Vite, `npm ci`, `npm run build`, and the `dist` output directory. This overrides old Next.js framework/build/output settings after migration. Use the repository root as the project's Root Directory and Node.js 22.x. No Next.js runtime or Node server is required on Vercel. Set the public EmailJS variables and `VITE_SITE_URL` in Vercel before rebuilding; `.env.local` is intentionally not deployed.

## Structure

- `src/pages/`: all page components
- `src/App.tsx`, `src/routes.tsx`: shared layout and React Router routes
- `src/styles.css`: theme, animations and global styles
- `components/`, `data/`, `lib/`: reusable UI and business content
- `lib/enquiry.ts`: EmailJS submission and error handling
- `server/`: optional production static server
- `scripts/prerender.mjs`: static HTML and search metadata generation
- `public/`: logo, router photos, video and other assets

## Content before launch

Confirm the production domain, plan prices, taxes, equipment costs and coverage. Have the business approve customer and success-rate claims, privacy text and terms. The 1000 Mbps plan remains an enquiry-only offering. UPI payment collection has not been implemented.

The hero and router images are generated concept visuals. The muted background video is derived from [Nicola Narracci’s Pexels network clip](https://www.pexels.com/video/futuristic-glowing-blue-network-grid-visualization-34162507/). Reduced motion/data preferences disable video, and video pauses off-screen.
