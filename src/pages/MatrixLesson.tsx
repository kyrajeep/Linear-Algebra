import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MatrixCanvas from '../components/MatrixCanvas';

function MatrixLesson() {
  const [matrix, setMatrix] = useState([
    [1, 0],
    [0, 1],
  ]); // identity
  const [scale, setScale] = useState(1);
  const [angle, setAngle] = useState(0);

  // Update matrix based on scale and angle (rotation + scaling)
  useEffect(() => {
    const cos = Math.cos((angle * Math.PI) / 180);
    const sin = Math.sin((angle * Math.PI) / 180);
    setMatrix([
      [scale * cos, -scale * sin],
      [scale * sin, scale * cos],
    ]);
  }, [scale, angle]);

  return (
    <div className="lesson-page">
      <Link to="/">
        <button clas        ➜  Local:   http://localhost:3000/sName="back-button">← Back to Home</button>
      </Link>

      <div className="lesson-header">
        <h1>⬜ Understanding Matrices</h1>
        <p>Learn how matrices transform vectors and space</p>
      </div>

      <div className="lesson-content">
        {/* Section 1: What is a Matrix? */}
        <div className="section">
          <h3>What is a Matrix?</h3>
          <p>
            A <strong>matrix</strong> is a rectangular grid of numbers. A 2×2 matrix looks like:
          </p>
          <div
            style={{
              background: '#f9f9f9',
              padding: '15px',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '1.1em',
              margin: '10px 0',
              textAlign: 'center',
            }}
          >
            | a &nbsp;&nbsp; b |<br />
            | c &nbsp;&nbsp; d |
          </div>
          <p>
            Matrices are incredibly powerful because they represent <strong>transformations</strong> — they can rotate,
            scale, shear, and flip vectors!
          </p>

          <div className="info-box">
            <strong>Key Idea:</strong> When you multiply a matrix by a vector, you transform that vector. The result is
            a new vector in the transformed space.
          </div>
        </div>

        {/* Interactive Matrix Canvas */}
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ color: '#667eea', marginBottom: '15px' }}>
            Interactive Transformation (Rotation + Scaling)
          </h3>
          <p style={{ color: '#666', marginBottom: '15px' }}>
            Use the controls below to rotate and scale the coordinate system. Watch how the grid and vectors
            transform!
          </p>

          <div className="controls">
            <div className="control-group">
              <label htmlFor="angle-slider">Rotation (degrees):</label>
              <input
                id="angle-slider"
                type="range"
                min="0"
                max="360"
                step="5"
                value={angle}
                onChange={(e) => setAngle(parseFloat(e.target.value))}
                style={{ width: '200px' }}
              />
              <span style={{ fontSize: '0.9em', color: '#999' }}>{angle}°</span>
            </div>

            <div className="control-group">
              <label htmlFor="scale-slider">Scale (size):</label>
              <input
                id="scale-slider"
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                style={{ width: '200px' }}
              />
              <span style={{ fontSize: '0.9em', color: '#999' }}>{scale.toFixed(1)}x</span>
            </div>
          </div>

          <MatrixCanvas matrix={matrix} />

          {/* Matrix Display */}
          <div style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
            <h4 style={{ color: '#667eea', marginBottom: '10px' }}>Current Matrix:</h4>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '1em',
                textAlign: 'center',
              }}
            >
              | {matrix[0][0].toFixed(2)}&nbsp;&nbsp;&nbsp;{matrix[0][1].toFixed(2)} |<br />
              | {matrix[1][0].toFixed(2)}&nbsp;&nbsp;&nbsp;{matrix[1][1].toFixed(2)} |
            </div>
          </div>
        </div>

        {/* Section 2: How Matrices Transform Space */}
        <div className="section" style={{ marginTop: '30px' }}>
          <h3>How Matrices Transform Space</h3>
          <p>
            A 2×2 matrix tells us where the basis vectors (the axes) end up after transformation:
          </p>
          <div className="info-box" style={{ marginTop: '15px' }}>
            <strong>The columns of a matrix are the new basis vectors!</strong>
            <br />
            The first column [a, c] shows where [1, 0] (right) ends up.
            <br />
            The second column [b, d] shows where [0, 1] (up) ends up.
          </div>

          <p style={{ marginTop: '15px' }}>
            Try this: Leave the scale at 1.0 and rotate to 90°. Notice how:
          </p>
          <ul style={{ marginLeft: '20px', color: '#555' }}>
            <li>The right-pointing vector (red) rotates upward</li>
            <li>The up-pointing vector (green) rotates leftward</li>
            <li>This is a 90° rotation matrix!</li>
          </ul>
        </div>

        {/* Section 3: Real-world Applications */}
        <div className="section" style={{ marginTop: '30px' }}>
          <h3>Real-World Applications</h3>
          <p>
            Matrices power computer graphics, physics simulations, machine learning, and more:
          </p>
          <ul style={{ marginLeft: '20px', color: '#555' }}>
            <li>
              <strong>Video Games:</strong> Rotate and scale 3D models using matrices.
            </li>
            <li>
              <strong>Image Processing:</strong> Apply filters and transformations.
            </li>
            <li>
              <strong>Machine Learning:</strong> Represent data and perform computations.
            </li>
            <li>
              <strong>Physics:</strong> Describe rotations, stresses, and transformations.
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div style={{ marginTop: '40px', display: 'flex', gap: '15px', justifyContent: 'space-between' }}>
          <Link to="/lesson/vectors">
            <button className="secondary">← Back: Vectors</button>
          </Link>
          <Link to="/">
            <button className="primary">Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MatrixLesson;
