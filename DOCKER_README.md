# Docker Deployment Guide for BIC NextJS

This guide explains how to build and deploy the BIC NextJS application using Docker.

## Prerequisites

- Docker Engine 20.10 or higher
- Docker Compose 2.0 or higher
- At least 2GB of available RAM
- 10GB of free disk space

## Quick Start

### Local Development vs Coolify Deployment

- **For Coolify**: Use `docker-compose.yml` (no port binding, handled by Coolify proxy)
- **For Local**: Use `docker-compose.local.yml` (includes port binding)

### Development Mode

Run the application in development mode with hot reload:

```bash
# Start development container
docker-compose -f docker-compose.dev.yml up

# Or run in background
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop the container
docker-compose -f docker-compose.dev.yml down
```

Access the application at: http://localhost:3000

### Production Mode (Local)

Build and run the optimized production container locally:

```bash
# Build the production image
docker-compose -f docker-compose.local.yml build

# Start the production container
docker-compose -f docker-compose.local.yml up -d

# View logs
docker-compose -f docker-compose.local.yml logs -f

# Stop the container
docker-compose -f docker-compose.local.yml down
```

### Production with Nginx (Recommended)

For production deployments with Nginx reverse proxy:

```bash
# Start with Nginx profile
docker-compose --profile with-nginx up -d

# This will start both Next.js and Nginx containers
```

Access the application at: http://localhost (port 80)

## Docker Commands

### Building Images

```bash
# Build production image
docker build -t bic-nextjs:latest ./bic-nextjs

# Build development image
docker build -f ./bic-nextjs/Dockerfile.dev -t bic-nextjs:dev ./bic-nextjs

# Build with specific build arguments
docker build --build-arg NODE_ENV=production -t bic-nextjs:prod ./bic-nextjs
```

### Running Containers

```bash
# Run production container
docker run -p 3000:3000 --env-file .env.production bic-nextjs:latest

# Run development container with volume mounting
docker run -p 3000:3000 -v $(pwd)/bic-nextjs:/app bic-nextjs:dev

# Run with resource limits
docker run -p 3000:3000 --memory="1g" --cpus="1" bic-nextjs:latest
```

### Container Management

```bash
# List running containers
docker ps

# View container logs
docker logs bic-nextjs-prod

# Access container shell
docker exec -it bic-nextjs-prod sh

# Stop container
docker stop bic-nextjs-prod

# Remove container
docker rm bic-nextjs-prod

# Clean up unused images
docker image prune -a
```

## Environment Variables

Create a `.env.production` file in the root directory with your production environment variables:

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.your-domain.com
DATABASE_URL=your-database-url
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret-key
```

## Health Checks

The application includes health check endpoints:

- **Application Health**: http://localhost:3000/api/health
- **Docker Health**: Automatically checked every 30 seconds

View health status:
```bash
docker inspect --format='{{json .State.Health}}' bic-nextjs-prod
```

## Multi-Stage Build

The production Dockerfile uses a multi-stage build process:

1. **deps**: Installs production dependencies
2. **builder**: Builds the Next.js application
3. **runner**: Creates the final minimal production image

This results in a smaller image size (~150MB vs ~1GB).

## Performance Optimization

### Image Size Optimization

- Multi-stage builds reduce final image size
- Alpine Linux base image for minimal footprint
- Only production dependencies in final image
- Next.js standalone output mode

### Caching Strategy

- Docker layer caching for faster rebuilds
- Nginx caching for static assets
- Next.js built-in caching mechanisms

### Resource Limits

The docker-compose file includes resource limits:
- CPU: 1 core (limit), 0.5 cores (reservation)
- Memory: 1GB (limit), 512MB (reservation)

Adjust these based on your server capacity.

## Deployment Strategies

### 1. Single Server Deployment

```bash
# Copy files to server
scp -r . user@server:/app

# SSH to server
ssh user@server

# Build and run
cd /app
docker-compose up -d
```

### 2. Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml bic-app

# Scale service
docker service scale bic-app_bic-nextjs=3
```

### 3. Kubernetes

Create a deployment from the Docker image:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: bic-nextjs
spec:
  replicas: 3
  selector:
    matchLabels:
      app: bic-nextjs
  template:
    metadata:
      labels:
        app: bic-nextjs
    spec:
      containers:
      - name: bic-nextjs
        image: bic-nextjs:latest
        ports:
        - containerPort: 3000
```

## Monitoring

### Logs

```bash
# Application logs
docker-compose logs -f bic-nextjs

# Nginx logs (if using)
docker-compose logs -f nginx

# Export logs
docker logs bic-nextjs-prod > app.log 2>&1
```

### Metrics

```bash
# Container stats
docker stats bic-nextjs-prod

# Resource usage
docker top bic-nextjs-prod
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Find process using port 3000
   lsof -i :3000
   # Or change port in docker-compose.yml
   ```

2. **Permission denied errors**
   ```bash
   # Fix permissions
   chmod -R 755 ./bic-nextjs
   ```

3. **Out of memory**
   ```bash
   # Increase memory limits in docker-compose.yml
   # Or add swap space on host
   ```

4. **Build failures**
   ```bash
   # Clear Docker cache
   docker builder prune -a
   # Rebuild without cache
   docker-compose build --no-cache
   ```

### Debug Mode

Run container with debug output:
```bash
docker run -it --rm -e DEBUG=* bic-nextjs:latest
```

## Security Best Practices

1. **Use specific versions**: Pin Node.js and dependency versions
2. **Run as non-root**: Application runs as `nextjs` user (UID 1001)
3. **Minimize attack surface**: Alpine Linux base, minimal dependencies
4. **Keep secrets secure**: Use Docker secrets or environment files
5. **Regular updates**: Update base images and dependencies regularly

## Backup and Recovery

### Backup

```bash
# Backup volumes
docker run --rm -v bic-nextjs_data:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz /data

# Export image
docker save bic-nextjs:latest > bic-nextjs-backup.tar
```

### Restore

```bash
# Restore volumes
docker run --rm -v bic-nextjs_data:/data -v $(pwd):/backup alpine tar xzf /backup/backup.tar.gz -C /

# Load image
docker load < bic-nextjs-backup.tar
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Docker Build and Push

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Build and push Docker image
        run: |
          docker build -t bic-nextjs:${{ github.sha }} ./bic-nextjs
          docker tag bic-nextjs:${{ github.sha }} bic-nextjs:latest
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Next.js Docker Deployment](https://nextjs.org/docs/deployment#docker-image)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Configuration](https://nginx.org/en/docs/)

## Support

For issues or questions about Docker deployment, please check:
1. Application logs: `docker-compose logs`
2. Container status: `docker ps -a`
3. System resources: `docker system df`