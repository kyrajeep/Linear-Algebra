# 🚀 Quick Start: Run Your App in 1 Command

## You Have Docker, So Just Do This:

```bash
cd /Users/kyra/Github/Linear-Algebra
docker-compose up
```

That's it. Your app opens at `http://localhost:3000` with live hot-reload. ✨

---

## What Happens

| Time | What |
|------|------|
| 1st run | Builds image (~30-60s) + installs npm deps (~1-2m) |
| After | Starts instantly (seconds) |

---

## What You Get

- ✅ Interactive Vector lesson (drag to modify vectors)
- ✅ Interactive Matrix lesson (sliders for rotation/scale)
- ✅ Beautiful UI with responsive design
- ✅ Hot-reload: edit code → browser updates instantly
- ✅ TypeScript, React, Vite all working

---

## Common Commands (Copy-Paste)

```bash
# Start dev server
docker-compose up

# Run tests
docker-compose run app npm test

# Build for production
docker-compose run app npm run build

# Install a package
docker exec -it linear-algebra-app npm install <package-name>

# Access container shell
docker-compose exec app sh

# Stop and clean rebuild
docker-compose down -v
docker-compose up --build
```

---

## Documentation

- `DOCKER-QUICKSTART.md` — Detailed walkthrough
- `DOCKER-CHEATSHEET.md` — Command reference
- `DOCKER.md` — Comprehensive guide
- `README.md` — Project overview

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Port 3000 in use | Change to 3001 in `docker-compose.yml` |
| Changes not showing | Ctrl+C then `docker-compose up` |
| Docker won't start | Ensure Docker Desktop is open |

---

## Done!

Open `http://localhost:3000` and start exploring! 🎉
