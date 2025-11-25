import React, { useRef, useEffect } from 'react';

interface MatrixCanvasProps {
  matrix: [[number, number], [number, number]];
}

const MatrixCanvas: React.FC<MatrixCanvasProps> = ({matrix}: MatrixCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const CANVAS_WIDTH = 600;
  const CANVAS_HEIGHT = 400;
  const ORIGIN_X = CANVAS_WIDTH / 2;
  const ORIGIN_Y = CANVAS_HEIGHT / 2;
  const SCALE_FACTOR = 40; // pixels per unit

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#f9f9f9';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw grid lines (transformed by matrix)
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;

    const col1: [number, number] = [matrix[0][0], matrix[1][0]]; // first column
    const col2: [number, number] = [matrix[0][1], matrix[1][1]]; // second column

    // Draw grid points using transformed basis
    for (let i = -5; i <= 5; i++) {
      for (let j = -5; j <= 5; j++) {
        const origX = i;
        const origY = j;

        // Transform by matrix
        const transX = matrix[0][0] * origX + matrix[0][1] * origY;
        const transY = matrix[1][0] * origX + matrix[1][1] * origY;

        const screenX = ORIGIN_X + transX * SCALE_FACTOR;
        const screenY = ORIGIN_Y - transY * SCALE_FACTOR;

        ctx.fillStyle = '#ddd';
        ctx.fillRect(screenX - 1, screenY - 1, 2, 2);
      }
    }

    // Draw transformed grid lines
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;

    // Vertical lines
    for (let i = -5; i <= 5; i++) {
      ctx.beginPath();
      let first = true;
      for (let j = -5; j <= 5; j++) {
        const transX = matrix[0][0] * i + matrix[0][1] * j;
        const transY = matrix[1][0] * i + matrix[1][1] * j;

        const screenX = ORIGIN_X + transX * SCALE_FACTOR;
        const screenY = ORIGIN_Y - transY * SCALE_FACTOR;

        if (first) {
          ctx.moveTo(screenX, screenY);
          first = false;
        } else {
          ctx.lineTo(screenX, screenY);
        }
      }
      ctx.stroke();
    }

    // Horizontal lines
    for (let j = -5; j <= 5; j++) {
      ctx.beginPath();
      let first = true;
      for (let i = -5; i <= 5; i++) {
        const transX = matrix[0][0] * i + matrix[0][1] * j;
        const transY = matrix[1][0] * i + matrix[1][1] * j;

        const screenX = ORIGIN_X + transX * SCALE_FACTOR;
        const screenY = ORIGIN_Y - transY * SCALE_FACTOR;

        if (first) {
          ctx.moveTo(screenX, screenY);
          first = false;
        } else {
          ctx.lineTo(screenX, screenY);
        }
      }
      ctx.stroke();
    }

    // Draw original axes (faint)
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(0, ORIGIN_Y);
    ctx.lineTo(CANVAS_WIDTH, ORIGIN_Y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(ORIGIN_X, 0);
    ctx.lineTo(ORIGIN_X, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw basis vectors (transformed)
    // Red: x-basis vector (1, 0)
    const xVec: [number, number] = [matrix[0][0], matrix[1][0]];
    const xScreenX = ORIGIN_X + xVec[0] * SCALE_FACTOR;
    const xScreenY = ORIGIN_Y - xVec[1] * SCALE_FACTOR;

    ctx.strokeStyle = '#d32f2f';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(ORIGIN_X, ORIGIN_Y);
    ctx.lineTo(xScreenX, xScreenY);
    ctx.stroke();

    // Red arrow head
    const xAngle = Math.atan2(xScreenY - ORIGIN_Y, xScreenX - ORIGIN_X);
    const arrowSize = 12;
    ctx.fillStyle = '#d32f2f';
    ctx.beginPath();
    ctx.moveTo(xScreenX, xScreenY);
    ctx.lineTo(xScreenX - arrowSize * Math.cos(xAngle - Math.PI / 6), xScreenY - arrowSize * Math.sin(xAngle - Math.PI / 6));
    ctx.lineTo(xScreenX - arrowSize * Math.cos(xAngle + Math.PI / 6), xScreenY - arrowSize * Math.sin(xAngle + Math.PI / 6));
    ctx.fill();

    // Green: y-basis vector (0, 1)
    const yVec: [number, number] = [matrix[0][1], matrix[1][1]];
    const yScreenX = ORIGIN_X + yVec[0] * SCALE_FACTOR;
    const yScreenY = ORIGIN_Y - yVec[1] * SCALE_FACTOR;

    ctx.strokeStyle = '#4caf50';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(ORIGIN_X, ORIGIN_Y);
    ctx.lineTo(yScreenX, yScreenY);
    ctx.stroke();

    // Green arrow head
    const yAngle = Math.atan2(yScreenY - ORIGIN_Y, yScreenX - ORIGIN_X);
    ctx.fillStyle = '#4caf50';
    ctx.beginPath();
    ctx.moveTo(yScreenX, yScreenY);
    ctx.lineTo(yScreenX - arrowSize * Math.cos(yAngle - Math.PI / 6), yScreenY - arrowSize * Math.sin(yAngle - Math.PI / 6));
    ctx.lineTo(yScreenX - arrowSize * Math.cos(yAngle + Math.PI / 6), yScreenY - arrowSize * Math.sin(yAngle + Math.PI / 6));
    ctx.fill();

    // Labels
    ctx.fillStyle = '#d32f2f';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('→ x', xScreenX + 10, xScreenY + 5);

    ctx.fillStyle = '#4caf50';
    ctx.fillText('↑ y', yScreenX + 5, yScreenY - 10);

    // Draw origin
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(ORIGIN_X, ORIGIN_Y, 4, 0, 2 * Math.PI);
    ctx.fill();
  }, [matrix]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      style={{ border: '2px solid #667eea', borderRadius: '8px' }}
    />
  );
};

export default MatrixCanvas;
