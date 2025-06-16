import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
    </nav>
  );
}

export default NavBar; // ✅ This line is required
