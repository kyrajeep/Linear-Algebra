# Docker Quick Reference for Linear Algebra App

## TL;DR — Just Run This

```bash
cd /Users/kyra/Github/Linear-Algebra
docker-compose up
```

App opens at `http://localhost:3000` with hot-reload. Done! ✨

---

## Common Commands

| Task | Command |
|------|---------|
| **Start dev server** | `docker-compose up` |
| **Stop** | `Ctrl+C` |
| **Run tests** | `docker-compose run app npm test` |
| **Build for production** | `docker-compose run app npm run build` |
| **Install new package** | `docker exec -it linear-algebra-app npm install <pkg>` |
| **Access container shell** | `docker-compose exec app sh` |
| **View logs** | `docker-compose logs -f` |
| **Clean rebuild** | `docker-compose down -v && docker-compose up --build` |

---

## How It Maps to What You Know (Python)

```
Python Workflow                  Node.js + Docker Workflow
─────────────────────            ─────────────────────────

python -m venv venv              → docker build (reads Dockerfile)
source venv/bin/activate         → docker-compose up
pip install -r requirements.txt  → npm install (runs in Dockerfile)
python my_script.py              → npm run dev
pip install new_package          → npm install new_package
pytest                           → npm test
deactivate                       → docker-compose down
```

---

## File Reference

**`Dockerfile`** — Recipe to build the container image
- Starts with `node:24-alpine` base
- Installs npm packages
- Exposes port 3000

**`docker-compose.yml`** — Orchestration config
- Defines container name, ports, volumes
- Mounts local code for hot-reload
- Sets working directory and command

**`.dockerignore`** — Files to exclude from image (like `.gitignore`)
- Keeps image smaller and faster

---

## Behind the Scenes

When you run `docker-compose up`:

1. **Reads `docker-compose.yml`**
2. **Builds image** (if not exists):
   - Downloads `node:24-alpine` (~170 MB)
   - Runs `npm install` to get dependencies
   - Installs TypeScript, React, Vite, etc. automatically
3. **Starts container** with:
   - Port mapping: 3000 (container) → 3000 (your Mac)
   - Volume mount: your code synced live
   - Command: `npm run dev` (Vite dev server)
4. **Hot reload enabled**: Changes save → container rebuilds automatically

---

## TypeScript is Automatic

Listed in `package.json`:
```json
{
  "devDependencies": {
    "typescript": "^5.3.0"
  }
}
```

When `npm install` runs (inside container), TypeScript gets installed. No extra steps needed!

---

## Troubleshooting

**"Port 3000 already in use?"**
```bash
# Edit docker-compose.yml, change first port:
ports:
  - "3001:3000"  # Access at localhost:3001
```

**"Changes not showing?"**
```bash
docker-compose down
docker-compose up
```

**"Want a clean slate?"**
```bash
docker-compose down -v  # Remove volumes
docker-compose up --build  # Fresh install
```

**"Need to run a command inside the container?"**
```bash
docker-compose exec app sh
npm test
npm run build
exit
```

---

## Comparison to Local npm

| Method | Pros | Cons |
|--------|------|------|
| **Docker** (recommended) | Isolated, reproducible, no Node.js on Mac | One extra layer |
| **Local npm** | Direct, no Docker overhead | Requires Node.js installed locally |

For this project: **Use Docker** — keeps your Mac clean and matches production.

---

## Next Steps

1. Run: `docker-compose up`
2. Open: `http://localhost:3000`
3. Edit code in VS Code (on your Mac)
4. See changes hot-reload in the browser instantly
5. Run `npm test` when you implement math functions

Happy coding! 🎉
