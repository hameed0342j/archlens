# ArchLens 🔍

**Demystifying Your Arch Linux System**

ArchLens is a React-based web application that provides an intuitive interface for exploring and understanding Arch Linux packages, system information, and package management.

![Version](https://img.shields.io/badge/version-0.3.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- **Package Explorer**: Browse and search Arch Linux packages
- **System Diagnostics**: Get insights into your system's package state  
- **Interactive UI**: Modern, responsive interface with Tailwind CSS
- **Docker Ready**: Containerized deployment with Nginx
- **Performance Optimized**: Gzip compression, caching, and optimized assets

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Build and run with Docker:**
```bash
# Clone the repository
git clone <your-repo-url>
cd archlens

# Build the Docker image
docker build -t archlens .

# Run the container
docker run -p 80:80 archlens
```

Visit [http://localhost](http://localhost) to access the application.

### Local Development

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

4. **Preview production build:**
```bash
npm run preview
```

## 🛠️ Technology Stack

- **Frontend**: React 18.3.1, Vite 5.3.1
- **Styling**: Tailwind CSS 3.4.4
- **Icons**: Lucide React 0.263.1
- **Build Tool**: Vite with hot reload
- **Server**: Nginx (in Docker)
- **Container**: Docker multi-stage build

## 📁 Project Structure

```
archlens/
├── src/
│   ├── App.jsx                 # Main application component
│   ├── main.jsx               # React entry point
│   ├── index.css              # Global styles & Tailwind imports
│   ├── data.js                # Application data and logic
│   └── components/
│       └── CursorSpotlight.jsx # Interactive cursor effects
├── public/                    # Static assets
├── Dockerfile                 # Docker configuration
├── nginx.conf                # Nginx server configuration
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.js            # Vite build configuration
└── postcss.config.js         # PostCSS configuration
```

## 🐳 Docker Commands

### Basic Operations
```bash
# Build image
docker build -t archlens .

# Run container (port 80)
docker run -p 80:80 archlens

# Run in background
docker run -d -p 80:80 --name archlens-app archlens

# Stop container
docker stop archlens-app

# Remove container
docker rm archlens-app

# View logs
docker logs archlens-app
```

### Development with different port
```bash
# Run on port 8080 if 80 is busy
docker run -p 8080:80 archlens
```

## 🔧 Configuration

### Nginx Configuration
The application uses a custom Nginx configuration (`nginx.conf`) that includes:
- Gzip compression for better performance
- Security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
- Static asset caching (1 year cache for JS, CSS, images)
- SPA support (all routes fallback to index.html)
- Health check endpoint at `/health`

### Tailwind CSS
Custom Tailwind configuration includes:
- Custom animations
- Extended color palette
- Responsive design utilities

## 🔍 Health Monitoring

The application includes a health check endpoint:
```bash
curl http://localhost/health
# Response: healthy
```

## 🚨 Troubleshooting

### Docker build fails
```bash
# If npm ci fails, generate package-lock.json first
npm install
docker build -t archlens .
```

### Port already in use
```bash
# Use a different port
docker run -p 8080:80 archlens
```

### Build errors
```bash
# Check for syntax errors in JSX files
npm run build
```

## 📊 Performance Features

- **Optimized Bundle Size**: Tree-shaking and code splitting
- **Compressed Assets**: Gzip compression via Nginx
- **Cached Resources**: Long-term caching for static assets
- **Fast Builds**: Multi-stage Docker builds with layer caching

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Theme**: Modern dark interface optimized for developers
- **Interactive Elements**: Hover effects and smooth transitions
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🔄 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🐛 Development

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Docker (for containerized deployment)

### Environment Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build and test
npm run build
npm run preview
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on the GitHub repository.

---

**Built with ❤️ for the Arch Linux community**
