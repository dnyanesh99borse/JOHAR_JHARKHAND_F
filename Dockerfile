# # =========================
# # Stage 1: Frontend
# # =========================
# FROM node:18-alpine AS frontend-build
# WORKDIR /app/frontend

# # Copy package files first for cached install
# COPY frontend/package*.json ./

# # Install dependencies
# RUN npm ci --silent

# # Copy frontend source
# COPY frontend/ ./

# # -------------------------
# # Development mode: skip build
# # -------------------------
# # Your project runs with `npm run dev`, so no build step
# # If you later add a production build:
# # RUN npm run build

# # Expose dev server port (Vite default)
# EXPOSE 5173

# # =========================
# # Stage 2: Backend
# # =========================
# FROM python:3.11-slim
# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1

# WORKDIR /app/backend

# # Install OS deps needed for some Python packages
# RUN apt-get update && \
#     apt-get install -y --no-install-recommends build-essential curl && \
#     rm -rf /var/lib/apt/lists/*

# # Copy backend code
# COPY backend/ ./

# # Copy and install Python requirements
# COPY backend/requirements.txt ./requirements.txt
# RUN pip install --upgrade pip
# RUN pip install -r requirements.txt

# # -------------------------
# # Optional: copy frontend build
# # Only needed if you later use a production build
# # COPY --from=frontend-build /app/frontend/dist ./static
# # -------------------------

# # Expose backend port
# EXPOSE 8000

# # Run backend with Gunicorn + Uvicorn
# CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "main:app", "--bind", "0.0.0.0:8000", "--workers", "2"]




# =========================
# Stage 1: Frontend
# =========================
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend

# Copy package files first (for caching)
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci --silent

# Copy frontend source code
COPY frontend/ ./

# Expose Vite dev server port
EXPOSE 5173

# =========================
# Stage 2: Backend
# =========================
FROM python:3.11-slim
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app/backend

# Install OS dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends build-essential curl && \
    rm -rf /var/lib/apt/lists/*

# Copy backend code and requirements
COPY backend/ ./
COPY backend/requirements.txt ./requirements.txt

# Upgrade pip and install Python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expose backend port
EXPOSE 8000

# Run backend
CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "main:app", "--bind", "0.0.0.0:8000", "--workers", "2"]
