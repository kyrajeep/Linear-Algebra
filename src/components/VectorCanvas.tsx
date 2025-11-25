import React, { useRef, useEffect, useState } from 'react';

interface VectorCanvasProps {
  vector: [number, number];
  onVectorChange: (v: [number, number]) => void;
  showComponents: boolean;
}

const VectorCanvas: React.FC<VectorCanvasProps> = ({ vector, onVectorChange, showComponents }: VectorCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);

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

    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = -10; i <= 10; i++) {
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(ORIGIN_X + i * SCALE_FACTOR, 0);
      ctx.lineTo(ORIGIN_X + i * SCALE_FACTOR, CANVAS_HEIGHT);
      ctx.stroke();

      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(0, ORIGIN_Y + i * SCALE_FACTOR);
      ctx.lineTo(CANVAS_WIDTH, ORIGIN_Y + i * SCALE_FACTOR);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, ORIGIN_Y);
    ctx.lineTo(CANVAS_WIDTH, ORIGIN_Y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(ORIGIN_X, 0);
    ctx.lineTo(ORIGIN_X, CANVAS_HEIGHT);
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = '#666';
    ctx.font = '12px sans-serif';
    ctx.fillText('x', CANVAS_WIDTH - 20, ORIGIN_Y + 20);
    ctx.fillText('y', ORIGIN_X + 10, 20);

    // Draw vector
    const endX = ORIGIN_X + vector[0] * SCALE_FACTOR;
    const endY = ORIGIN_Y - vector[1] * SCALE_FACTOR; // flip y for standard coords

    // Vector arrow
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(ORIGIN_X, ORIGIN_Y);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Arrow head
    const arrowSize = 12;
    const angle = Math.atan2(endY - ORIGIN_Y, endX - ORIGIN_X);
    ctx.fillStyle = '#667eea';
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - arrowSize * Math.cos(angle - Math.PI / 6), endY - arrowSize * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(endX - arrowSize * Math.cos(angle + Math.PI / 6), endY - arrowSize * Math.sin(angle + Math.PI / 6));
    ctx.fill();

    // Draw endpoint circle
    ctx.fillStyle = '#667eea';
    ctx.beginPath();
    ctx.arc(endX, endY, 6, 0, 2 * Math.PI);
    ctx.fill();

    // Draw component lines if enabled
    if (showComponents) {
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);

      // x-component line
      ctx.beginPath();
      ctx.moveTo(ORIGIN_X, ORIGIN_Y);
      ctx.lineTo(endX, ORIGIN_Y);
      ctx.stroke();

      // y-component line
      ctx.beginPath();
      ctx.moveTo(endX, ORIGIN_Y);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      ctx.setLineDash([]);

      // Labels
      ctx.fillStyle = '#d32f2f';
      ctx.font = 'bold 12px sans-serif';
      if (vector[0] !== 0) ctx.fillText(`x=${vector[0].toFixed(1)}`, ORIGIN_X + vector[0] * SCALE_FACTOR / 2, ORIGIN_Y + 15);
      if (vector[1] !== 0) ctx.fillText(`y=${vector[1].toFixed(1)}`, endX + 10, ORIGIN_Y - vector[1] * SCALE_FACTOR / 2);
    }
  }, [vector, showComponents]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const relX = (x - ORIGIN_X) / SCALE_FACTOR;
    const relY = (ORIGIN_Y - y) / SCALE_FACTOR; // flip y

    onVectorChange([Math.round(relX * 10) / 10, Math.round(relY * 10) / 10]);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ border: '2px solid #667eea', borderRadius: '8px', cursor: 'crosshair' }}
    />
  );
};

export default VectorCanvas;
