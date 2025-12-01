import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <div className="header">
        <h1>📐 Linear Algebra Explorer</h1>
        <p>Learn vectors, matrices, and transformations through interactive visualizations</p>
      </div>

      <div className="cards-grid">
        {/* Vectors Lesson */}
        <div className="card">
          <h2>🎯 Vectors</h2>
          <p>
            Understand what vectors are, how to visualize them in 2D space, and how to perform
            basic operations like addition, scaling, and dot products.
          </p>
          <p style={{ fontSize: '0.9em', color: '#999' }}>
            ⏱️ ~10 minutes | Difficulty: Beginner
          </p>
          <Link to="/lesson/vectors">
            <button className="primary">Start Lesson →</button>
          </Link>
        </div>

        {/* Matrices Lesson */}
        <div className="card">
          <h2>⬜ Matrices</h2>
          <p>
            Discover how matrices represent transformations. See in real-time how a matrix
            rotates, scales, and shears a vector space.
          </p>
          <p style={{ fontSize: '0.9em', color: '#999' }}>
            ⏱️ ~12 minutes | Difficulty: Beginner
          </p>
          <Link to="/lesson/matrices">
            <button className="primary">Start Lesson →</button>
          </Link>
        </div>

        {/* Future: More lessons */}
        <div className="card" style={{ opacity: 0.6, pointerEvents: 'none' }}>
          <h2>🔄 Determinants (Coming Soon)</h2>
          <p>
            Explore how determinants measure the scaling factor of a matrix transformation
            and why singular matrices are special.
          </p>
          <p style={{ fontSize: '0.9em', color: '#999' }}>
            ⏱️ ~10 minutes | Difficulty: Intermediate
          </p>
          <button className="secondary" disabled>
            Coming Soon
          </button>
        </div>
      </div>

      <div style={{ textAlign: 'center', color: 'white' }}>
        <p style={{ fontSize: '0.9em', opacity: 0.8 }}>
          💡 Tip: Use your mouse to interact with the visualizations. Try dragging vectors and
          changing matrix values!
        </p>
      </div>
    </div>
  );
}

export default Home;
