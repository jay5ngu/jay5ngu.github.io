# Production Deployment Best Practices
The Vite proxy configuration only works during local development (npm run dev). For production deployments (npm run build), you have two standard architectures:
- Separate Domains (CORS Needed): If your frontend is hosted on Netlify/Vercel and your backend is on AWS/Heroku, your API requests will hit https://yourdomain.com directly. Ensure your backend has CORS enabled for your frontend domain.
- Single Domain (Reverse Proxy): If you serve your built Vite static files from the same server as your backend (or use a reverse proxy like Nginx or Cloudflare Workers), map all /api requests to your backend process backend-side. This keeps everything on the same domain and eliminates CORS problems entirely

# FastAPI Backend
Ensure your Python endpoints return JSON and handle CORS for production.