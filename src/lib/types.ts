/**
 * Type definitions for linear algebra library.
 */

/**
 * Matrix type: 2D array where each sub-array is a row.
 * All rows must have equal length.
 */
export type Matrix = number[][];

/**
 * Vector type: 1D numeric array.
 */
export type Vector = number[];

/**
 * Validation error interface.
 */
export interface ValidationError {
  valid: false;
  error: string;
}

/**
 * Check if input is a well-formed Matrix.
 * Returns true if m is non-empty 2D array with all rows of equal length and numeric entries.
 * @param m - input to validate
 * @returns true if valid Matrix, false otherwise
 */
export function isMatrix(m: unknown): m is Matrix {
  if (!Array.isArray(m) || m.length === 0) return false;
  const firstRowLen = (m[0] as unknown[])?.length;
  if (typeof firstRowLen !== 'number' || firstRowLen <= 0) return false;

  for (const row of m) {
    if (!Array.isArray(row) || row.length !== firstRowLen) return false;
    for (const entry of row) {
      if (typeof entry !== 'number' || !isFinite(entry)) return false;
    }
  }
  return true;
}

/**
 * Check if input is a well-formed Vector.
 * @param v - input to validate
 * @returns true if valid Vector (non-empty 1D numeric array), false otherwise
 */
export function isVector(v: unknown): v is Vector {
  if (!Array.isArray(v) || v.length === 0) return false;
  for (const entry of v) {
    if (typeof entry !== 'number' || !isFinite(entry)) return false;
  }
  return true;
}

/**
 * Get matrix dimensions [rows, cols].
 * Assumes m is a valid Matrix.
 * @param m - matrix
 * @returns [rows, cols]
 */
export function shape(m: Matrix): [rows: number, cols: number] {
  return [m.length, m[0]?.length ?? 0];
}
