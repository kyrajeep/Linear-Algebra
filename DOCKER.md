# Running Linear Algebra App with Docker

Since you're familiar with Python virtualenvs, Docker is similar but containerized. Here's how to use it:

## Quick Analogy: Docker vs Virtualenv

| Aspect | virtualenv (Python) | Docker |
|--------|-------------------|--------|
| Isolates | Python version + packages | Entire OS + Node.js + packages |
| Configuration | `.venv/` folder + `pip freeze` | `Dockerfile` + `docker-compose.yml` |
| Portability | Works on your machine | Works anywhere (Mac, Linux, cloud) |
| Setup | `python -m venv venv` | `docker build` |
| Activation | `source venv/bin/activate` | `docker run` or `docker-compose up` |
| Package manager | `pip` | `npm` (inside container) |

## Setup (One-time)

### Option 1: Using docker-compose (Recommended for development)

**Prerequisites:**
- Docker Desktop installed on your Mac

**Steps:**

```bash
# Navigate to project
cd /Users/kyra/Github/Linear-Algebra

# Build the image and start the container
docker-compose up --build

# That's it! Container starts with npm dependencies installed
# App will be live at http://localhost:3000
```

**What happens:**
1. Reads `Dockerfile` and `docker-compose.yml`
2. Downloads `node:24-alpine` base image
3. Installs `node_modules` inside the container
4. Mounts your local code as a volume (so changes hot-reload)
5. Starts `npm run dev`

### Option 2: Manual Docker commands

```bash
# Build image
docker build -t linear-algebra-app .

# Run container with volume mount (live reload)
docker run -it --rm \
  -p 3000:3000 \
  -v /Users/kyra/Github/Linear-Algebra:/app \
  -v /app/node_modules \
  linear-algebra-app
```

## Daily Workflow

### Start the app
```bash
cd /Users/kyra/Github/Linear-Algebra
docker-compose up
```

Opens at `http://localhost:3000` with hot-reload enabled.

### Stop the app
```bash
# Ctrl+C in terminal, or in another terminal:
docker-compose down
```

### Run commands inside the container

**Without exiting docker-compose:**
```bash
# In a new terminal
docker exec -it linear-algebra-app npm test
docker exec -it linear-algebra-app npm run build
```

**Or run standalone:**
```bash
docker-compose run app npm test
docker-compose run app npm run build
```

### Install new packages

```bash
# Inside docker-compose
docker exec -it linear-algebra-app npm install <package-name>

# Standalone
docker-compose run app npm install <package-name>
```

This updates `package.json` and `package-lock.json` on your host machine too.

## File Structure

```
Linear-Algebra/
├── Dockerfile           ← Defines the container image
├── docker-compose.yml   ← Orchestration config (volumes, ports, etc.)
├── .dockerignore        ← What NOT to copy into container
├── package.json         ← npm dependencies (like requirements.txt)
├── package-lock.json    ← Locked versions (like Pipfile.lock)
└── src/                 ← Your code (mounted as volume)
```

## What Happens Inside the Container

When you run `docker-compose up`:

1. **Image Build Phase:**
   ```
   FROM node:24-alpine          ← Start with Node 24 on Alpine Linux
   RUN npm install              ← Install packages listed in package.json
   COPY . .                      ← Copy your code
   EXPOSE 3000                   ← Open port 3000
   CMD npm run dev              ← Start Vite dev server
   ```

2. **Container Runtime:**
   - Volume mounting: your local code syncs with `/app` inside container
   - Port mapping: container's 3000 → your Mac's localhost:3000
   - Hot-reload: file changes on your Mac trigger Vite rebuild inside container

## TypeScript Automatically Works

TypeScript is listed in `package.json` as a dev dependency:
```json
{
  "devDependencies": {
    "typescript": "^5.3.0",
    ...
  }
}
```

When you run `npm install` (inside the Docker container), TypeScript gets installed automatically. Vite and React also use it out of the box.

**You don't need to install TypeScript separately** — npm handles it all.

## Common Tasks

### View logs
```bash
docker-compose logs -f
```

### Rebuild from scratch (clean install)
```bash
# Stop container
docker-compose down -v

# Remove image
docker rmi linear-algebra-app

# Rebuild and start
docker-compose up --build
```

### Access container shell
```bash
docker-compose exec app sh
```

Then you can run commands directly:
```bash
# Inside container shell
npm test
npm run build
ls -la
```

### Run tests
```bash
docker-compose run app npm test
```

### Build for production
```bash
docker-compose run app npm run build
```

Output goes to `dist/` folder.

## Troubleshooting

### Port 3000 already in use
```bash
# Change port in docker-compose.yml
ports:
  - "3001:3000"  # Change first number to 3001
```

Then access app at `http://localhost:3001`

### Changes not showing up (hot-reload not working)
- Make sure volume mount is correct in `docker-compose.yml`
- Try restarting: `docker-compose down && docker-compose up`

### npm install fails
```bash
# Clean reinstall
docker-compose down -v
docker-compose up --build
```

### Want to use your host's npm instead?
You can, but not necessary! Docker keeps everything isolated.

If you really want: install Node.js locally, then:
```bash
npm install
npm run dev
```

But Docker approach is better for consistency across environments.

## Comparison: Your Workflows

### Python with virtualenv
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Node with npm + Docker
```bash
docker-compose up
```

(Much simpler thanks to docker-compose!)

---

**You're all set!** Just run `docker-compose up` and start developing! 🐳
