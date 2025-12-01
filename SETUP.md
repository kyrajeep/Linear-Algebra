# Getting Started: Setting Up the Linear Algebra App

This guide walks you through installing dependencies and running the interactive lessons.

## Prerequisites

You need **Node.js** and **npm** installed on your system.

### Install Node.js & npm

**macOS:**
```bash
# Using Homebrew (recommended)
brew install node

# Or download from https://nodejs.org/ (LTS version recommended)
```

**Windows:**
```bash
# Using Chocolatey
choco install nodejs

# Or download from https://nodejs.org/ (LTS version)
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install nodejs npm
```

Verify installation:
```bash
node --version
npm --version
```

## Installation & Setup

### 1. Install Dependencies

Navigate to the project directory and install all required packages:

```bash
cd /path/to/Linear-Algebra
npm install
```

This installs:
- **React** — UI framework
- **React Router** — page navigation
- **Vite** — fast build tool and dev server
- **TypeScript** — type-safe JavaScript
- **Vitest** — testing framework

### 2. Run the Development Server

Start the app locally:

```bash
npm run dev
```

This will:
- Start a local development server (usually on `http://localhost:3000`)
- Open the app in your browser automatically
- Hot-reload on file changes (changes appear instantly)

## Using the App

### Home Screen
Navigate to `/` to see the lesson cards:
- **Vectors** — Learn about vectors, components, and magnitude
- **Matrices** — Discover matrix transformations

### Vector Lesson (`/lesson/vectors`)
- **Interactive Canvas:** Drag the blue arrow tip to change the vector
- **Components Display:** See x and y components update in real-time
- **Learn:** Understand vector magnitude (length) and operations

### Matrix Lesson (`/lesson/matrices`)
- **Transformation Demo:** Use sliders to rotate and scale the coordinate system
- **Basis Vectors:** Red arrow = transformed x-axis, Green arrow = transformed y-axis
- **Live Grid:** See how the entire space transforms

## Running Tests

Run unit tests for the math library:

```bash
npm test                # Watch mode
npm run test:run        # Run once
npm run test:ui         # Interactive UI
```

## Building for Production

Create an optimized production build:

```bash
npm run build
npm run preview        # Preview the production build locally
```

## Project Structure

```
Linear-Algebra/
├── src/
│   ├── App.tsx                 # Main app routing
│   ├── main.tsx                # Entry point
│   ├── lib/
│   │   ├── types.ts            # Matrix, Vector types
│   │   ├── matrix.ts           # Math functions (skeletons)
│   │   └── __tests__/
│   │       └── matrix.test.ts  # Unit tests
│   ├── pages/
│   │   ├── Home.tsx            # Welcome/lesson selection
│   │   ├── VectorLesson.tsx    # Vector learning page
│   │   └── MatrixLesson.tsx    # Matrix learning page
│   ├── components/
│   │   ├── VectorCanvas.tsx    # Interactive vector canvas
│   │   └── MatrixCanvas.tsx    # Interactive matrix/grid canvas
│   └── styles/
│       └── index.css           # Global styles
├── python/                     # Python demo files
│   ├── eigenvals_simple_matrix.py
│   └── plot_sine.py
├── index.html                  # HTML entry point
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite config
└── vitest.config.ts            # Test config
```

## Troubleshooting

### Port already in use
If port 3000 is busy:
```bash
npm run dev -- --port 3001
```

### Module not found errors
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors in editor
Make sure VS Code has TypeScript support. You may need to restart the TypeScript server:
- Command Palette → "TypeScript: Restart TS Server"

## Next Steps

1. **Implement Math Functions:** Complete `src/lib/matrix.ts` with actual implementations
2. **Add More Lessons:** Create lessons for determinants, eigenvalues, etc.
3. **Visualizations:** Enhance canvases with animations and more detailed feedback
4. **Quizzes:** Add interactive quizzes with instant feedback
5. **Backend (Optional):** Add server for user progress tracking and analytics

## Resources

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org)
- [Vite Docs](https://vitejs.dev)
- [React Router Docs](https://reactrouter.com)

---

**Need help?** Check the comments in the code files or ask for clarification!
