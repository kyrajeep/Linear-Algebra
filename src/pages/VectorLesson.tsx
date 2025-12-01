import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VectorCanvas from '../components/VectorCanvas';

function VectorLesson() {
  const [vector, setVector] = useState([3, 2]);
  const [showComponents, setShowComponents] = useState(true);

  return (
    <div className="lesson-page">
      <Link to="/">
        <button className="back-button">← Back to Home</button>
      </Link>

      <div className="lesson-header">
        <h1>🎯 Understanding Vectors</h1>
        <p>Learn how vectors represent direction and magnitude in 2D space</p>
      </div>

      <div className="lesson-content">
        {/* Section 1: What is a Vector? */}
        <div className="section">
          <h3>What is a Vector?</h3>
          <p>
            A <strong>vector</strong> is an arrow in space that has both <strong>direction</strong>{' '}
            and <strong>magnitude</strong> (length). In 2D, we can write a vector as a pair of
            numbers: (x, y).
          </p>
          <p>
            For example, the vector <strong>[3, 2]</strong> means:
          </p>
          <ul style={{ marginLeft: '20px', color: '#555' }}>
            <li>Move 3 units to the right (x-component)</li>
            <li>Move 2 units up (y-component)</li>
          </ul>

          <div className="info-box">
            <strong>💡 Try it out!</strong> Drag the tip of the vector on the canvas below to
            change its direction and magnitude. The coordinates will update in real-time.
          </div>
        </div>

        {/* Interactive Vector Canvas */}
        <div style={{ marginTop: '30px' }}>
          <VectorCanvas
            vector={vector}
            onVectorChange={setVector}
            showComponents={showComponents}
          />
        </div>

        {/* Vector Components Display */}
        <div style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
          <h4 style={{ color: '#667eea', marginBottom: '10px' }}>Vector Components:</h4>
          <p style={{ fontSize: '1.1em', marginBottom: '8px' }}>
            <strong>x-component (horizontal):</strong> <span style={{ color: '#667eea' }}>{vector[0].toFixed(2)}</span>
          </p>
          <p style={{ fontSize: '1.1em', marginBottom: '8px' }}>
            <strong>y-component (vertical):</strong> <span style={{ color: '#667eea' }}>{vector[1].toFixed(2)}</span>
          </p>
          <p style={{ fontSize: '1.1em' }}>
            <strong>Magnitude (length):</strong>{' '}
            <span style={{ color: '#667eea' }}>
              √(x² + y²) = {Math.sqrt(vector[0] ** 2 + vector[1] ** 2).toFixed(2)}
            </span>
          </p>
        </div>

        {/* Section 2: Vector Operations */}
        <div className="section" style={{ marginTop: '30px' }}>
          <h3>Vector Operations</h3>
          <p>Vectors support several important operations:</p>

          <div className="info-box" style={{ marginTop: '15px' }}>
            <strong>Addition:</strong> Add two vectors by adding their components.
            <br />
            Example: [1, 2] + [3, 1] = [4, 3]
          </div>

          <div className="info-box">
            <strong>Scaling (Multiplication):</strong> Multiply a vector by a number to make it longer or shorter.
            <br />
            Example: 2 × [3, 2] = [6, 4]
          </div>

          <div className="info-box">
            <strong>Dot Product:</strong> Multiply two vectors to get a single number that measures how similar their
            directions are.
            <br />
            Example: [1, 0] · [0, 1] = 0 (perpendicular)
          </div>
        </div>

        {/* Section 3: Real-world Example */}
        <div className="section" style={{ marginTop: '30px' }}>
          <h3>Real-World Example: Forces and Motion</h3>
          <p>
            In physics, vectors represent forces, velocities, and accelerations. If you're pushing an object at an
            angle, the force vector tells you both the direction and strength of that push!
          </p>
          <p>
            Try dragging the vector above to simulate a force, and imagine an object being pushed in that direction.
          </p>
        </div>

        {/* Navigation */}
        <div style={{ marginTop: '40px', display: 'flex', gap: '15px', justifyContent: 'space-between' }}>
          <Link to="/">
            <button className="secondary">← Back</button>
          </Link>
          <Link to="/lesson/matrices">
            <button className="primary">Next: Matrices →</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VectorLesson;
