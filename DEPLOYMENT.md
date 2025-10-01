# ArchLens - Deployment Guide

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your system
- [Node.js](https://nodejs.org/) and npm (for local development)

## Quick Start with Docker

### 1. Clone and Navigate to Project
```bash
git clone <your-repo-url>
cd archlens
```

### 2. Build Docker Image
```bash
docker build -t archlens .
```

### 3. Run the Container
```bash
docker run -p 80:80 archlens
```

The application will be available at [http://localhost](http://localhost)

## Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The app will be available at [http://localhost:5173](http://localhost:5173)

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

## Docker Commands Reference

### Build the image
```bash
docker build -t archlens .
```

### Run container (port 80)
```bash
docker run -p 80:80 archlens
```

### Run container in background
```bash
docker run -d -p 80:80 --name archlens-app archlens
```

### Stop container
```bash
docker stop archlens-app
```

### Remove container
```bash
docker rm archlens-app
```

### Remove image
```bash
docker rmi archlens
```

## Health Check

The Nginx server includes a health endpoint:
```bash
curl http://localhost/health
```

## Project Structure

```
archlens/
├── src/
│   ├── App.jsx           # Main React component
│   ├── main.jsx          # React entry point
│   ├── index.css         # Global styles
│   ├── data.js           # Data management
│   └── components/
│       └── CursorSpotlight.jsx
├── Dockerfile            # Docker configuration
├── nginx.conf           # Nginx server configuration
├── package.json         # Node.js dependencies
├── vite.config.js       # Vite build configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── index.html           # HTML template
```

## Features

- **Gzip Compression**: Enabled for better performance
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
- **Static Asset Caching**: 1-year cache for JS, CSS, images
- **SPA Support**: All routes fallback to index.html
- **Health Monitoring**: `/health` endpoint for monitoring

## Troubleshooting

### Docker build fails with npm ci error
If you encounter `npm ci` errors, ensure `package-lock.json` exists:
```bash
npm install  # This generates package-lock.json
docker build -t archlens .
```

### Port already in use
If port 80 is busy, use a different port:
```bash
docker run -p 8080:80 archlens
```
Then access at [http://localhost:8080](http://localhost:8080)

## Production Deployment

For production environments:

1. **Build optimized Docker image**
2. **Use environment variables for configuration**
3. **Set up proper logging and monitoring**
4. **Configure reverse proxy if needed**
5. **Set up SSL/TLS certificates**

## Dependencies

### Runtime Dependencies
- React 18.3.1
- React DOM 18.3.1
- Lucide React 0.263.1

### Development Dependencies
- Vite 5.3.1
- Tailwind CSS 3.4.4
- PostCSS 8.4.38
- Autoprefixer 10.4.19

## Version

Current version: 0.3.0