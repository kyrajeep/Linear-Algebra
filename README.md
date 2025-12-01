# Linear Algebra Educational App

A TypeScript learning app for ages 14–18 with interactive visualizations and guided lessons on vectors, matrices, determinants, and eigenvalues.

## Project Structure

```
linear-algebra/
├── src/                       # TypeScript source
│   └── lib/
│       ├── types.ts          # Matrix and Vector types
│       ├── matrix.ts         # Core linear algebra functions
│       └── __tests__/
│           └── matrix.test.ts # Unit tests
├── python/                     # Educational Python demos
│   ├── eigenvals_simple_matrix.py
│   └── plot_sine.py
├── package.json              # npm dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vitest.config.ts          # Test runner configuration
└── README.md                 # This file
```

## TypeScript App: Setup & Development

### Quick Start (Docker)

If you have Docker installed, this is the easiest way:

```bash
cd /Users/kyra/Github/Linear-Algebra
docker-compose up
```

This automatically:
- Downloads Node.js 24 Alpine image
- Installs all dependencies (npm, React, TypeScript, etc.)
- Starts dev server at `http://localhost:3000`
- Enables hot-reload (changes appear instantly)

See `DOCKER.md` and `DOCKER-CHEATSHEET.md` for more Docker commands.

### Local Setup (Without Docker)

If you prefer local npm:

```bash
npm install
npm run dev
```

Requires Node.js ≥16 installed locally.

### Run Tests

```bash
# Watch mode
docker-compose run app npm test

# Run once
docker-compose run app npm run test:run

# Interactive UI
docker-compose run app npm run test:ui
```

Or locally:
```bash
npm test
```

### Project Overview

**Goal:** Build a browser-first linear algebra learning tool with interactive visualizations and scaffolded lessons (ages 14–18).

**Tech Stack:**
- **Language:** TypeScript
- **Testing:** Vitest + Node
- **Frontend:** (To be added) React + Vite + D3 or Svelte for visualizations
- **Math:** Custom `src/lib/matrix.ts` utilities (pure functions, non-mutating)

**Current Status:**
- ✅ Project scaffold (TypeScript, Vitest, ESLint config)
- ✅ Type definitions (`types.ts`)
- ✅ Matrix API skeleton with JSDoc (`matrix.ts`)
- ✅ Test stubs (all planned tests outlined)
- ⏳ Implement matrix operations (determinant, inverse, eigenvalues, etc.)
- ⏳ Add React components (VectorPlayground, MatrixVisualizer, QuizEngine)
- ⏳ Add visualization layer (D3, SVG, or canvas)
- ⏳ Add lesson content and interactive demos

### Matrix Library API

**Core functions in `src/lib/matrix.ts`:**

#### Basic Operations
- `clone(m)` — deep copy
- `add(a, b)` — element-wise addition
- `subtract(a, b)` — element-wise subtraction
- `scale(m, scalar)` — multiply by scalar
- `transpose(m)` — matrix transpose
- `multiply(a, b)` — standard matrix multiplication
- `applyToVector(m, v)` — apply transformation M to vector v

#### Square Matrix Operations
- `trace(m)` — sum of diagonal elements
- `determinant(m)` — closed forms for 2×2/3×3, LU for general n×n
- `inverse(m)` — matrix inverse using LU decomposition
- `solve(a, b)` — solve Ax = b via LU

#### Norms & Utilities
- `normInf(v)` — infinity norm
- `normFrobenius(m)` — Frobenius norm

#### Eigenvalues (optional/advanced)
- `powerMethod(a)` — dominant eigenvalue/vector
- `qrEigen(a)` — full spectrum (QR algorithm)
- `eigenvalues(a)` — wrapper using best method for matrix size

### Type System

**Basic types:**

```typescript
type Matrix = number[][];  // 2D array (rows)
type Vector = number[];    // 1D array
```

**What are types?** Types (or "type annotations") are a way to tell TypeScript what kind of data a function expects and what it returns. For example:
- `function add(a: Matrix, b: Matrix): Matrix` means: "this function takes two Matrices and returns a Matrix."
- If you pass a Vector or string by mistake, TypeScript will catch the error before you run the code.
- Types help prevent bugs and make code clearer to read.

**Validators:**
- `isMatrix(m)` — check if input is a valid Matrix
- `isVector(v)` — check if input is a valid Vector

### Error Handling

Functions throw descriptive errors for common issues:
- `"InvalidMatrix"` — input has NaN, Infinity, or wrong structure
- `"DimensionMismatch"` — incompatible matrix/vector shapes
- `"NotSquare"` — operation requires a square matrix
- `"SingularMatrix"` — matrix is not invertible (determinant ≈ 0)

### Next Steps

1. **Implement core matrix operations** (`clone`, `add`, `multiply`, `determinant`, etc.)
   - See `src/lib/__tests__/matrix.test.ts` for expected behavior
2. **Add React & Vite**
   - Set up `vite.config.ts` and `src/App.tsx`
3. **Build visualization components** (VectorPlayground, MatrixVisualizer, etc.)
4. **Create lesson content** with interactive examples
5. **(Optional) Add backend** for user progress and analytics

### Testing Matrix Functions

Example test structure (run via `npm test`):

```typescript
import { describe, it, expect } from 'vitest';
import * as m from '../matrix';

describe('Matrix Library', () => {
  it('clone: matrix is independent after clone', () => {
    const A = [[1, 2], [3, 4]];
    const B = m.clone(A);
    B[0][0] = 999; // modify clone
    expect(A[0][0]).toBe(1); // original unchanged
  });

  it('multiply: identity × A = A', () => {
    const I = m.identity(2);
    const A = [[1, 2], [3, 4]];
    const result = m.multiply(I, A);
    expect(result).toEqual(A);
  });
});
```

### Python Demos (Reference)

Educational examples in `python/`:
- `eigenvals_simple_matrix.py` — Compute eigenvalues of 3×3 matrices using NumPy
- `plot_sine.py` — Plot sine curve (trigonometry foundation for rotations/transformations)

These serve as algorithmic references for implementing the TypeScript library.

## Contributing

- Follow TypeScript strict mode (`noUnusedLocals`, `noUnusedParameters`, etc.)
- Add JSDoc comments for public functions
- Write tests for new functions (use `describe` + `it.todo` for planned tests)
- Keep functions pure (no mutation of inputs)

## License

See `LICENSE` file.
